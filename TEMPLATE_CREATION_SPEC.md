# Template Creation — Architecture and Process
**Phase:** Next major build phase after Lectio components are stable
**Purpose:** Define exactly what a template is, how it is created,
            who creates it, how it is validated, and how it lives
            in the system. Get this right before building any of it.

---

## The One Thing to Nail First

A template is not a visual theme.
A template is not a component arrangement.
A template is an instructional strategy made structural.

Before any code, before any config format, before any UI:
**what teaching philosophy does this template embody?**

That question comes first. Everything else — the component
bundle, the layout, the behaviour defaults, the generation
guidance — is a consequence of answering that question clearly.

If you cannot state the instructional intent in one sentence,
the template is not ready to be built.

---

## What a Complete Template Contains

A template is a self-contained package. Five parts.
All five must exist before a template is considered complete.

```
template/
├── config.ts          ← the content contract (drives generation)
├── layout.svelte      ← the component assembly (drives rendering)
├── preset.css         ← the visual skin (drives appearance)
├── preview.ts         ← dummy content for the showcase
└── README.md          ← instructional intent + when to use
```

Each part has a distinct owner and a distinct job.

---

## Part 1 — config.ts (The Content Contract)

This is the most important file. It is what the LLM reads
before generating a single word of content. It tells the
content generator:

- which components are in this template
- what order they appear in
- what capacity limits apply
- what behaviour defaults to use
- what generation guidance to follow (tone, density, depth)
- what the responsive fallbacks are
- what the print rules are

```typescript
// templates/guided-concept-path/config.ts

import type { TemplateConfig } from '$lib/template-types'

export const config: TemplateConfig = {
  id: 'guided_concept_path_v1',
  name: 'Guided Concept Path',
  version: '1.0.0',

  // The one-sentence instructional intent
  intent: 'Lead the learner from felt need to formal understanding to practice through a predictable, scaffolded arc.',

  // Who this is for
  learner_profile: {
    levels: ['scaffolded', 'standard'],
    grade_bands: ['primary', 'secondary'],
    subjects: ['universal'],
  },

  // The component bundle — in render order
  // 'required' means always present
  // 'conditional' means present if content warrants it
  // 'optional' means teacher can toggle it off
  components: [
    { id: 'section-header',      presence: 'required'    },
    { id: 'prerequisite-strip',  presence: 'conditional' },
    { id: 'hook-hero',           presence: 'required'    },
    { id: 'explanation-block',   presence: 'required'    },
    { id: 'insight-strip',       presence: 'conditional' },
    { id: 'definition-card',     presence: 'conditional' },
    { id: 'diagram-block',       presence: 'conditional' },
    { id: 'worked-example-card', presence: 'conditional' },
    { id: 'pitfall-alert',       presence: 'conditional' },
    { id: 'practice-stack',      presence: 'required'    },
    { id: 'reflection-prompt',   presence: 'optional'    },
    { id: 'interview-anchor',    presence: 'optional'    },
    { id: 'what-next-bridge',    presence: 'required'    },
  ],

  // Sidebar components — rendered outside the main flow
  sidebar_components: [
    { id: 'glossary-rail', presence: 'conditional' },
  ],

  // Behaviour defaults — what activates automatically
  behaviour_defaults: {
    'worked-example-card': 'step-reveal',
    'practice-stack':       'hint-toggle',
    'definition-card':      'plain-formal-toggle',
    'diagram-block':        'zoom',
    'glossary-rail':        'sticky',
  },

  // Interaction level ceiling
  // none | light | medium | high
  interaction_level: 'medium',

  // Generation guidance — injected into the content generator prompt
  generation_guidance: {
    hook_max_words: 80,
    explanation_max_words: 300,
    explanation_style: 'intuition-first',  // vs 'formal-first'
    definition_style: 'plain-then-formal', // vs 'formal-only'
    worked_example_max_steps: 5,
    practice_problem_count: 3,
    practice_distribution: 'warm-medium-cold',
    formalism_level: 'moderate',           // low | moderate | high
    analogy_encouraged: true,
    prerequisites_when: 'always',          // always | when-needed | never
    glossary_when: 'always',
  },

  // Responsive behaviour
  responsive: {
    desktop: { layout: 'two-column', sidebar: 'sticky' },
    tablet:  { layout: 'single-column', sidebar: 'drawer' },
    mobile:  { layout: 'single-column', sidebar: 'inline-strip' },
  },

  // Print rules
  print: {
    sidebar: 'inline-strip-at-end',
    hints: 'visible',
    solutions: 'hidden',
    step_reveal: 'all-expanded',
    write_in_lines: 'rendered',
    page_break_before: ['section-header'],
    never_break_inside: ['worked-example-card', 'practice-stack'],
  },

  // Capacity overrides — can tighten but not loosen component defaults
  capacity_overrides: {
    'glossary-rail': { termsMax: 5 },  // this template prefers fewer terms
  },

  // Community metadata
  community: {
    created_by: 'lectio-core',
    created_at: '2026-03',
    subject_spine_tags: ['universal'],
    outcome_ratings: [],
    times_used: 0,
  },
}
```

