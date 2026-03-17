import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "@/app/app-shell";
import HomePage from "@/app/page";
import { getSidebarNavigation } from "@/lib/navigation/sidebar-navigation";
import { getStableComponents } from "@/lib/registry";
import { templateRegistry } from "@/lib/template-registry";

describe("sidebar navigation", () => {
  it("derives component and template links from the live registries in order", () => {
    const navigation = getSidebarNavigation();

    expect(navigation.components.map((item) => item.label)).toEqual(
      getStableComponents().map((component) => component.name)
    );
    expect(navigation.templates.map((item) => item.label)).toEqual([
      "Template gallery",
      ...templateRegistry.map((definition) => definition.contract.name)
    ]);
  });

  it("renders the global shell with component and template navigation around a page", () => {
    render(
      <AppShell>
        <HomePage />
      </AppShell>
    );

    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ComparisonGrid/i })).toHaveAttribute(
      "href",
      "/showcase#comparison-grid"
    );
    expect(screen.getByRole("link", { name: /Guided Concept Path/i })).toHaveAttribute(
      "href",
      "/templates/guided-concept-path"
    );
    expect(screen.getByText(/Interactive textbook sections built from educational intent/i)).toBeInTheDocument();
  });
});
