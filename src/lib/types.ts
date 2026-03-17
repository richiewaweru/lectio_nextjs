export type Difficulty = "warm" | "medium" | "cold" | "extension";
export type GradeBand = "primary" | "secondary" | "advanced";
export type HintLevel = 1 | 2 | 3;
export type BehaviourMode =
  | "static"
  | "step-reveal"
  | "accordion"
  | "hint-toggle"
  | "plain-formal-toggle"
  | "zoom"
  | "sticky"
  | "drawer"
  | "inline-strip"
  | "progressive-hints"
  | "compare";

export type ComponentGroup = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ComponentStatus = "stable" | "beta" | "planned";

export interface SectionHeaderContent {
  title: string;
  subtitle?: string;
  subject: string;
  section_number?: string;
  grade_band: GradeBand;
  objective?: string;
  level_pills?: LevelPill[];
}

export interface LevelPill {
  label: string;
  variant: "all" | "warm" | "medium" | "cold";
}

export interface HookImage {
  url: string;
  alt: string;
}

export type HookType = "prose" | "quote" | "question" | "data-point";

export interface HookDataPoint {
  value: string;
  label: string;
  source?: string;
}

export interface HookHeroContent {
  headline: string;
  body: string;
  anchor: string;
  type?: HookType;
  quote_attribution?: string;
  question_options?: string[];
  data_point?: HookDataPoint;
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

export interface PrerequisiteItem {
  concept: string;
  refresher?: string;
}

export interface PrerequisiteContent {
  label?: string;
  items: PrerequisiteItem[];
}

export interface WhatNextContent {
  body: string;
  next: string;
  preview?: string;
  prerequisites?: string[];
}

export interface InterviewContent {
  prompt: string;
  audience: string;
  follow_up?: string;
}

export interface DefinitionContent {
  term: string;
  formal: string;
  plain: string;
  etymology?: string;
  notation?: string;
  related_terms?: string[];
  symbol?: string;
  examples?: string[];
}

export interface DefinitionFamilyContent {
  family_title: string;
  family_intro?: string;
  definitions: DefinitionContent[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  used_in?: string;
  pronunciation?: string;
  related?: string[];
}

export interface GlossaryContent {
  terms: GlossaryTerm[];
}

export interface GlossaryInlineProps {
  term: string;
  definition: string;
}

export interface InsightCell {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}

export interface InsightStripContent {
  cells: InsightCell[];
}

export interface WorkedStep {
  label: string;
  content: string;
  note?: string;
  formula?: string;
  diagram_ref?: string;
}

export interface WorkedExampleContent {
  title: string;
  setup: string;
  steps: WorkedStep[];
  conclusion: string;
  method_label?: string;
  alternative?: WorkedExampleContent;
  answer?: string;
  alternatives?: string[];
}

export interface ProcessStepItem {
  number: number;
  action: string;
  detail: string;
  input?: string;
  output?: string;
  warning?: string;
}

export interface ProcessContent {
  title: string;
  intro?: string;
  steps: ProcessStepItem[];
  checklist_mode?: boolean;
}

export interface PracticeHint {
  level: HintLevel;
  text: string;
}

export interface PracticeSolution {
  approach: string;
  answer: string;
  worked?: string;
}

export type PracticeHintInput = string | PracticeHint;

export interface PracticeProblem {
  difficulty: Difficulty;
  question: string;
  hint?: string;
  hints?: PracticeHintInput[];
  answer?: string;
  solution?: string | PracticeSolution;
  writein_lines?: number;
  self_assess?: boolean;
  context?: string;
}

export interface PracticeContent {
  problems: PracticeProblem[];
}

export interface QuizOption {
  text: string;
  correct: boolean;
  explanation: string;
}

export interface QuizContent {
  question: string;
  options: QuizOption[];
  feedback_correct: string;
  feedback_incorrect: string;
  show_explanations?: boolean;
}

export type ReflectionType =
  | "open"
  | "pair-share"
  | "sentence-stem"
  | "timed"
  | "connect"
  | "predict"
  | "transfer";

export interface ReflectionContent {
  prompt: string;
  type: ReflectionType;
  space?: number;
  sentence_stem?: string;
  time_minutes?: number;
  pair_instruction?: string;
}

export interface PitfallContent {
  misconception: string;
  correction: string;
  example?: string;
  severity?: "minor" | "major";
  examples?: string[];
  why?: string;
}

export interface DiagramCallout {
  id: string;
  x: number;
  y: number;
  label: string;
  explanation: string;
}

export interface DiagramContent {
  svg_content: string;
  caption: string;
  zoom_label?: string;
  alt_text: string;
  callouts?: DiagramCallout[];
  figure_number?: number;
}

export interface DiagramCompareContent {
  before_svg: string;
  after_svg: string;
  before_label: string;
  after_label: string;
  before_details?: string[];
  after_details?: string[];
  caption: string;
  alt_text: string;
}

export interface DiagramSeriesItem {
  svg_content: string;
  step_label: string;
  caption: string;
}

export interface DiagramSeriesContent {
  title: string;
  diagrams: DiagramSeriesItem[];
}

export type SimulationType =
  | "graph_slider"
  | "probability_tree"
  | "equation_reveal"
  | "geometry_explorer"
  | "molecule_viewer"
  | "timeline_scrubber";

export interface InteractionSpec {
  type: SimulationType;
  goal: string;
  anchor_content: Record<string, unknown>;
  context: {
    learner_level: string;
    template_id: string;
    color_mode: "light" | "dark";
    accent_color: string;
    surface_color: string;
    font_mono: string;
  };
  dimensions: {
    width: string;
    height: number;
    resizable: boolean;
  };
  print_translation: "static_midstate" | "static_diagram" | "hide";
}

export interface SimulationContent {
  spec: InteractionSpec;
  fallback_diagram?: DiagramContent;
  explanation?: string;
}

export interface SectionContent {
  section_id: string;
  template_id: string;

