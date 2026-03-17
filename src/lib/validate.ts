import type {
  ComparisonGridContent,
  DiagramCompareContent,
  DiagramContent,
  DiagramSeriesContent,
  PitfallContent,
  SectionContent,
  TimelineContent,
  WorkedExampleContent
} from "@/lib/types";
import {
  getPitfallList,
  getSectionHeaderContent,
  getWorkedExamples,
  normalizePracticeHints,
  normalizePracticeSolution
} from "@/lib/types";

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function warn(location: string, message: string) {
  return `[Lectio/${location}] ${message}`;
}

function validateDiagram(
  diagram: DiagramContent,
  location: string,
  warnings: string[]
) {
  if (countWords(diagram.caption) > 60) {
    warnings.push(warn(location, "caption exceeds 60 words."));
  }

  if (countWords(diagram.alt_text) > 80) {
    warnings.push(warn(location, "alt_text exceeds 80 words."));
  }

  if (diagram.callouts && diagram.callouts.length > 6) {
    warnings.push(warn(location, `has ${diagram.callouts.length} callouts; max is 6.`));
  }

  diagram.callouts?.forEach((callout, index) => {
    if (countWords(callout.label) > 4) {
      warnings.push(warn(location, `callout ${index + 1} label exceeds 4 words.`));
    }

    if (countWords(callout.explanation) > 40) {
      warnings.push(
        warn(location, `callout ${index + 1} explanation exceeds 40 words.`)
      );
    }
  });
}

function validateDiagramCompare(
  content: DiagramCompareContent,
  warnings: string[]
) {
  if (countWords(content.before_label) > 6) {
    warnings.push(warn("DiagramCompare", "before label exceeds 6 words."));
  }

  if (countWords(content.after_label) > 6) {
    warnings.push(warn("DiagramCompare", "after label exceeds 6 words."));
  }

  if (countWords(content.caption) > 60) {
    warnings.push(warn("DiagramCompare", "caption exceeds 60 words."));
  }

  if (countWords(content.alt_text) > 80) {
    warnings.push(warn("DiagramCompare", "alt_text exceeds 80 words."));
  }
}

function validateDiagramSeries(
  content: DiagramSeriesContent,
  warnings: string[]
) {
  if (countWords(content.title) > 10) {
    warnings.push(warn("DiagramSeries", "title exceeds 10 words."));
  }

  if (content.diagrams.length > 4) {
    warnings.push(warn("DiagramSeries", `has ${content.diagrams.length} diagrams; max is 4.`));
  }

  content.diagrams.forEach((diagram, index) => {
    if (countWords(diagram.step_label) > 8) {
      warnings.push(
        warn("DiagramSeries", `diagram ${index + 1} step label exceeds 8 words.`)
      );
    }

    if (countWords(diagram.caption) > 40) {
      warnings.push(
        warn("DiagramSeries", `diagram ${index + 1} caption exceeds 40 words.`)
      );
    }
  });
}

