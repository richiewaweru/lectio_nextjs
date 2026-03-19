import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import TemplateDetailPage from "@/app/templates/[templateId]/page";
import { TemplatePreviewSurface, TemplateRuntimeSurface } from "@/lib";
import { templateRegistryMap } from "@/lib/template-registry";

const templateId = "guided-concept-path";
const definition = templateRegistryMap[templateId];
const fallbackPresetId =
  definition.presets.find((preset) => preset.id === "warm-paper")?.id ??
  definition.presets[0].id;

describe("runtime surfaces", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders preview content from templateId and presetId", () => {
    render(<TemplatePreviewSurface templateId={templateId} presetId="blue-classroom" />);

    expect(screen.getByText(definition.contract.name)).toBeInTheDocument();
    expect(screen.getByText(definition.preview.summary)).toBeInTheDocument();
    expect(document.querySelector('[data-lectio-preset="blue-classroom"]')).toBeInTheDocument();
  });

  it("respects showMetadata on the public preview surface", () => {
    render(<TemplatePreviewSurface templateId={templateId} showMetadata={false} />);

    expect(screen.queryByText("Template preview")).not.toBeInTheDocument();
    expect(screen.getByText(definition.preview.summary)).toBeInTheDocument();
  });

  it("renders runtime content from templateId and section", () => {
    render(
      <TemplateRuntimeSurface
        templateId={templateId}
        presetId="blue-classroom"
        section={definition.preview.section}
      />
    );

    expect(
      screen.getByText(definition.preview.section.header?.title ?? definition.contract.name)
    ).toBeInTheDocument();
    expect(document.querySelector('[data-lectio-preset="blue-classroom"]')).toBeInTheDocument();
  });

  it("falls back to the default preset when presetId is invalid", () => {
    render(
      <TemplateRuntimeSurface
        templateId={templateId}
        presetId="not-a-real-preset"
        section={definition.preview.section}
      />
    );

    expect(
      document.querySelector(`[data-lectio-preset="${fallbackPresetId}"]`)
    ).toBeInTheDocument();
    expect(console.warn).toHaveBeenCalled();
  });

  it("shows friendly fallback content for unknown template ids", () => {
    render(<TemplatePreviewSurface templateId="unknown-template" />);

    expect(screen.getByText("Unknown Lectio template: unknown-template")).toBeInTheDocument();
  });

  it("keeps the template detail page wired through the public preview surface", async () => {
    const page = await TemplateDetailPage({
      params: Promise.resolve({ templateId })
    });

    render(page);

    expect(screen.getByText(definition.preview.summary)).toBeInTheDocument();
    expect(
      screen.queryByText("Unknown Lectio template: guided-concept-path")
    ).not.toBeInTheDocument();
  });
});