  header?: SectionHeaderContent;

  // Legacy Phase 1 / Phase 2 fields kept for compatibility.
  title?: string;
  subtitle?: string;
  subject?: string;
  grade_band?: GradeBand;

  hook: HookHeroContent;
  explanation: ExplanationContent;
  practice: PracticeContent;
  what_next: WhatNextContent;

  prerequisites?: PrerequisiteContent;
  definition?: DefinitionContent;
  definition_family?: DefinitionFamilyContent;
  worked_example?: WorkedExampleContent;
  worked_examples?: WorkedExampleContent[];
  process?: ProcessContent;
  diagram?: DiagramContent;
  diagram_compare?: DiagramCompareContent;
  diagram_series?: DiagramSeriesContent;
  insight_strip?: InsightStripContent;
  pitfall?: PitfallContent;
  pitfalls?: PitfallContent[];
  quiz?: QuizContent;
  reflection?: ReflectionContent;
  glossary?: GlossaryContent;
  simulation?: SimulationContent;
  interview?: InterviewContent;
}

function isPracticeHintObject(
  value: PracticeHintInput
): value is PracticeHint {
  return typeof value !== "string";
}

function isPracticeSolutionObject(
  value: PracticeProblem["solution"]
): value is PracticeSolution {
  return typeof value === "object" && value !== null && "approach" in value;
}

export function getSectionHeaderContent(
  section: SectionContent
): SectionHeaderContent {
  if (section.header) {
    return section.header;
  }

  return {
    title: section.title ?? "Untitled section",
    subtitle: section.subtitle,
    subject: section.subject ?? "Universal",
    grade_band: section.grade_band ?? "secondary"
  };
}

export function getWorkedExamples(
  section: SectionContent
): WorkedExampleContent[] {
  return [
    ...(section.worked_example ? [section.worked_example] : []),
    ...(section.worked_examples ?? [])
  ];
}

export function getPitfallList(section: SectionContent): PitfallContent[] {
  return [
    ...(section.pitfall ? [section.pitfall] : []),
    ...(section.pitfalls ?? [])
  ];
}

export function normalizePracticeHints(
  problem: PracticeProblem
): PracticeHint[] {
  if (problem.hints?.length) {
    return problem.hints.map((hint, index) =>
      isPracticeHintObject(hint)
        ? hint
        : {
            level: Math.min(index + 1, 3) as HintLevel,
            text: hint
          }
    );
  }

  if (problem.hint) {
    return [{ level: 1, text: problem.hint }];
  }

  return [];
}

export function getPracticeAnswer(problem: PracticeProblem) {
  if (problem.answer) {
    return problem.answer;
  }

  if (isPracticeSolutionObject(problem.solution) && problem.solution.answer) {
    return problem.solution.answer;
  }

  return undefined;
}

export function normalizePracticeSolution(problem: PracticeProblem) {
  if (isPracticeSolutionObject(problem.solution)) {
    return problem.solution;
  }

  if (typeof problem.solution === "string") {
    return {
      approach: problem.solution,
      answer: problem.answer ?? "",
      worked: problem.solution
    } satisfies PracticeSolution;
  }

  return undefined;
}
