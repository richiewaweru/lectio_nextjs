import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { calculusSection } from "@/lib/dummy-content";
import { DefinitionCard } from "@/lib/components/lectio/DefinitionCard";
import { PracticeStack } from "@/lib/components/lectio/PracticeStack";
import { WorkedExampleCard } from "@/lib/components/lectio/WorkedExampleCard";
import { GuidedConceptPathTemplate } from "@/lib/templates/guided-concept-path";
import type { PracticeContent } from "@/lib/types";
import { validateSection } from "@/lib/validate";

describe("DefinitionCard", () => {
  it("toggles between plain and formal definitions and renders optional metadata", () => {
    render(<DefinitionCard content={calculusSection.definition!} />);

    expect(
      screen.getByText(/A branch of math built to answer two questions/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Usage examples/i)).toBeInTheDocument();
    expect(screen.getByText(/Derivative/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show formal definition/i }));

    expect(
      screen.getByText(/The mathematical study of continuous change/i)
    ).toBeInTheDocument();
  });
});

describe("PracticeStack", () => {
  it("supports variable problem counts with tiered hints, answers, and solutions", () => {
    render(<PracticeStack content={calculusSection.practice} />);

    expect(
      screen.getByText(/A runner covers 90 meters in 10 seconds/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/What is its average speed during that hour/i));
    fireEvent.click(screen.getByRole("button", { name: /show hint/i }));

    expect(
      screen.getByText(/Hint 1 of 3/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Start with distance traveled between 1 PM and 2 PM/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show next hint/i }));
    fireEvent.click(screen.getByRole("button", { name: /show next hint/i }));

    expect(screen.getByText(/Hint 3 of 3/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show answer/i }));
    expect(
      screen.getByText(/25 miles per hour on average/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show worked solution/i }));
    expect(
      screen.getByText(/The car traveled 25 miles in 1 hour/i)
    ).toBeInTheDocument();
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
  it("reveals the answer and alternatives only after the final step in step-reveal mode", () => {
    render(<WorkedExampleCard content={calculusSection.worked_example!} />);

    expect(screen.queryByText(/Answer:/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show next step/i }));
    fireEvent.click(screen.getByRole("button", { name: /show next step/i }));
    fireEvent.click(screen.getByRole("button", { name: /show next step/i }));

    expect(screen.getByText(/Answer:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/-64 feet per second/i).length).toBeGreaterThan(1);

    fireEvent.click(screen.getByRole("button", { name: /other approaches/i }));
    expect(
      screen.getByText(/Differentiate h\(t\) first, then evaluate h'\(2\)/i)
    ).toBeInTheDocument();
  });
});

describe("validateSection", () => {
  it("reports the new phase 2 schema capacity warnings", () => {
    const longSolution = Array.from({ length: 121 }, () => "solution").join(" ");
    const longAnswer = Array.from({ length: 31 }, () => "answer").join(" ");

    const warnings = validateSection({
      ...calculusSection,
      explanation: {
        ...calculusSection.explanation,
        emphasis: ["one", "two", "three", "four"],
        callouts: [
          { type: "remember", text: "short" },
          { type: "remember", text: "short" },
          { type: "remember", text: "short" },
          { type: "remember", text: Array.from({ length: 61 }, () => "callout").join(" ") }
        ]
      },
      definition: {
        ...calculusSection.definition!,
        related_terms: ["A", "B", "C", "D", "E"]
      },
      worked_example: {
        ...calculusSection.worked_example!,
        answer: longAnswer,
        alternatives: [
          "one",
          "two",
          "three",
          Array.from({ length: 41 }, () => "alternative").join(" ")
        ]
      },
      pitfall: {
        ...calculusSection.pitfall!,
        examples: ["one", "two", "three", Array.from({ length: 41 }, () => "example").join(" ")],
        why: Array.from({ length: 61 }, () => "why").join(" ")
      },
      practice: {
        problems: Array.from({ length: 5 }, (_, index) => ({
          ...calculusSection.practice.problems[0],
          question: `Question ${index + 1}`,
          hints: ["one", "two", "three", "four"],
          answer: Array.from({ length: 41 }, () => "answer").join(" "),
          solution: longSolution
        }))
      },
      glossary: {
        terms: [
          {
            ...calculusSection.glossary!.terms[0],
            related: ["one", "two", "three", "four"]
          }
        ]
      },
      what_next: {
        ...calculusSection.what_next,
        prerequisites: [
          "one",
          "two",
          "three",
          "four",
          Array.from({ length: 11 }, () => "prerequisite").join(" ")
        ]
      }
    });

    expect(warnings).toContain(
      "ExplanationBlock uses more than 3 emphasis phrases."
    );
    expect(warnings).toContain("ExplanationBlock has 4 callouts; max is 3.");
    expect(warnings).toContain(
      "DefinitionCard has 5 related terms; max is 4."
    );
    expect(warnings).toContain("WorkedExampleCard answer exceeds 30 words.");
    expect(warnings).toContain(
      "PracticeStack has 5 problems; consider trimming to 4."
    );
    expect(warnings).toContain(
      "PitfallAlert has 4 examples; max is 3."
    );
    expect(warnings).toContain(
      "GlossaryRail term 1 has 4 related terms; max is 3."
    );
    expect(warnings).toContain(
      "WhatNextBridge has 5 prerequisites; max is 4."
    );
  });
});

describe("GuidedConceptPathTemplate", () => {
  it("renders the guided concept sequence with phase 2 optional content", () => {
    render(<GuidedConceptPathTemplate section={calculusSection} />);

    expect(screen.getByText(/Why does calculus exist\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Build the mental model/i)).toBeInTheDocument();
    expect(screen.getByText(/Calibrated problems/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Derivatives track change at a moment/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Prerequisites:/i)).toBeInTheDocument();
  });
});
