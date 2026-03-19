"use client";

// ── Components ──────────────────────────────────────
export { SectionHeader } from "./components/lectio/SectionHeader";
export { HookHero } from "./components/lectio/HookHero";
export { ExplanationBlock } from "./components/lectio/ExplanationBlock";
export { PrerequisiteStrip } from "./components/lectio/PrerequisiteStrip";
export { WhatNextBridge } from "./components/lectio/WhatNextBridge";
export { InterviewAnchor } from "./components/lectio/InterviewAnchor";
export { DefinitionCard } from "./components/lectio/DefinitionCard";
export { DefinitionFamily } from "./components/lectio/DefinitionFamily";
export { GlossaryRail } from "./components/lectio/GlossaryRail";
export { GlossaryInline } from "./components/lectio/GlossaryInline";
export { InsightStrip } from "./components/lectio/InsightStrip";
export { ComparisonGrid } from "./components/lectio/ComparisonGrid";
export { WorkedExampleCard } from "./components/lectio/WorkedExampleCard";
export { ProcessSteps } from "./components/lectio/ProcessSteps";
export { PracticeStack } from "./components/lectio/PracticeStack";
export { QuizCheck } from "./components/lectio/QuizCheck";
export { ReflectionPrompt } from "./components/lectio/ReflectionPrompt";
export { PitfallAlert } from "./components/lectio/PitfallAlert";
export { DiagramBlock } from "./components/lectio/DiagramBlock";
export { DiagramCompare } from "./components/lectio/DiagramCompare";
export { DiagramSeries } from "./components/lectio/DiagramSeries";
export { TimelineBlock } from "./components/lectio/TimelineBlock";
export { SimulationBlock } from "./components/lectio/SimulationBlock";

// ── Types ───────────────────────────────────────────
export type {
	SectionContent,
	SectionHeaderContent,
	HookHeroContent,
	HookImage,
	HookType,
	HookDataPoint,
	ExplanationContent,
	ExplanationCallout,
	DefinitionContent,
	DefinitionFamilyContent,
	GlossaryContent,
	GlossaryTerm,
	GlossaryInlineProps,
	PracticeContent,
	PracticeProblem,
	PracticeHint,
	PracticeSolution,
	PracticeHintInput,
	WorkedExampleContent,
	WorkedStep,
	PitfallContent,
	DiagramContent,
	DiagramCompareContent,
	DiagramSeriesContent,
	DiagramSeriesItem,
	DiagramCallout,
	ComparisonGridContent,
	ComparisonColumn,
	ComparisonRow,
	TimelineContent,
	TimelineEvent,
	QuizContent,
	QuizOption,
	ReflectionContent,
	ReflectionType,
	InsightStripContent,
	InsightCell,
	ProcessContent,
	ProcessStepItem,
	PrerequisiteContent,
	PrerequisiteItem,
	InterviewContent,
	SimulationContent,
	SimulationType,
	InteractionSpec,
	WhatNextContent,
	LevelPill,
	BehaviourMode,
	Difficulty,
	GradeBand,
	HintLevel,
	ComponentGroup,
	ComponentStatus,
} from "./types";

export {
	getSectionHeaderContent,
	getWorkedExamples,
	getPitfallList,
	normalizePracticeHints,
	getPracticeAnswer,
	normalizePracticeSolution,
} from "./types";

// ── Registry ────────────────────────────────────────
export {
	componentRegistry,
	getStableComponents,
	getComponentsByGroup,
	getComponentsForSubject,
	getComponentById,
	getComponentFieldMap,
} from "./registry";
export type { ComponentMeta } from "./registry";

// ── Validation ──────────────────────────────────────
export { validateSection, warnIfInvalid } from "./validate";

// ── Template system ─────────────────────────────────
export {
	templateRegistry,
	templateRegistryMap,
	getTemplateById,
	filterTemplates,
	getTemplateFamilies,
	validateAllTemplates,
} from "./template-registry";
export { LectioThemeSurface } from "./templates/LectioThemeSurface";
export { ResolvedTemplatePreviewSurface } from "./templates/ResolvedTemplatePreviewSurface";
export { TemplateRuntimeSurface } from "./templates/TemplateRuntimeSurface";
export { TemplatePreviewSurface } from "./templates/TemplatePreviewSurface";
export type {
	TemplateContract,
	TemplateDefinition,
	TemplatePresetDefinition,
	TemplatePreview,
	TemplatePresetGuardrails,
	TemplateGenerationGuidance,
	TemplateFamily,
	LessonIntent,
	LearnerFit,
	InteractionLevel,
	ReadingStyle,
	TemplateFilters,
	TemplateValidationResult,
} from "./template-types";
export {
	validateTemplateDefinition,
	validateTemplateContract,
	validateTemplatePreview,
} from "./template-validation";

// ── Presets ─────────────────────────────────────────
export { basePresets, basePresetMap } from "./presets/base-presets";

// ── Utility ─────────────────────────────────────────
export { cn } from "./utils";