---

## Part 2 — The TemplateConfig Type

The TypeScript type that all template configs must satisfy.
This is what makes template validation automatic.

```typescript
// src/lib/template-types.ts

export type Presence = 'required' | 'conditional' | 'optional'
export type InteractionLevel = 'none' | 'light' | 'medium' | 'high'
export type FormalisationLevel = 'low' | 'moderate' | 'high'
export type ExplanationStyle = 'intuition-first' | 'formal-first' | 'balanced'
export type DefinitionStyle = 'plain-then-formal' | 'formal-only' | 'plain-only'
export type PracticeDistribution =
  'warm-medium-cold' | 'warm-warm-medium' | 'medium-cold-cold' | 'equal'
export type PrerequisitesWhen = 'always' | 'when-needed' | 'never'

export interface ComponentSlot {
  id: string                        // must match registry component id
  presence: Presence
  behaviour_override?: string       // overrides behaviour_defaults for this instance
}

export interface ResponsiveMode {
  layout: 'two-column' | 'single-column' | 'tabs'
  sidebar: 'sticky' | 'drawer' | 'inline-strip' | 'hidden'
}

export interface PrintRules {
  sidebar: 'sticky' | 'inline-strip-at-end' | 'hidden'
  hints: 'visible' | 'hidden'
  solutions: 'visible' | 'hidden'
  step_reveal: 'all-expanded' | 'first-only'
  write_in_lines: 'rendered' | 'hidden'
  page_break_before: string[]       // component ids
  never_break_inside: string[]      // component ids
}

export interface GenerationGuidance {
  hook_max_words: number
  explanation_max_words: number
  explanation_style: ExplanationStyle
  definition_style: DefinitionStyle
  worked_example_max_steps: number
  practice_problem_count: number
  practice_distribution: PracticeDistribution
  formalism_level: FormalisationLevel
  analogy_encouraged: boolean
  prerequisites_when: PrerequisitesWhen
  glossary_when: PrerequisitesWhen
}

export interface LearnerProfile {
  levels: Array<'below-average' | 'scaffolded' | 'standard' | 'advanced' | 'gifted'>
  grade_bands: Array<'primary' | 'secondary' | 'advanced'>
  subjects: string[]
}

export interface CommunityMeta {
  created_by: string
  created_at: string
  subject_spine_tags: string[]
  outcome_ratings: number[]
  times_used: number
}

export interface TemplateConfig {
  id: string                        // unique — snake_case_v1
  name: string                      // human readable
  version: string                   // semver
  intent: string                    // one sentence — the instructional strategy
  learner_profile: LearnerProfile
  components: ComponentSlot[]       // in render order
  sidebar_components?: ComponentSlot[]
  behaviour_defaults: Record<string, string>
  interaction_level: InteractionLevel
  generation_guidance: GenerationGuidance
  responsive: {
    desktop: ResponsiveMode
    tablet: ResponsiveMode
    mobile: ResponsiveMode
  }
  print: PrintRules
  capacity_overrides?: Record<string, Record<string, number>>
  community: CommunityMeta
}
```

