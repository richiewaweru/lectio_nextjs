# Template Gallery — Family-Based Organisation Proposal
**Status:** Adopted direction — ready for implementation
**Audience:** Claude Code / Codex — build from this document

---

## The Core Decision

Templates are organised by family first, individual template second.

A teacher does not browse 15 templates. They answer one question —
"what kind of lesson is this?" — pick a family, then pick the
specific template within that family that fits their situation.

Two mental steps. Not fifteen options at once.

This mirrors how teachers actually think. They do not think in
template names. They think in teaching intentions: "I need to
introduce something new" or "I need to revise before the exam"
or "my students respond better to visuals."

---

## The Six Families

Each family is a distinct teaching philosophy. The separation
axis is instructional intent — not subject, not visual style,
not complexity. Templates within a family share the same
core intent but differ in learner profile, density, or depth.

### Family A — Guided Concept
**Intent:** Teach a new idea progressively from felt need
to formal understanding to practice.

The student encounters the concept for the first time.
The lesson flow is predictable: hook creates the need,
explanation builds the model, definition anchors the term,
worked example shows it in action, practice applies it.
Predictability is a feature — when students know what
comes next, they spend their energy on the content.

Templates in this family:
- Guided Concept Path — full scaffolded arc, most versatile
- Guided Concept Compact — faster pace for confident learners
- Formal Track — rigorous, proof-ready, no hand-holding

### Family B — Visual Exploration
**Intent:** Build understanding from a diagram or image first,
with prose arriving after to name what the visual already showed.

The diagram is not an illustration of the concept.
It is the opening statement. Prose is the commentary.
The student sees before they read — and when vocabulary
arrives, it lands on something they can already point to.

Templates in this family:
- Figure First — single diagram opens the section
- Diagram-Led Lesson — multiple diagrams in series tell the story

### Family C — Compare and Distinguish
**Intent:** Teach by contrast — a concept understood through
what it shares with and what separates it from something similar.

The comparison grid is the centrepiece, not a supporting element.
The student holds two or more things in mind simultaneously.
The distinction becomes structural, not textual.

Templates in this family:
- Compare and Apply — two concepts, side by side grid
- Distinction Grid — three or more concepts, classification-focused

### Family D — Narrative and Timeline
**Intent:** Teach through sequence, story, and cause and effect.

Some knowledge is best understood as a story with causes and
consequences. The timeline is the spine. The student moves
through time rather than through a logical argument.
Reading this family should feel like forward motion.

Templates in this family:
- Timeline Narrative — chronological flow, scrubber on desktop
- Story of an Idea — how a concept was discovered and debated

### Family E — Process and Procedure
**Intent:** Make a repeatable procedure learnable — each step
enabling the next, the sequence made inevitable.

The procedure is the lesson. Everything else — the hook,
the explanation, the worked example — exists to support
executing the procedure with understanding.
The student should be able to follow the page with one finger.

Templates in this family:
- Process Trainer — numbered steps with a full worked case
- Stepwise Method — algorithm-style, input/output at each step

### Family F — Focus and Accommodation
**Intent:** Reduce cognitive overload and support specific
learner processing needs — same concept, different presentation.

This family is an accommodation, not a simplification.
The concept is not watered down. The pedagogy is not reduced.
The presentation is restructured to remove cognitive friction:
shorter chunks, more breathing room, stronger focus markers,
fewer competing elements.

Templates in this family:
- Focus Flow — ADHD-friendly, one idea at a time
- Calm Reading Path — dyslexia-sensitive, short lines, large type
- Chunked Support Lesson — SPED, frequent anchoring checks
- Concept Reinforcement — revision and retrieval, no re-teaching

---

## The Filter System

Three filter dimensions. Each works independently.
Filters operate at two levels simultaneously:
- Hides entire families when nothing in them matches
- Hides individual templates within visible families

The family count header updates dynamically to show
how many templates remain visible within each family.

### Dimension 1 — Lesson Intent

What is the teacher trying to do with this lesson?

```
[ All ]
[ New concept ]      → A, B (sometimes)
[ Visual-first ]     → B
[ Comparison ]       → C
[ Narrative ]        → D
[ Procedure ]        → E
[ Revision ]         → F (Concept Reinforcement)
[ Deep dive ]        → A (Formal Track), A (Compact)
[ Support / SPED ]   → F
```

### Dimension 2 — Learner Type

Who is in the room?

