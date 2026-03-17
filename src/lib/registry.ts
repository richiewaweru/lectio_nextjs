import type {
  BehaviourMode,
  ComponentGroup,
  ComponentStatus
} from "@/lib/types";

export interface ComponentMeta {
  id: string;
  name: string;
  purpose: string;
  cognitiveJob: string;
  subjects: string[];
  behaviourModes: BehaviourMode[];
  shadcnPrimitive: string;
  capacity: Record<string, number | string | boolean>;
  printFallback: string;
  group: ComponentGroup;
  status: ComponentStatus;
}

export const componentRegistry: Record<string, ComponentMeta> = {
  SectionHeader: {
    id: "section-header",
    name: "SectionHeader",
    group: 1,
    purpose: "Opens a section with orientation, scope, and difficulty signals.",
    cognitiveJob: "Orient the learner",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card + Badge",
    capacity: {
      titleMaxWords: 12,
      subtitleMaxWords: 20,
      objectiveMaxWords: 30,
      levelPillsMax: 4
    },
    printFallback: "Full static header",
    status: "stable"
  },
  HookHero: {
    id: "hook-hero",
    name: "HookHero",
    group: 1,
    purpose: "Creates felt need before formal explanation begins.",
    cognitiveJob: "Create felt need",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card-like layout shell",
    capacity: {
      headlineMaxWords: 12,
      bodyMaxWords: 80,
      questionOptionsMax: 3,
      imageOptional: "url, alt"
    },
    printFallback: "Pull quote block with supporting note",
    status: "stable"
  },
  ExplanationBlock: {
    id: "explanation-block",
    name: "ExplanationBlock",
    group: 1,
    purpose: "Builds a mental model through sustained prose.",
    cognitiveJob: "Build understanding through prose",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card",
    capacity: {
      bodyMaxWords: 350,
      emphasisMaxItems: 3,
      calloutsMax: 3,
      calloutTextMaxWords: 60
    },
    printFallback: "Static prose with emphasis preserved",
    status: "stable"
  },
  PrerequisiteStrip: {
    id: "prerequisite-strip",
    name: "PrerequisiteStrip",
    group: 1,
    purpose: "Surfaces assumed knowledge with optional refreshers.",
    cognitiveJob: "Activate prior knowledge",
    subjects: ["universal"],
    behaviourModes: ["static", "hint-toggle"],
    shadcnPrimitive: "Card + Popover",
    capacity: {
      itemsMax: 4,
      refresherMaxWords: 60
    },
    printFallback: "Inline prerequisite list",
    status: "stable"
  },
  WhatNextBridge: {
    id: "what-next-bridge",
    name: "WhatNextBridge",
    group: 1,
    purpose: "Connects the learner forward to the next idea.",
    cognitiveJob: "Connect forward",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card",
    capacity: {
      bodyMaxWords: 50,
      nextMaxWords: 15,
      previewMaxWords: 30,
      prerequisitesMax: 4
    },
    printFallback: "Static bridge note",
    status: "stable"
  },
  InterviewAnchor: {
    id: "interview-anchor",
    name: "InterviewAnchor",
    group: 1,
    purpose: "Turns knowledge into spoken explanation and transfer.",
    cognitiveJob: "Rehearse explanation",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card",
    capacity: {
      promptMaxWords: 35,
      audienceMaxWords: 10,
      followUpMaxWords: 25
    },
    printFallback: "Prompt card with follow-up",
    status: "stable"
  },
  DefinitionCard: {
    id: "definition-card",
    name: "DefinitionCard",
    group: 2,
    purpose: "Anchors formal vocabulary with plain-language support.",
    cognitiveJob: "Anchor formal knowledge",
    subjects: ["universal"],
    behaviourModes: ["static", "plain-formal-toggle"],
    shadcnPrimitive: "Card + Button",
    capacity: {
      formalMaxWords: 80,
      plainMaxWords: 60,
      examplesMax: 3,
      relatedTermsMax: 4,
      notationOptional: true
    },
    printFallback: "Show both formal and plain definitions",
    status: "stable"
  },
  DefinitionFamily: {
    id: "definition-family",
    name: "DefinitionFamily",
    group: 2,
    purpose: "Groups related terms that need contrast and coordination.",
    cognitiveJob: "Distinguish related concepts",
    subjects: ["universal"],
    behaviourModes: ["static", "accordion"],
    shadcnPrimitive: "Card + Accordion",
    capacity: {
      definitionsMax: 4,
      introMaxWords: 40
    },
    printFallback: "All definitions expanded",
    status: "stable"
  },
  GlossaryRail: {
    id: "glossary-rail",
    name: "GlossaryRail",
    group: 2,
    purpose: "Keeps key vocabulary nearby without breaking reading flow.",
    cognitiveJob: "Retrieve meaning without losing place",
    subjects: ["universal"],
    behaviourModes: ["sticky", "drawer", "inline-strip"],
    shadcnPrimitive: "Card + ScrollArea",
    capacity: {
      termsMax: 8,
      definitionMaxWords: 30,
      relatedMax: 3
    },
    printFallback: "Inline vocabulary strip at section end",
    status: "stable"
  },
  GlossaryInline: {
    id: "glossary-inline",
    name: "GlossaryInline",
    group: 2,
    purpose: "Defines a term in place without forcing a context switch.",
    cognitiveJob: "Recover meaning inline",
    subjects: ["universal"],
    behaviourModes: ["hint-toggle"],
    shadcnPrimitive: "Popover",
    capacity: {
      definitionMaxWords: 30
    },
    printFallback: "Inline parenthetical definition",
    status: "stable"
  },
  InsightStrip: {
    id: "insight-strip",
    name: "InsightStrip",
    group: 2,
    purpose: "Summarizes the key pattern or comparison at a glance.",
    cognitiveJob: "Compress the insight",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card-like cells",
    capacity: {
      cellsMin: 2,
      cellsMax: 3,
      noteMaxWords: 20
    },
    printFallback: "Three-column summary strip",
    status: "stable"
  },
  ComparisonGrid: {
    id: "comparison-grid",
    name: "ComparisonGrid",
    group: 2,
    purpose: "Holds multiple concepts in view so distinctions become structural.",
    cognitiveJob: "Compare and classify in parallel",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card + CSS grid",
    capacity: {
      columnsMin: 2,
      columnsMax: 4,
      rowsMax: 6,
      criterionMaxWords: 8,
      valueMaxWords: 20
    },
    printFallback: "Static comparison table",
    status: "stable"
  },
  WorkedExampleCard: {
    id: "worked-example-card",
    name: "WorkedExampleCard",
    group: 3,
    purpose: "Reveals reasoning step by step with explanation and formula support.",
    cognitiveJob: "Model reasoning in action",
    subjects: ["universal"],
    behaviourModes: ["static", "step-reveal", "accordion"],
    shadcnPrimitive: "Card + Accordion + Collapsible",
    capacity: {
      stepsMax: 6,
      softWarningAt: 4,
      setupMaxWords: 60,
      conclusionMaxWords: 40,
      answerMaxWords: 30,
      alternativesMax: 3
    },
    printFallback: "All steps shown in sequence",
    status: "stable"
  },
  ProcessSteps: {
    id: "process-steps",
    name: "ProcessSteps",
    group: 3,
    purpose: "Shows a reusable procedure learners can execute themselves.",
    cognitiveJob: "Operationalize a process",
    subjects: ["universal"],
    behaviourModes: ["static", "step-reveal"],
    shadcnPrimitive: "Card",
    capacity: {
      stepsMax: 8,
      introMaxWords: 40
    },
    printFallback: "Vertical numbered checklist",
    status: "stable"
  },
  PracticeStack: {
    id: "practice-stack",
    name: "PracticeStack",
    group: 4,
    purpose: "Provides calibrated practice with progressive support.",
    cognitiveJob: "Apply understanding",
    subjects: ["universal"],
    behaviourModes: ["accordion", "progressive-hints", "hint-toggle", "flat-list"],
    shadcnPrimitive: "Accordion + Collapsible",
    capacity: {
      problemsMin: 1,
      problemsMax: 6,
      softWarningAt: 4,
      hintsMax: 3,
      questionMaxWords: 100,
      solutionWorkedMaxWords: 200
    },
    printFallback: "Show all prompts and write-in space",
    status: "stable"
  },
  QuizCheck: {
    id: "quiz-check",
    name: "QuizCheck",
    group: 4,
    purpose: "Verifies understanding immediately after instruction.",
    cognitiveJob: "Check understanding",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card + RadioGroup + Button",
    capacity: {
      optionsMin: 3,
      optionsMax: 4,
      questionMaxWords: 60,
      optionMaxWords: 20
    },
    printFallback: "Question with correct answer marked",
    status: "stable"
  },
  ReflectionPrompt: {
    id: "reflection-prompt",
    name: "ReflectionPrompt",
    group: 4,
    purpose: "Pauses forward motion and consolidates learning.",
    cognitiveJob: "Pause and consolidate",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card",
    capacity: {
      promptMaxWords: 40,
      spaceMax: 6
    },
    printFallback: "Prompt with write-in lines",
    status: "stable"
  },
  PitfallAlert: {
    id: "pitfall-alert",
    name: "PitfallAlert",
    group: 5,
    purpose: "Names a misconception before the learner falls into it.",
    cognitiveJob: "Inoculate against error",
    subjects: ["universal"],
    behaviourModes: ["static", "hint-toggle"],
    shadcnPrimitive: "Alert + Collapsible",
    capacity: {
      misconceptionMaxWords: 20,
      correctionMaxWords: 80,
      examplesMax: 3,
      whyMaxWords: 60
    },
    printFallback: "Static alert with correction visible",
    status: "stable"
  },
  DiagramBlock: {
    id: "diagram-block",
    name: "DiagramBlock",
    group: 6,
    purpose: "Makes spatial or relational structure visible.",
    cognitiveJob: "See the structure",
    subjects: ["universal"],
    behaviourModes: ["static", "zoom", "hint-toggle"],
    shadcnPrimitive: "Card + Dialog + Popover",
    capacity: {
      calloutsMax: 6,
      captionMaxWords: 60
    },
    printFallback: "Static SVG figure",
    status: "stable"
  },
  DiagramCompare: {
    id: "diagram-compare",
    name: "DiagramCompare",
    group: 6,
    purpose: "Shows change by directly comparing two states.",
    cognitiveJob: "Compare states",
    subjects: ["universal"],
    behaviourModes: ["compare"],
    shadcnPrimitive: "Card + Slider",
    capacity: {
      captionMaxWords: 60,
      labelsMaxWords: 6,
      detailListsOptional: "before_details, after_details"
    },
    printFallback: "Before and after diagrams side by side",
    status: "stable"
  },
  DiagramSeries: {
    id: "diagram-series",
    name: "DiagramSeries",
    group: 6,
    purpose: "Shows a sequence of spatial states over time or steps.",
    cognitiveJob: "Track staged change",
    subjects: ["universal"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card + Button + Progress",
    capacity: {
      diagramsMax: 4,
      titleMaxWords: 10
    },
    printFallback: "Stepped static figure strip",
    status: "stable"
  },
  TimelineBlock: {
    id: "timeline-block",
    name: "TimelineBlock",
    group: 6,
    purpose: "Turns chronology into a readable instructional spine.",
    cognitiveJob: "Follow cause and sequence over time",
    subjects: ["history", "science", "universal"],
    behaviourModes: ["static", "timeline-scrubber"],
    shadcnPrimitive: "Card + button group",
    capacity: {
      eventsMin: 3,
      eventsMax: 8,
      titleMaxWords: 10,
      summaryMaxWords: 50
    },
    printFallback: "Vertical event list",
    status: "stable"
  },
  SimulationBlock: {
    id: "simulation-block",
    name: "SimulationBlock",
    group: 7,
    purpose: "Reserves an interactive discovery surface with a safe fallback.",
    cognitiveJob: "Manipulate and discover",
    subjects: ["mathematics", "physics", "chemistry", "statistics"],
    behaviourModes: ["static"],
    shadcnPrimitive: "Card + iframe scaffold",
    capacity: {
      onePerSection: true
    },
    printFallback: "Fallback diagram at midstate",
    status: "beta"
  }
};

export function getStableComponents() {
  return Object.values(componentRegistry).filter(
    (component) => component.status === "stable" || component.status === "beta"
  );
}

export function getComponentById(componentId: string) {
  return Object.values(componentRegistry).find(
    (component) => component.id === componentId
  );
}

export function getComponentsByGroup(group: ComponentGroup) {
  return Object.values(componentRegistry).filter(
    (component) => component.group === group
  );
}

export function getComponentsForSubject(subject: string) {
  return Object.values(componentRegistry).filter(
    (component) =>
      component.subjects.includes("universal") ||
      component.subjects.includes(subject.toLowerCase())
  );
}