function validateComparisonGrid(
  content: ComparisonGridContent,
  warnings: string[]
) {
  if (countWords(content.title) > 10) {
    warnings.push(warn("ComparisonGrid", "title exceeds 10 words."));
  }

  if (content.intro && countWords(content.intro) > 60) {
    warnings.push(warn("ComparisonGrid", "intro exceeds 60 words."));
  }

  if (content.columns.length < 2 || content.columns.length > 4) {
    warnings.push(
      warn(
        "ComparisonGrid",
        `has ${content.columns.length} columns; expected between 2 and 4.`
      )
    );
  }

  content.columns.forEach((column, index) => {
    if (countWords(column.title) > 6) {
      warnings.push(
        warn("ComparisonGrid", `column ${index + 1} title exceeds 6 words.`)
      );
    }

    if (countWords(column.summary) > 24) {
      warnings.push(
        warn("ComparisonGrid", `column ${index + 1} summary exceeds 24 words.`)
      );
    }

    if (column.detail && countWords(column.detail) > 50) {
      warnings.push(
        warn("ComparisonGrid", `column ${index + 1} detail exceeds 50 words.`)
      );
    }
  });

  if (content.rows.length > 6) {
    warnings.push(warn("ComparisonGrid", `has ${content.rows.length} rows; max is 6.`));
  }

  content.rows.forEach((row, index) => {
    if (countWords(row.criterion) > 8) {
      warnings.push(
        warn("ComparisonGrid", `row ${index + 1} criterion exceeds 8 words.`)
      );
    }

    if (row.values.length !== content.columns.length) {
      warnings.push(
        warn(
          "ComparisonGrid",
          `row ${index + 1} has ${row.values.length} values; expected ${content.columns.length}.`
        )
      );
    }

    row.values.forEach((value, valueIndex) => {
      if (countWords(value) > 20) {
        warnings.push(
          warn(
            "ComparisonGrid",
            `row ${index + 1} value ${valueIndex + 1} exceeds 20 words.`
          )
        );
      }
    });

    if (row.takeaway && countWords(row.takeaway) > 24) {
      warnings.push(
        warn("ComparisonGrid", `row ${index + 1} takeaway exceeds 24 words.`)
      );
    }
  });
}

function validateTimeline(content: TimelineContent, warnings: string[]) {
  if (countWords(content.title) > 10) {
    warnings.push(warn("TimelineBlock", "title exceeds 10 words."));
  }

  if (content.intro && countWords(content.intro) > 60) {
    warnings.push(warn("TimelineBlock", "intro exceeds 60 words."));
  }

  if (content.events.length < 3) {
    warnings.push(warn("TimelineBlock", "requires at least 3 events."));
  }

  if (content.events.length > 8) {
    warnings.push(warn("TimelineBlock", `has ${content.events.length} events; max is 8.`));
  }

  content.events.forEach((event, index) => {
    if (countWords(event.title) > 8) {
      warnings.push(warn("TimelineBlock", `event ${index + 1} title exceeds 8 words.`));
    }

    if (countWords(event.summary) > 50) {
      warnings.push(
        warn("TimelineBlock", `event ${index + 1} summary exceeds 50 words.`)
      );
    }

    if (event.impact && countWords(event.impact) > 24) {
      warnings.push(
        warn("TimelineBlock", `event ${index + 1} impact exceeds 24 words.`)
      );
    }

    if (event.tags && event.tags.length > 3) {
      warnings.push(
        warn("TimelineBlock", `event ${index + 1} has ${event.tags.length} tags; max is 3.`)
      );
    }
  });

  if (content.closing_takeaway && countWords(content.closing_takeaway) > 40) {
    warnings.push(warn("TimelineBlock", "closing_takeaway exceeds 40 words."));
  }
}

function validateWorkedExample(
  example: WorkedExampleContent,
  location: string,
  warnings: string[]
) {
  if (countWords(example.setup) > 60) {
    warnings.push(warn(location, "setup exceeds 60 words."));
  }

  if (countWords(example.conclusion) > 40) {
    warnings.push(warn(location, "conclusion exceeds 40 words."));
  }

  if (example.steps.length > 6) {
    warnings.push(warn(location, `has ${example.steps.length} steps; max is 6.`));
  } else if (example.steps.length > 4) {
    warnings.push(warn(location, `has ${example.steps.length} steps; consider trimming to 4.`));
  }

  example.steps.forEach((step, index) => {
    if (countWords(step.label) > 12) {
      warnings.push(warn(location, `step ${index + 1} label exceeds 12 words.`));
    }

    if (countWords(step.content) > 80) {
      warnings.push(warn(location, `step ${index + 1} content exceeds 80 words.`));
    }

    if (step.note && countWords(step.note) > 30) {
      warnings.push(warn(location, `step ${index + 1} note exceeds 30 words.`));
    }
  });

  if (example.answer && countWords(example.answer) > 30) {
    warnings.push(warn(location, "answer exceeds 30 words."));
  }

  if (example.alternatives && example.alternatives.length > 3) {
    warnings.push(warn(location, `has ${example.alternatives.length} alternatives; max is 3.`));
  }

  example.alternatives?.forEach((alternative, index) => {
    if (countWords(alternative) > 40) {
      warnings.push(warn(location, `alternative ${index + 1} exceeds 40 words.`));
    }
  });

  if (example.alternative) {
    validateWorkedExample(example.alternative, `${location}/Alternative`, warnings);
  }
}