```
[ All ]
[ General / mixed ]  → A (Path), B, C, D, E
[ Visual ]           → B, A (Path)
[ Analytical ]       → C
[ Narrative ]        → D
[ Needs support ]    → F
[ Advanced ]         → A (Formal Track, Compact)
```

### Dimension 3 — Interaction Level

How interactive should the lesson be?
This filter matters most for teachers who know their
delivery context — devices in the room, screen or print.

```
[ All ]
[ None — print only ]
  → Templates with no interactive behaviour.
    Every element is static. Safe to print with no loss.
    Best for: physical handouts, no-device classrooms,
    exam conditions, primary school printed booklets.

[ Light — some interaction ]
  → Hint toggles, step reveals, definition toggles.
    Minimal JavaScript. Degrades gracefully to print.
    Best for: mixed environments, BYOD classrooms,
    homework sent home, one device per two students.

[ Medium — meaningful interaction ]
  → Step-reveal worked examples, accordion practice,
    timeline scrubber, sticky glossary sidebar,
    zoom on diagrams.
    Best for: 1:1 device classrooms, screen-first delivery,
    computer labs, homework on personal devices.

[ High — simulation-driven ]
  → Live sliders, interactive graphs, probability trees,
    molecule viewers, geometric explorers.
    Requires screen. No meaningful print path.
    Best for: mathematics and science at secondary level,
    motivated self-study, discovery-based sessions.
```

The interaction filter maps to templates as follows:

| Template | Interaction level |
|---|---|
| Formal Track | None |
| Calm Reading Path | None |
| Minimal Print-First | None |
| Focus Flow | Light |
| Chunked Support Lesson | Light |
| Guided Concept Compact | Light |
| Stepwise Method | Light |
| Process Trainer | Light |
| Concept Reinforcement | Light |
| Compare and Apply | Light |
| Distinction Grid | Light |
| Guided Concept Path | Medium |
| Figure First | Medium |
| Diagram-Led Lesson | Medium |
| Timeline Narrative | Medium |
| Story of an Idea | Medium |
| Interactive Explorer | High |

---

## What Each Template Card Shows

Designed to communicate the essential in under 10 seconds.

```
┌─────────────────────────────────────────────────┐
│  Template name                    [Family badge] │
│  One-sentence tagline                            │
│                                                  │
│  👤  Learner fit · Subject fit                  │
│  ●●○  Interaction level · Reading style         │
│                                                  │
│  [tag]  [tag]  [tag]                            │
│                                                  │
│  ★ rating · N uses                  [Use this] │
└─────────────────────────────────────────────────┘
```

**Family badge** — colour-coded by family (A=blue, B=green,
C=purple, D=coral, E=olive, F=pink). Consistent with the
family header colour. The teacher learns the colour system
quickly after first use.

**Tagline** — one sentence, plain language, written for a
teacher not a developer. Not the instructional intent from
the config — a human version of it.

**Interaction dots** — three dots, filled to indicate level.
One dot = light. Two dots = medium. Three dots = high.
Zero filled = print only. The fastest signal for delivery context.

**Tags** — Print-ready, Screen-first, Sidebar glossary,
Step reveal, Timeline, Simulation, Checklist, ADHD-friendly,
Dyslexia-friendly, Exam prep, Universal, etc.

**Rating and usage** — community signal. Teachers trust
other teachers. A template used 2,400 times communicates
something no description can.

**Use this button** — opens the generation flow with this
template pre-selected. The teacher has already committed
before they see any other options.

---

## The Template Detail Page

When a teacher clicks a card or the detail link, they see:

```
HEADER (sticky)
  Family → Template name
  Tagline
  [Use this template] always visible

PREVIEW (default tab)
  Full live render of a real section in this template
  Subject switcher: Maths · Science · History · English
  The preview updates to subject-appropriate content
  — not dummy text, real generated content per subject

ABOUT (second tab)
  "This template works best when..."
  "Your students will experience..."
  Visual lesson flow diagram (not a list, a picture)
  "Best for:" — 3-5 bullet points
  "Not ideal when:" — 2-3 bullet points
  Component list in plain language
    (not component IDs — "includes a definition card
    with a plain language toggle" not "DefinitionCard")

SIMILAR TEMPLATES
  2-3 related cards from adjacent families
```

---

## Gallery Page Structure

```
/templates

Page header
  "Template gallery"
  "Six teaching families. Filter to find your match."

Filter bar — always visible, three rows
  Row 1: Intent chips
  Row 2: Learner chips + separator + Print chips
  Row 3: Interaction level chips  ← new, important

Count bar
  "Showing N templates across M families"

Family sections — stacked vertically
  Each family:
    Header (colour dot · family name · intent · template count)
    Template grid (auto-fill, min 240px per card)

Empty state
  "No templates match these filters.
   Try broadening your selection."
```