---

## Part 3 — layout.svelte (The Component Assembly)

The layout file is the renderer. It reads from the config
and assembles the components in the declared order.

The layout does not make decisions — the config already
made them. The layout only executes them.

```svelte
<!-- templates/guided-concept-path/layout.svelte -->
<script lang="ts">
  import type { SectionContent } from '$lib/types'
  import { warnIfInvalid } from '$lib/validate'
  import { config } from './config'

  // All components
  import SectionHeader from '$components/lectio/SectionHeader.svelte'
  import PrerequisiteStrip from '$components/lectio/PrerequisiteStrip.svelte'
  import HookHero from '$components/lectio/HookHero.svelte'
  import ExplanationBlock from '$components/lectio/ExplanationBlock.svelte'
  import InsightStrip from '$components/lectio/InsightStrip.svelte'
  import DefinitionCard from '$components/lectio/DefinitionCard.svelte'
  import DiagramBlock from '$components/lectio/DiagramBlock.svelte'
  import WorkedExampleCard from '$components/lectio/WorkedExampleCard.svelte'
  import PitfallAlert from '$components/lectio/PitfallAlert.svelte'
  import PracticeStack from '$components/lectio/PracticeStack.svelte'
  import ReflectionPrompt from '$components/lectio/ReflectionPrompt.svelte'
  import WhatNextBridge from '$components/lectio/WhatNextBridge.svelte'
  import GlossaryRail from '$components/lectio/GlossaryRail.svelte'

  export let section: SectionContent

  // Validate capacity limits in development
  warnIfInvalid(section)

  // Behaviour mode for worked example — from config defaults
  const workedExampleMode = config.behaviour_defaults['worked-example-card']
</script>

<div class="max-w-4xl mx-auto">
  <div class="lg:grid lg:grid-cols-[1fr_220px] lg:gap-8 lg:items-start">

    <!-- Main content column -->
    <div class="space-y-6">

      <!-- Required: always present -->
      <SectionHeader content={section.header} />

      <!-- Conditional: if prerequisites exist -->
      {#if section.prerequisites}
        <PrerequisiteStrip content={section.prerequisites} />
      {/if}

      <!-- Required: always present -->
      <HookHero content={section.hook} />
      <ExplanationBlock content={section.explanation} />

      <!-- Conditional: if insight strip exists -->
      {#if section.insight_strip}
        <InsightStrip content={section.insight_strip} />
      {/if}

      <!-- Conditional: definition or family -->
      {#if section.definition_family}
        <DefinitionFamily content={section.definition_family} />
      {:else if section.definition}
        <DefinitionCard content={section.definition} />
      {/if}

      <!-- Conditional: diagram -->
      {#if section.diagram}
        <DiagramBlock content={section.diagram} />
      {/if}

      <!-- Conditional: worked example(s) -->
      {#if section.worked_examples}
        {#each section.worked_examples as example}
          <WorkedExampleCard content={example} mode={workedExampleMode} />
        {/each}
      {:else if section.worked_example}
        <WorkedExampleCard
          content={section.worked_example}
          mode={workedExampleMode}
        />
      {/if}

      <!-- Conditional: pitfall(s) -->
      {#if section.pitfalls}
        {#each section.pitfalls as pitfall}
          <PitfallAlert content={pitfall} />
        {/each}
      {:else if section.pitfall}
        <PitfallAlert content={section.pitfall} />
      {/if}

      <!-- Required: always present -->
      <PracticeStack
        content={section.practice}
        hints_visible_default={false}
      />

      <!-- Optional: reflection -->
      {#if section.reflection}
        <ReflectionPrompt content={section.reflection} />
      {/if}

      <!-- Required: always present -->
      <WhatNextBridge content={section.what_next} />
    </div>

    <!-- Sidebar: conditional -->
    {#if section.glossary}
      <aside class="hidden lg:block">
        <GlossaryRail
          content={section.glossary}
          class="sticky top-6"
        />
      </aside>
    {/if}

  </div>
</div>
```

