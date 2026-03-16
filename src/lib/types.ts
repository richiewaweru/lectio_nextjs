export interface HookImage {
  url: string;
  alt: string;
}

export interface HookHeroContent {
  headline: string;
  body: string;
  anchor: string;
  image?: HookImage;
}

export interface ExplanationCallout {
  type: "remember" | "insight" | "sidenote";
  text: string;
}

export interface ExplanationContent {
  body: string;
  emphasis: string[];
  callouts?: ExplanationCallout[];
}

export interface DefinitionContent {
  term: string;
  formal: string;
  plain: string;
  etymology?: string;
  examples?: string[];
  related_terms?: string[];
}

export interface WorkedStep {
  label: string;
  content: string;
}

export interface WorkedExampleContent {
  title: string;
  setup: string;
  steps: WorkedStep[];
  conclusion: string;
  answer?: string;
  alternatives?: string[];
}

export interface PracticeProblem {
  difficulty: "warm" | "medium" | "cold";
  question: string;
  hint: string;
  hints?: string[];
  answer?: string;
  solution?: string;
  writein_lines?: number;
}

export interface PracticeContent {
  problems: PracticeProblem[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  used_in?: string;
  related?: string[];
}

export interface GlossaryContent {
  terms: GlossaryTerm[];
}

export interface PitfallContent {
  misconception: string;
  correction: string;
  example?: string;
  examples?: string[];
  why?: string;
}

export interface WhatNextContent {
  body: string;
  next: string;
  prerequisites?: string[];
}

export interface SectionContent {
  section_id: string;
  title: string;
  subtitle?: string;
  subject: string;
  grade_band: string;
  template_id: string;
  hook: HookHeroContent;
  explanation: ExplanationContent;
  definition?: DefinitionContent;
  worked_example?: WorkedExampleContent;
  pitfall?: PitfallContent;
  practice: PracticeContent;
  glossary?: GlossaryContent;
  what_next: WhatNextContent;
}