The family sections themselves are never hidden by default.
They collapse gracefully — if a family has no matching
templates under current filters, the family header is hidden
along with its templates. The remaining families reflow.

---

## The Interaction Filter — Implementation Detail

The interaction filter deserves precise implementation
because it affects two different things: what the template
can do on screen, and what it produces when printed.

**On screen:** Higher interaction levels add progressive
disclosure, timeline scrubbers, sticky sidebars, and at
the highest level, live simulations. These require JavaScript.

**On print:** Every template has a complete print path.
The interaction level only affects the print output in
that higher-interaction elements get static fallbacks:
- Step-reveal → all steps expanded
- Hint toggle → hints visible
- Timeline scrubber → vertical event list
- Simulation → static diagram at midstate

The interaction filter is not a print filter. Even a
high-interaction template prints correctly. The filter
tells the teacher what the screen experience is like,
not whether printing works.

This distinction should be communicated on the filter UI:

```
Interaction level
  [ None ] [ Light ] [ Medium ] [ High ]
  Note below: "All templates print cleanly regardless of level"
```

---

## Preset Selection in the Gallery

After a teacher selects a template, they optionally choose
a visual preset before generating. Presets are not shown
in the gallery cards — they are a secondary choice made
in the generation flow.

The five starter presets available to all templates:

```
Blue Classroom   — professional, screen-optimised, blue accent
Warm Paper       — editorial, warm neutrals, serif body text
Calm Green       — soft, accommodation-friendly, green accents
Minimal Light    — clean white, no decoration, print-first feel
High Contrast    — strong contrast, accessibility-focused
```

Each template declares which presets it allows.
Focus Flow and Chunked Support Lesson do not allow
Blue Classroom — it is too visually stimulating for
learners who benefit from those templates. Formal Track
only allows Warm Paper and Minimal Light — the others
are too soft for its rigorous character.

The preset allowance is enforced by the template config,
not by the gallery UI. The gallery only shows the teacher
the presets that are valid for the template they selected.

---

## What Success Looks Like

A teacher who has never used Lectio should be able to:

1. Land on the gallery page
2. See six clearly labelled family sections
3. Apply one or two filters to narrow their options
4. Identify the right family and template in under 2 minutes
5. Click "Use this template" with confidence

The gallery fails if:
- A teacher reads all 15 template descriptions to make a choice
- A teacher cannot tell from the card alone what kind of lesson
  the template produces
- The interaction filter is confusing or incorrectly suggests
  some templates cannot be printed
- The family organisation feels arbitrary

The gallery succeeds when a teacher who teaches the same
subject to three different ability groups can identify
three different appropriate templates in one visit —
one from Family A for the standard group, one from Family F
for the group that needs support, and one from Family A
(Formal Track) for the advanced group.

---

## Implementation Notes for Claude Code / Codex

Build the gallery as a SvelteKit route at `/templates`.

The gallery reads from `src/lib/template-registry.ts`.
Adding a new template to the registry automatically
adds it to the gallery. No manual gallery updates.

Each template in the registry carries:
```typescript
{
  id, name, family, tagline,
  learner_fit: string[],
  subject_fit: string[],
  interaction_level: 'none' | 'light' | 'medium' | 'high',
  tags: string[],
  rating: number,
  uses: number,
  allowed_presets: string[],
  print_quality: 'excellent' | 'good' | 'limited',
}
```

The filter logic runs client-side. No server round-trip
on filter change. Filters apply to both family visibility
and individual template visibility within visible families.

The family count in each header updates reactively.
The total count in the count bar updates reactively.

Clicking a template card navigates to `/templates/[id]`
which is the detail page. The detail page also reads from
the registry and renders the live preview using the
template's preview dummy content from `preview.ts`.

The subject switcher on the detail page preview loads
subject-specific dummy content from a content map in
`src/lib/preview-content.ts`. Start with four subjects:
Mathematics, Biology, History, English.

---

*The gallery is the teacher's first experience of Lectio.*
*If they cannot find the right template confidently,*
*the system has failed before a single word is generated.*
> Status note (2026-03-17): This is a planning/proposal document. The implemented gallery source of truth lives in `src/app/templates/templates-gallery.tsx`, `src/app/templates/[templateId]/page.tsx`, and `src/lib/template-registry.ts`.