---

## Part 4 — The Template Registry

Just like the component registry, a template registry
drives everything — the showcase, the teacher gallery,
the LLM template selection, community contributions.

```typescript
// src/lib/template-registry.ts

import type { TemplateConfig } from './template-types'
import { config as guidedConceptPath } from '../templates/guided-concept-path/config'
import { config as figureFirst } from '../templates/figure-first/config'
import { config as compareAndApply } from '../templates/compare-and-apply/config'
import { config as formalTrack } from '../templates/formal-track/config'
import { config as processAndProcedure } from '../templates/process-and-procedure/config'
import { config as narrativeArc } from '../templates/narrative-arc/config'
import { config as chunkedAndCalm } from '../templates/chunked-and-calm/config'
import { config as interactiveExplorer } from '../templates/interactive-explorer/config'
import { config as minimalPrintFirst } from '../templates/minimal-print-first/config'

export const templateRegistry: Record<string, TemplateConfig> = {
  guided_concept_path_v1:   guidedConceptPath,
  figure_first_v1:          figureFirst,
  compare_and_apply_v1:     compareAndApply,
  formal_track_v1:          formalTrack,
  process_and_procedure_v1: processAndProcedure,
  narrative_arc_v1:         narrativeArc,
  chunked_and_calm_v1:      chunkedAndCalm,
  interactive_explorer_v1:  interactiveExplorer,
  minimal_print_first_v1:   minimalPrintFirst,
}

// Helpers the showcase and generator use
export function getTemplateById(id: string): TemplateConfig | undefined {
  return templateRegistry[id]
}

export function getTemplatesForLearner(
  level: string,
  subject: string
): TemplateConfig[] {
  return Object.values(templateRegistry).filter(t =>
    t.learner_profile.levels.includes(level as any) &&
    (t.learner_profile.subjects.includes('universal') ||
     t.learner_profile.subjects.includes(subject))
  )
}

export function getTemplatesForPrint(): TemplateConfig[] {
  return Object.values(templateRegistry).filter(t =>
    t.interaction_level === 'none' || t.interaction_level === 'light'
  )
}
```

---

## The Template Creation Process — Three Paths

### Path A — Core Team Builds a Template

This is how the initial nine templates get built.

```
1. Write the instructional intent (one sentence)
   If you cannot write one sentence, stop — the template is not clear yet.

2. Write the README.md first
   — instructional intent
   — who it is for (learner levels, subjects)
   — when to use it
   — when NOT to use it
   — component bundle rationale (why each component is there)
   README written before any code — forces clarity

3. Write config.ts
   — component bundle
   — behaviour defaults
   — generation guidance
   — responsive rules
   — print rules

4. Write preview.ts
   — dummy content for this template's subject area
   — exercises the full component bundle
   — used by showcase page

5. Write layout.svelte
   — assembles components in config order
   — no logic, no decisions — just execution

6. Validate
   — run the template against the dummy content
   — check all components render correctly
   — check responsive at 3 breakpoints
   — check print output

7. Register in template-registry.ts
8. Appears in showcase automatically
```

### Path B — LLM Generates a Novel Template

This is the extension mechanism — someone describes
what they want and an LLM produces the full template package.

```
Input:
  "I want a template for teaching chemistry
   that leads with the molecular diagram,
   uses a comparison grid for reaction types,
   and has a formal definition style"

LLM generates:
  config.ts      — constrained to registered components only
  layout.svelte  — assembles described components
  preview.ts     — chemistry dummy content
  README.md      — intent derived from description

Validation gate (automatic):
  ✓ All component ids exist in component registry
  ✓ All required fields present in config
  ✓ Interaction level valid
  ✓ No components exceed capacity
  ✓ Print rules complete

If validation passes → generates preview
If preview looks right → registers in template registry
```

The LLM cannot hallucinate a component that does not exist
because the prompt includes the full component registry.
It can only arrange what is already registered.

