import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { calculusExtendedSection, calculusSection } from "@/lib/dummy-content";
import { DefinitionCard } from "@/lib/components/lectio/DefinitionCard";
import { PracticeStack } from "@/lib/components/lectio/PracticeStack";
import { QuizCheck } from "@/lib/components/lectio/QuizCheck";
import { WorkedExampleCard } from "@/lib/components/lectio/WorkedExampleCard";
import { getComponentsByGroup, getStableComponents } from "@/lib/registry";
import { ExtendedConceptPathTemplate } from "@/lib/templates/extended-concept-path";
import { GuidedConceptPathTemplate } from "@/lib/templates/guided-concept-path";
import type { PracticeContent } from "@/lib/types";
import { validateSection } from "@/lib/validate";

describe("DefinitionCard", () => {
  it("toggles between plain and formal definitions and renders metadata", () => {
    render(<DefinitionCard content={calculusExtendedSection.definition!} />);

    expect(
      screen.getByText(/The slope a curve is settling toward at one exact point/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Usage examples/i)).toBeInTheDocument();
    expect(screen.getByText(/Notation/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show formal definition/i }));

    expect(
      screen.getByText(/The limit of the average rate of change/i)
    ).toBeInTheDocument();
  });
});

describe("PracticeStack", () => {
  it("supports canonical hint objects, derived answers, worked solutions, and self-check", () => {
    render(<PracticeStack content={calculusExtendedSection.practice} />);

    fireEvent.click(
      screen.getByText(/A secant slope near x = 3 changes from 4.8 to 4.95 to 4.99/i)
    );
    fireEvent.click(screen.getByRole("button", { name: /show hint/i }));

    expect(screen.getByText(/Hint 1 of 3/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Look for the number the slopes are settling toward/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show next hint/i }));
    fireEvent.click(screen.getByRole("button", { name: /show next hint/i }));

    expect(screen.getByText(/Hint 3 of 3/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show answer/i }));
    expect(screen.getByText(/About 5/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show worked solution/i }));
    expect(
      screen.getByText(/Read the pattern in the secant slopes/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /matched/i }));
    expect(screen.getByRole("button", { name: /matched/i })).toHaveClass("bg-primary");
  });

  it("keeps legacy single-hint content working without optional fields", () => {
    const legacyPracticeContent: PracticeContent = {
      problems: [
        {
          difficulty: "warm",
          question: "Legacy question",
          hint: "Legacy hint"
        }
      ]
    };

    render(<PracticeStack content={legacyPracticeContent} />);

    fireEvent.click(screen.getByText(/Legacy question/i));
    fireEvent.click(screen.getByRole("button", { name: /show hint/i }));

    expect(screen.getByText(/Hint 1 of 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Legacy hint/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /show answer/i })
    ).not.toBeInTheDocument();
  });
});

describe("WorkedExampleCard", () => {
  it("reveals the answer, alternative method, and other approaches only after the final step", () => {
    render(<WorkedExampleCard content={calculusExtendedSection.worked_example!} />);

    expect(screen.queryByText(/Answer:/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show next step/i }));
    fireEvent.click(screen.getByRole("button", { name: /show next step/i }));

    expect(screen.getByText(/Answer:/i)).toBeInTheDocument();
    expect(screen.getByText(/^5$/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /alternative method/i }));
    expect(screen.getByText(/Method B: Symbolic approach/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /other approaches/i }));
    expect(
      screen.getByText(/Use the derivative rule first, then substitute x = 2/i)
    ).toBeInTheDocument();
  });
});

describe("QuizCheck", () => {
  it("shows correctness feedback and option explanations", () => {
    render(<QuizCheck content={calculusExtendedSection.quiz!} />);

    fireEvent.click(screen.getByLabelText(/The limiting slope near one point/i));
    fireEvent.click(screen.getByRole("button", { name: /check answer/i }));

    expect(
      screen.getByText(/Yes. The derivative is the limiting local slope/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This captures the tangent behavior at x = a/i)
    ).toBeInTheDocument();
  });
});