function validatePitfall(
  pitfall: PitfallContent,
  location: string,
  warnings: string[]
) {
  if (countWords(pitfall.misconception) > 20) {
    warnings.push(warn(location, "misconception exceeds 20 words."));
  }

  if (countWords(pitfall.correction) > 80) {
    warnings.push(warn(location, "correction exceeds 80 words."));
  }

  if (pitfall.example && countWords(pitfall.example) > 40) {
    warnings.push(warn(location, "example exceeds 40 words."));
  }

  if (pitfall.examples && pitfall.examples.length > 3) {
    warnings.push(warn(location, `has ${pitfall.examples.length} examples; max is 3.`));
  }

  pitfall.examples?.forEach((example, index) => {
    if (countWords(example) > 40) {
      warnings.push(warn(location, `example ${index + 1} exceeds 40 words.`));
    }
  });

  if (pitfall.why && countWords(pitfall.why) > 60) {
    warnings.push(warn(location, "why note exceeds 60 words."));
  }
}

export function validateSection(section: SectionContent) {
  const warnings: string[] = [];
  const header = getSectionHeaderContent(section);

  if (countWords(header.title) > 12) {
    warnings.push(warn("SectionHeader", "title exceeds 12 words."));
  }

  if (header.subtitle && countWords(header.subtitle) > 20) {
    warnings.push(warn("SectionHeader", "subtitle exceeds 20 words."));
  }

  if (header.objective && countWords(header.objective) > 30) {
    warnings.push(warn("SectionHeader", "objective exceeds 30 words."));
  }

  if (header.level_pills && header.level_pills.length > 4) {
    warnings.push(warn("SectionHeader", `has ${header.level_pills.length} level pills; max is 4.`));
  }

  if (countWords(section.hook.headline) > 12) {
    warnings.push(warn("HookHero", "headline exceeds 12 words."));
  }

  if (countWords(section.hook.body) > 80) {
    warnings.push(warn("HookHero", "body exceeds 80 words."));
  }

  if (section.hook.question_options && section.hook.question_options.length > 3) {
    warnings.push(
      warn("HookHero", `has ${section.hook.question_options.length} question options; max is 3.`)
    );
  }

  if (section.explanation.emphasis.length > 3) {
    warnings.push(warn("ExplanationBlock", "uses more than 3 emphasis phrases."));
  }

  if (countWords(section.explanation.body) > 350) {
    warnings.push(warn("ExplanationBlock", "body exceeds 350 words."));
  }

  if (section.explanation.callouts && section.explanation.callouts.length > 3) {
    warnings.push(warn("ExplanationBlock", `has ${section.explanation.callouts.length} callouts; max is 3.`));
  }

  section.explanation.callouts?.forEach((callout, index) => {
    if (countWords(callout.text) > 60) {
      warnings.push(warn("ExplanationBlock", `callout ${index + 1} exceeds 60 words.`));
    }
  });

  if (section.prerequisites) {
    if (section.prerequisites.items.length > 4) {
      warnings.push(
        warn("PrerequisiteStrip", `has ${section.prerequisites.items.length} items; max is 4.`)
      );
    }

    section.prerequisites.items.forEach((item, index) => {
      if (countWords(item.concept) > 8) {
        warnings.push(
          warn("PrerequisiteStrip", `item ${index + 1} concept exceeds 8 words.`)
        );
      }

      if (item.refresher && countWords(item.refresher) > 60) {
        warnings.push(
          warn("PrerequisiteStrip", `item ${index + 1} refresher exceeds 60 words.`)
        );
      }
    });
  }

  if (section.definition) {
    if (countWords(section.definition.formal) > 80) {
      warnings.push(warn("DefinitionCard", "formal exceeds 80 words."));
    }

    if (countWords(section.definition.plain) > 60) {
      warnings.push(warn("DefinitionCard", "plain exceeds 60 words."));
    }

    if (section.definition.examples && section.definition.examples.length > 3) {
      warnings.push(
        warn("DefinitionCard", `has ${section.definition.examples.length} examples; max is 3.`)
      );
    }

    section.definition.examples?.forEach((example, index) => {
      if (countWords(example) > 30) {
        warnings.push(warn("DefinitionCard", `example ${index + 1} exceeds 30 words.`));
      }
    });

    if (section.definition.related_terms && section.definition.related_terms.length > 4) {
      warnings.push(
        warn(
          "DefinitionCard",
          `has ${section.definition.related_terms.length} related terms; max is 4.`
        )
      );
    }
  }

  if (section.definition_family) {
    if (section.definition_family.definitions.length > 4) {
      warnings.push(
        warn(
          "DefinitionFamily",
          `has ${section.definition_family.definitions.length} definitions; max is 4.`
        )
      );
    }

    if (section.definition_family.family_intro && countWords(section.definition_family.family_intro) > 40) {
      warnings.push(warn("DefinitionFamily", "family_intro exceeds 40 words."));
    }
  }

  if (section.insight_strip) {
    if (section.insight_strip.cells.length < 2) {
      warnings.push(warn("InsightStrip", "requires at least 2 cells."));
    }

    if (section.insight_strip.cells.length > 3) {
      warnings.push(
        warn("InsightStrip", `has ${section.insight_strip.cells.length} cells; max is 3.`)
      );
    }

    section.insight_strip.cells.forEach((cell, index) => {
      if (countWords(cell.label) > 6) {
        warnings.push(warn("InsightStrip", `cell ${index + 1} label exceeds 6 words.`));
      }

      if (cell.note && countWords(cell.note) > 20) {
        warnings.push(warn("InsightStrip", `cell ${index + 1} note exceeds 20 words.`));
      }
    });
  }

  if (section.comparison_grid) {
    validateComparisonGrid(section.comparison_grid, warnings);
  }

  getWorkedExamples(section).forEach((example, index) => {
    validateWorkedExample(
      example,
      getWorkedExamples(section).length > 1
        ? `WorkedExampleCard ${index + 1}`
        : "WorkedExampleCard",
      warnings
    );
  });

  if (section.process) {
    if (section.process.intro && countWords(section.process.intro) > 40) {
      warnings.push(warn("ProcessSteps", "intro exceeds 40 words."));
    }

    if (section.process.steps.length > 8) {
      warnings.push(warn("ProcessSteps", `has ${section.process.steps.length} steps; max is 8.`));
    }

    section.process.steps.forEach((step, index) => {
      if (countWords(step.action) > 15) {
        warnings.push(warn("ProcessSteps", `step ${index + 1} action exceeds 15 words.`));
      }

      if (countWords(step.detail) > 60) {
        warnings.push(warn("ProcessSteps", `step ${index + 1} detail exceeds 60 words.`));
      }

      if (step.input && countWords(step.input) > 10) {
        warnings.push(warn("ProcessSteps", `step ${index + 1} input exceeds 10 words.`));
      }

      if (step.output && countWords(step.output) > 10) {
        warnings.push(warn("ProcessSteps", `step ${index + 1} output exceeds 10 words.`));
      }

      if (step.warning && countWords(step.warning) > 20) {
        warnings.push(warn("ProcessSteps", `step ${index + 1} warning exceeds 20 words.`));
      }
    });
  }

  if (section.practice.problems.length === 0) {
    warnings.push(warn("PracticeStack", "has 0 problems; min is 1."));
  } else if (section.practice.problems.length > 6) {
    warnings.push(
      warn("PracticeStack", `has ${section.practice.problems.length} problems; max is 6.`)
    );
  } else if (section.practice.problems.length > 4) {
    warnings.push(
      warn("PracticeStack", `has ${section.practice.problems.length} problems; consider trimming to 4.`)
    );
  }

  section.practice.problems.forEach((problem, index) => {
    if (countWords(problem.question) > 100) {
      warnings.push(warn("PracticeStack", `problem ${index + 1} question exceeds 100 words.`));
    }

    if (problem.hint && countWords(problem.hint) > 60) {
      warnings.push(warn("PracticeStack", `problem ${index + 1} hint exceeds 60 words.`));
    }

    const hints = normalizePracticeHints(problem);
    if (hints.length > 3) {
      warnings.push(
        warn("PracticeStack", `problem ${index + 1} has ${hints.length} hints; max is 3.`)
      );
    }

    hints.forEach((hint, hintIndex) => {
      if (countWords(hint.text) > 60) {
        warnings.push(
          warn(
            "PracticeStack",
            `problem ${index + 1} hint ${hintIndex + 1} exceeds 60 words.`
          )
        );
      }
    });

    if (problem.answer && countWords(problem.answer) > 40) {
      warnings.push(warn("PracticeStack", `problem ${index + 1} answer exceeds 40 words.`));
    }

    if (problem.context && countWords(problem.context) > 40) {
      warnings.push(warn("PracticeStack", `problem ${index + 1} context exceeds 40 words.`));
    }

    if (problem.writein_lines && problem.writein_lines > 8) {
      warnings.push(
        warn("PracticeStack", `problem ${index + 1} writein_lines exceeds 8.`)
      );
    }

    const solution = normalizePracticeSolution(problem);
    if (solution) {
      if (countWords(solution.approach) > 100) {
        warnings.push(
          warn("PracticeStack", `problem ${index + 1} solution approach exceeds 100 words.`)
        );
      }

      if (solution.answer && countWords(solution.answer) > 60) {
        warnings.push(
          warn("PracticeStack", `problem ${index + 1} solution answer exceeds 60 words.`)
        );
      }

      if (solution.worked && countWords(solution.worked) > 200) {
        warnings.push(
          warn("PracticeStack", `problem ${index + 1} worked solution exceeds 200 words.`)
        );
      }
    }
  });

  if (section.quiz) {
    if (countWords(section.quiz.question) > 60) {
      warnings.push(warn("QuizCheck", "question exceeds 60 words."));
    }

    if (section.quiz.options.length < 3 || section.quiz.options.length > 4) {
      warnings.push(
        warn(
          "QuizCheck",
          `has ${section.quiz.options.length} options; expected between 3 and 4.`
        )
      );
    }

    section.quiz.options.forEach((option, index) => {
      if (countWords(option.text) > 20) {
        warnings.push(warn("QuizCheck", `option ${index + 1} exceeds 20 words.`));
      }

      if (countWords(option.explanation) > 40) {
        warnings.push(
          warn("QuizCheck", `option ${index + 1} explanation exceeds 40 words.`)
        );
      }
    });

    if (countWords(section.quiz.feedback_correct) > 30) {
      warnings.push(warn("QuizCheck", "feedback_correct exceeds 30 words."));
    }

    if (countWords(section.quiz.feedback_incorrect) > 30) {
      warnings.push(warn("QuizCheck", "feedback_incorrect exceeds 30 words."));
    }
  }

  if (section.reflection) {
    if (countWords(section.reflection.prompt) > 40) {
      warnings.push(warn("ReflectionPrompt", "prompt exceeds 40 words."));
    }

    if (section.reflection.space && section.reflection.space > 6) {
      warnings.push(warn("ReflectionPrompt", "space exceeds 6 lines."));
    }
  }

  getPitfallList(section).forEach((pitfall, index) => {
    validatePitfall(
      pitfall,
      getPitfallList(section).length > 1 ? `PitfallAlert ${index + 1}` : "PitfallAlert",
      warnings
    );
  });

  if (section.glossary) {
    if (section.glossary.terms.length > 8) {
      warnings.push(warn("GlossaryRail", `has ${section.glossary.terms.length} terms; max is 8.`));
    } else if (section.glossary.terms.length > 6) {
      warnings.push(
        warn("GlossaryRail", `has ${section.glossary.terms.length} terms; consider trimming to 6.`)
      );
    }

    section.glossary.terms.forEach((term, index) => {
      if (countWords(term.definition) > 30) {
        warnings.push(warn("GlossaryRail", `term ${index + 1} definition exceeds 30 words.`));
      }

      if (term.related && term.related.length > 3) {
        warnings.push(
          warn("GlossaryRail", `term ${index + 1} has ${term.related.length} related terms; max is 3.`)
        );
      }
    });
  }

  if (countWords(section.what_next.body) > 50) {
    warnings.push(warn("WhatNextBridge", "body exceeds 50 words."));
  }

  if (countWords(section.what_next.next) > 15) {
    warnings.push(warn("WhatNextBridge", "next exceeds 15 words."));
  }

  if (section.what_next.preview && countWords(section.what_next.preview) > 30) {
    warnings.push(warn("WhatNextBridge", "preview exceeds 30 words."));
  }

  if (section.what_next.prerequisites && section.what_next.prerequisites.length > 4) {
    warnings.push(
      warn(
        "WhatNextBridge",
        `has ${section.what_next.prerequisites.length} prerequisites; max is 4.`
      )
    );
  }

  section.what_next.prerequisites?.forEach((item, index) => {
    if (countWords(item) > 10) {
      warnings.push(warn("WhatNextBridge", `prerequisite ${index + 1} exceeds 10 words.`));
    }
  });

  if (section.interview) {
    if (countWords(section.interview.prompt) > 35) {
      warnings.push(warn("InterviewAnchor", "prompt exceeds 35 words."));
    }

    if (countWords(section.interview.audience) > 10) {
      warnings.push(warn("InterviewAnchor", "audience exceeds 10 words."));
    }

    if (section.interview.follow_up && countWords(section.interview.follow_up) > 25) {
      warnings.push(warn("InterviewAnchor", "follow_up exceeds 25 words."));
    }
  }

  if (section.diagram) {
    validateDiagram(section.diagram, "DiagramBlock", warnings);
  }

  if (section.diagram_compare) {
    validateDiagramCompare(section.diagram_compare, warnings);
  }

  if (section.diagram_series) {
    validateDiagramSeries(section.diagram_series, warnings);
  }

  if (section.timeline) {
    validateTimeline(section.timeline, warnings);
  }

  if (section.simulation) {
    if (countWords(section.simulation.spec.goal) > 40) {
      warnings.push(warn("SimulationBlock", "goal exceeds 40 words."));
    }

    if (section.simulation.explanation && countWords(section.simulation.explanation) > 60) {
      warnings.push(warn("SimulationBlock", "explanation exceeds 60 words."));
    }

    if (section.simulation.spec.dimensions.height <= 0) {
      warnings.push(warn("SimulationBlock", "dimensions.height must be positive."));
    }

    if (section.simulation.fallback_diagram) {
      validateDiagram(section.simulation.fallback_diagram, "SimulationBlock/FallbackDiagram", warnings);
    }
  }

  return warnings;
}

export function warnIfInvalid(section: SectionContent) {
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "development") {
    return;
  }

  const warnings = validateSection(section);
  if (warnings.length === 0) {
    return;
  }

  console.group("[Lectio] Content validation warnings");
  warnings.forEach((warning) => console.warn(warning));
  console.groupEnd();
}