### Path C — Community Contribution

```
1. Contributor describes their template (README.md first)
2. System generates a draft config.ts from the description
3. Contributor reviews and adjusts the config
4. System generates preview with dummy content
5. Contributor approves or requests changes
6. Automated validation gate runs
7. If passes — submitted for community review
8. Community votes based on classroom outcome rating
9. If approved — merged into template registry
```

---

## How Template Creation Connects to the Content Pipeline

This is the key integration point.

The content generator receives the `TemplateConfig` before
generating anything. The config's `generation_guidance` block
becomes part of the LLM prompt:

```
You are generating content for the {config.name} template.

Instructional intent: {config.intent}

Component bundle (in order):
{config.components.map(c => c.id + ' (' + c.presence + ')')}

Generation rules:
- Hook: max {generation_guidance.hook_max_words} words
- Explanation: max {generation_guidance.explanation_max_words} words,
  style: {generation_guidance.explanation_style}
- Definition style: {generation_guidance.definition_style}
- Worked example: max {generation_guidance.worked_example_max_steps} steps
- Practice: {generation_guidance.practice_problem_count} problems,
  distribution: {generation_guidance.practice_distribution}
- Formalism level: {generation_guidance.formalism_level}
- Prerequisites: {generation_guidance.prerequisites_when}

Generate content that fits exactly within these constraints.
The template renderer will reject content that exceeds them.
```

The template config is the prompt. The content is the response.
This is why the config must exist before content generation begins.

---

## What Comes First — The Build Order for This Phase

```
Week 1 — Infrastructure
  TemplateConfig type (template-types.ts)
  Template registry (template-registry.ts)
  Validation for templates (extend validate.ts)
  README template for new templates

Week 2 — First three templates
  guided-concept-path  (most versatile, prove the pattern)
  minimal-print-first  (simplest — no interactivity, proves print)
  chunked-and-calm     (accommodation template — proves the concept)

Week 3 — Next three templates
  compare-and-apply    (proves ComparisonGrid is load-bearing)
  formal-track         (proves formalism_level: 'high' path)
  figure-first         (proves diagram-led layout)

Week 4 — Final three + LLM creation path
  narrative-arc        (proves TimelineBlock integration)
  process-and-procedure (proves ProcessSteps integration)
  interactive-explorer (proves SimulationBlock integration)
  LLM template generation prompt — now that all nine exist
  as examples, the LLM has patterns to learn from

Week 5 — Showcase + community infrastructure
  Template gallery page (reads from template-registry)
  Template detail page (shows README + live preview)
  Community contribution flow (Path C above)
```

---

## The Three Rules That Govern All Templates

**Rule 1: Intent before implementation.**
The README.md is written before any code. The instructional
intent is stated in one sentence. If you cannot state it,
the template is not clear enough to build.

**Rule 2: Config before layout.**
The config.ts is complete before layout.svelte is written.
The layout only executes what the config already decided.
A layout that makes decisions is a broken template.

**Rule 3: Components are the boundary.**
A template cannot use a component that is not in the
component registry. If the template needs something new,
register the component first, then build the template.
This rule makes community templates automatically safe.

---

## What Success Looks Like for This Phase

```
✓ TemplateConfig type is complete and strict
✓ All nine initial templates have complete configs
✓ Template registry drives the gallery automatically
✓ Adding a new template requires only:
    - a README
    - a config.ts
    - a layout.svelte
    - a preview.ts
  Nothing else needs to change
✓ LLM can generate a valid config.ts from a description
  because it is constrained to registered components
✓ Community contributors have a clear path:
  describe → generate draft → review → validate → submit
✓ The content pipeline reads config.ts before generating
  anything — template drives generation from word one
```

---

*End of Template Creation Specification*
*The config is the template.
Everything else is just execution.*
> Status note (2026-03-17): This is a planning/spec document. The implemented source of truth lives in `src/lib/template-types.ts`, `src/lib/template-registry.ts`, the per-template folders in `src/lib/templates/`, and the current public routes under `src/app/templates/`.
