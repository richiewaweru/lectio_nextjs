export interface ComponentMeta {
  id: string;
  name: string;
  purpose: string;
  cognitiveJob: string;
  subjects: string[];
  behaviourModes: string[];
  shadcnPrimitive: string;
  capacity: Record<string, number | string>;
  printFallback: string;
}

export const componentRegistry: Record<string, ComponentMeta> = {
  HookHero: {
    id: "hook-hero",
    name: "HookHero",
    purpose: "Opens a section by creating felt need before explanation",
    cognitiveJob: "Create felt need",
    subjects: ["universal"],
    behaviourModes: ["static", "fade-in"],
    shadcnPrimitive: "Card-like layout shell",
    capacity: {
      headlineMaxWords: 12,
      bodyMaxWords: 80,
      imageOptional: "url, alt"
    },
    printFallback: "Pull quote block with left border"
  },
  ExplanationBlock: {
    id: "explanation-block",
    name: "ExplanationBlock",
    purpose: "Builds a mental model through sustained prose",
    cognitiveJob: "Build understanding through prose",
    subjects: ["universal"],
    behaviourModes: ["static", "emphasis-highlighting"],
    shadcnPrimitive: "Card",
    capacity: {
      bodyMaxWords: 350,
      emphasisMaxItems: 3,
      calloutsMax: 3,
      calloutTextMaxWords: 60
    },
    printFallback: "Static prose with emphasis preserved"
  },
  DefinitionCard: {
    id: "definition-card",
    name: "DefinitionCard",
    purpose: "Anchors formal vocabulary with plain-language support",
    cognitiveJob: "Anchor formal knowledge",
    subjects: ["universal"],
    behaviourModes: ["static", "plain-formal-toggle"],
    shadcnPrimitive: "Card + Collapsible",
    capacity: {
      formalMaxWords: 80,
      plainMaxWords: 60,
      examplesMax: 3,
      exampleMaxWords: 30,
      relatedTermsMax: 4
    },
    printFallback: "Show both formal and plain definitions"
  },
  WorkedExampleCard: {
    id: "worked-example-card",
    name: "WorkedExampleCard",
    purpose: "Reveals reasoning step by step with justification",
    cognitiveJob: "Model reasoning in action",
    subjects: ["universal"],
    behaviourModes: ["static", "step-reveal", "accordion"],
    shadcnPrimitive: "Card + Accordion",
    capacity: {
      stepsMax: 6,
      stepLabelMaxWords: 12,
      stepContentMaxWords: 80,
      setupMaxWords: 60,
      conclusionMaxWords: 40,
      answerMaxWords: 30,
      alternativesMax: 3,
      alternativeMaxWords: 40
    },
    printFallback: "All steps shown in sequence"
  },
  PracticeStack: {
    id: "practice-stack",
    name: "PracticeStack",
    purpose: "Provides three calibrated problems with hints hidden by default",
    cognitiveJob: "Apply understanding",
    subjects: ["universal"],
    behaviourModes: ["hint-toggle", "accordion-cards"],
    shadcnPrimitive: "Accordion + Collapsible",
    capacity: {
      problemsMin: 1,
      problemsMax: 6,
      questionMaxWords: 100,
      hintMaxWords: 60,
      hintsMax: 3,
      answerMaxWords: 40,
      solutionMaxWords: 120,
      writeinLinesMax: 8
    },
    printFallback: "Show all problems and hints with write-in lines"
  },
  PitfallAlert: {
    id: "pitfall-alert",
    name: "PitfallAlert",
    purpose: "Names a misconception before the learner falls into it",
    cognitiveJob: "Inoculate against error",
    subjects: ["universal"],
    behaviourModes: ["static", "expand-example"],
    shadcnPrimitive: "Alert + Collapsible",
    capacity: {
      misconceptionMaxWords: 20,
      correctionMaxWords: 80,
      exampleMaxWords: 40,
      examplesMax: 3,
      whyMaxWords: 60
    },
    printFallback: "Static alert with full correction visible"
  },
  GlossaryRail: {
    id: "glossary-rail",
    name: "GlossaryRail",
    purpose: "Keeps key vocabulary nearby without breaking reading flow",
    cognitiveJob: "Retrieve meaning without losing place",
    subjects: ["universal"],
    behaviourModes: ["sticky-sidebar", "drawer", "inline-strip"],
    shadcnPrimitive: "Card + ScrollArea",
    capacity: {
      termsMax: 8,
      definitionMaxWords: 30,
      relatedMax: 3
    },
    printFallback: "Inline vocabulary strip at section end"
  },
  WhatNextBridge: {
    id: "what-next-bridge",
    name: "WhatNextBridge",
    purpose: "Connects the learner forward to the next idea",
    cognitiveJob: "Connect forward",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card",
    capacity: {
      bodyMaxWords: 50,
      nextMaxWords: 15,
      prerequisitesMax: 4,
      prerequisiteMaxWords: 10
    },
    printFallback: "Static bridge note"
  }
};

export function getComponentsForSubject(subject: string) {
  return Object.values(componentRegistry).filter(
    (component) =>
      component.subjects.includes("universal") ||
      component.subjects.includes(subject)
  );
}
