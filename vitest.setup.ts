import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

declare global {
  interface Window {
    __setMockViewportWidth?: (width: number) => void;
  }
}

let mockViewportWidth = 1280;

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;

function matchesQuery(query: string) {
  const minWidth = query.match(/\(min-width:\s*(\d+)px\)/);
  if (minWidth) {
    return mockViewportWidth >= Number(minWidth[1]);
  }

  const maxWidth = query.match(/\(max-width:\s*(\d+)px\)/);
  if (maxWidth) {
    return mockViewportWidth <= Number(maxWidth[1]);
  }

  return false;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: matchesQuery(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  })
});

window.__setMockViewportWidth = (width: number) => {
  mockViewportWidth = width;
};

beforeEach(() => {
  mockViewportWidth = 1280;
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