describe("validateSection", () => {
  it("reports complete-build and compatibility warnings together", () => {
    const warnings = validateSection({
      ...calculusExtendedSection,
      header: {
        ...calculusExtendedSection.header!,
        objective: Array.from({ length: 31 }, () => "objective").join(" ")
      },
      prerequisites: {
        ...calculusExtendedSection.prerequisites!,
        items: Array.from({ length: 5 }, (_, index) => ({
          concept: `Concept ${index + 1}`
        }))
      },
      definition_family: {
        ...calculusExtendedSection.definition_family!,
        definitions: [
          ...calculusExtendedSection.definition_family!.definitions,
          calculusExtendedSection.definition_family!.definitions[0],
          calculusExtendedSection.definition_family!.definitions[1]
        ]
      },
      quiz: {
        ...calculusExtendedSection.quiz!,
        options: [
          ...calculusExtendedSection.quiz!.options,
          {
            text: "Too many options",
            correct: false,
            explanation: "Extra explanation"
          },
          {
            text: "Way too many options",
            correct: false,
            explanation: "Another explanation"
          }
        ]
      },
      diagram_series: {
        ...calculusExtendedSection.diagram_series!,
        diagrams: [
          ...calculusExtendedSection.diagram_series!.diagrams,
          calculusExtendedSection.diagram_series!.diagrams[0],
          calculusExtendedSection.diagram_series!.diagrams[1]
        ]
      },
      simulation: {
        ...calculusExtendedSection.simulation!,
        explanation: Array.from({ length: 61 }, () => "simulation").join(" ")
      },
      what_next: {
        ...calculusExtendedSection.what_next,
        prerequisites: [
          "one",
          "two",
          "three",
          "four",
          "five"
        ]
      }
    });

    expect(
      warnings.some((warning) =>
        warning.includes("[Lectio/SectionHeader] objective exceeds 30 words.")
      )
    ).toBe(true);
    expect(
      warnings.some((warning) =>
        warning.includes("[Lectio/PrerequisiteStrip] has 5 items; max is 4.")
      )
    ).toBe(true);
    expect(
      warnings.some((warning) =>
        warning.includes("[Lectio/DefinitionFamily] has 5 definitions; max is 4.")
      )
    ).toBe(true);
    expect(
      warnings.some((warning) =>
        warning.includes("[Lectio/QuizCheck] has 5 options; expected between 3 and 4.")
      )
    ).toBe(true);
    expect(
      warnings.some((warning) =>
        warning.includes("[Lectio/DiagramSeries] has 5 diagrams; max is 4.")
      )
    ).toBe(true);
    expect(
      warnings.some((warning) =>
        warning.includes("[Lectio/SimulationBlock] explanation exceeds 60 words.")
      )
    ).toBe(true);
    expect(
      warnings.some((warning) =>
        warning.includes("[Lectio/WhatNextBridge] has 5 prerequisites; max is 4.")
      )
    ).toBe(true);
  });
});

describe("registry helpers", () => {
  it("returns grouped components and includes beta surfaces in the stable list", () => {
    const stableComponents = getStableComponents();
    const groupSixComponents = getComponentsByGroup(6);

    expect(stableComponents.some((component) => component.name === "SimulationBlock")).toBe(true);
    expect(groupSixComponents.map((component) => component.name)).toEqual(
      expect.arrayContaining(["DiagramBlock", "DiagramCompare", "DiagramSeries"])
    );
  });
});

describe("templates", () => {
  it("renders the guided concept baseline with backward-compatible content", () => {
    render(<GuidedConceptPathTemplate section={calculusSection} />);

    expect(screen.getByText(/Why does calculus exist\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Build the mental model/i)).toBeInTheDocument();
    expect(screen.getByText(/Calibrated problems/i)).toBeInTheDocument();
  });

  it("renders the extended concept path with the new component families", () => {
    render(<ExtendedConceptPathTemplate section={calculusExtendedSection} />);

    expect(screen.getByText(/How derivatives describe change/i)).toBeInTheDocument();
    expect(screen.getByText(/Bring these with you/i)).toBeInTheDocument();
    expect(screen.getByText(/Slope language/i)).toBeInTheDocument();
    expect(screen.getByText(/How to estimate a derivative from a graph/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick concept check/i)).toBeInTheDocument();
    expect(screen.getByText(/Manipulate and discover/i)).toBeInTheDocument();
    expect(screen.getByText(/Explain it out loud/i)).toBeInTheDocument();
  });
});
