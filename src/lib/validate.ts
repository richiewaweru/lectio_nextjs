import type { SectionContent } from "@/lib/types";

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function validateSection(section: SectionContent) {
  const warnings: string[] = [];

  if (countWords(section.hook.headline) > 12) {
    warnings.push(
      `HookHero headline exceeds 12 words (${countWords(section.hook.headline)}).`
    );
  }

  if (countWords(section.hook.body) > 80) {
    warnings.push(
      `HookHero body exceeds 80 words (${countWords(section.hook.body)}).`
    );
  }

  if (countWords(section.explanation.body) > 350) {
    warnings.push("ExplanationBlock body exceeds 350 words.");
  }

  if (section.explanation.emphasis.length > 3) {
    warnings.push("ExplanationBlock uses more than 3 emphasis phrases.");
  }

  if (section.explanation.callouts && section.explanation.callouts.length > 3) {
    warnings.push(
      `ExplanationBlock has ${section.explanation.callouts.length} callouts; max is 3.`
    );
  }

  section.explanation.callouts?.forEach((callout, index) => {
    if (countWords(callout.text) > 60) {
      warnings.push(
        `ExplanationBlock callout ${index + 1} exceeds 60 words.`
      );
    }
  });

  if (section.definition) {
    if (countWords(section.definition.formal) > 80) {
      warnings.push("DefinitionCard formal definition exceeds 80 words.");
    }
    if (countWords(section.definition.plain) > 60) {
      warnings.push("DefinitionCard plain definition exceeds 60 words.");
    }
    if (section.definition.examples && section.definition.examples.length > 3) {
      warnings.push(
        `DefinitionCard has ${section.definition.examples.length} examples; max is 3.`
      );
    }
    section.definition.examples?.forEach((example, index) => {
      if (countWords(example) > 30) {
        warnings.push(
          `DefinitionCard example ${index + 1} exceeds 30 words.`
        );
      }
    });
    if (
      section.definition.related_terms &&
      section.definition.related_terms.length > 4
    ) {
      warnings.push(
        `DefinitionCard has ${section.definition.related_terms.length} related terms; max is 4.`
      );
    }
  }

  if (section.worked_example) {
    if (section.worked_example.steps.length > 6) {
      warnings.push(
        `WorkedExampleCard has ${section.worked_example.steps.length} steps; max is 6.`
      );
    }
    section.worked_example.steps.forEach((step, index) => {
      if (countWords(step.label) > 12) {
        warnings.push(
          `WorkedExampleCard step ${index + 1} label exceeds 12 words.`
        );
      }
      if (countWords(step.content) > 80) {
        warnings.push(
          `WorkedExampleCard step ${index + 1} content exceeds 80 words.`
        );
      }
    });
    if (
      section.worked_example.answer &&
      countWords(section.worked_example.answer) > 30
    ) {
      warnings.push("WorkedExampleCard answer exceeds 30 words.");
    }
    if (
      section.worked_example.alternatives &&
      section.worked_example.alternatives.length > 3
    ) {
      warnings.push(
        `WorkedExampleCard has ${section.worked_example.alternatives.length} alternatives; max is 3.`
      );
    }
    section.worked_example.alternatives?.forEach((alternative, index) => {
      if (countWords(alternative) > 40) {
        warnings.push(
          `WorkedExampleCard alternative ${index + 1} exceeds 40 words.`
        );
      }
    });
  }

  if (section.practice.problems.length === 0) {
    warnings.push("PracticeStack has 0 problems; min is 1.");
  } else if (section.practice.problems.length > 6) {
    warnings.push(
      `PracticeStack has ${section.practice.problems.length} problems; max is 6.`
    );
  } else if (section.practice.problems.length > 4) {
    warnings.push(
      `PracticeStack has ${section.practice.problems.length} problems; consider trimming to 4.`
    );
  }

  section.practice.problems.forEach((problem, index) => {
    if (countWords(problem.question) > 100) {
      warnings.push(
        `PracticeStack problem ${index + 1} question exceeds 100 words.`
      );
    }
    if (countWords(problem.hint) > 60) {
      warnings.push(
        `PracticeStack problem ${index + 1} hint exceeds 60 words.`
      );
    }
    if (problem.hints && problem.hints.length > 3) {
      warnings.push(
        `PracticeStack problem ${index + 1} has ${problem.hints.length} tiered hints; max is 3.`
      );
    }
    problem.hints?.forEach((hint, hintIndex) => {
      if (countWords(hint) > 60) {
        warnings.push(
          `PracticeStack problem ${index + 1} tiered hint ${hintIndex + 1} exceeds 60 words.`
        );
      }
    });
    if (problem.answer && countWords(problem.answer) > 40) {
      warnings.push(
        `PracticeStack problem ${index + 1} answer exceeds 40 words.`
      );
    }
    if (problem.solution && countWords(problem.solution) > 120) {
      warnings.push(
        `PracticeStack problem ${index + 1} solution exceeds 120 words.`
      );
    }
  });

  if (section.pitfall) {
    if (section.pitfall.example && countWords(section.pitfall.example) > 40) {
      warnings.push("PitfallAlert example exceeds 40 words.");
    }
    if (section.pitfall.examples && section.pitfall.examples.length > 3) {
      warnings.push(
        `PitfallAlert has ${section.pitfall.examples.length} examples; max is 3.`
      );
    }
    section.pitfall.examples?.forEach((example, index) => {
      if (countWords(example) > 40) {
        warnings.push(
          `PitfallAlert example ${index + 1} exceeds 40 words.`
        );
      }
    });
    if (section.pitfall.why && countWords(section.pitfall.why) > 60) {
      warnings.push("PitfallAlert why note exceeds 60 words.");
    }
  }

  if (section.glossary) {
    if (section.glossary.terms.length > 8) {
      warnings.push(
        `GlossaryRail has ${section.glossary.terms.length} terms; max is 8.`
      );
    }
    section.glossary.terms.forEach((term, index) => {
      if (countWords(term.definition) > 30) {
        warnings.push(
          `GlossaryRail term ${index + 1} definition exceeds 30 words.`
        );
      }
      if (term.related && term.related.length > 3) {
        warnings.push(
          `GlossaryRail term ${index + 1} has ${term.related.length} related terms; max is 3.`
        );
      }
    });
  }

  if (
    section.what_next.prerequisites &&
    section.what_next.prerequisites.length > 4
  ) {
    warnings.push(
      `WhatNextBridge has ${section.what_next.prerequisites.length} prerequisites; max is 4.`
    );
  }
  section.what_next.prerequisites?.forEach((prerequisite, index) => {
    if (countWords(prerequisite) > 10) {
      warnings.push(
        `WhatNextBridge prerequisite ${index + 1} exceeds 10 words.`
      );
    }
  });

  return warnings;
}
