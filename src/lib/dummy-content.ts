import type { SectionContent } from "@/lib/types";

export const calculusSection: SectionContent = {
  section_id: "calc-01",
  title: "Why does calculus exist?",
  subtitle: "Two questions algebra cannot answer",
  subject: "Mathematics",
  grade_band: "secondary",
  template_id: "guided_concept_path_v1",
  hook: {
    headline: "How fast is something moving at this exact instant?",
    body: "You can measure where a ball is at two moments and calculate how far it moved. But what if you need its speed at one precise instant, not over a span, but at one frozen moment? Algebra gives you averages. It does not give you an instant.",
    anchor: "the gap between average speed and instantaneous speed",
    image: {
      url: "/images/calculus-hook.svg",
      alt: "A stylized curve and tangent line illustrating calculus as a bridge from motion to exact change."
    }
  },
  explanation: {
    body: "This question pushed mathematicians to invent an entirely new branch of mathematics. Algebra can find averages, like how fast something moved over ten seconds, or how much water flowed in an hour. But it breaks at the boundary: the speed at one instant, or the exact area under a curve. Calculus was created to cross that boundary. It introduced two tools: derivatives, which measure instantaneous rates of change, and integrals, which measure total accumulation. Those tools are deeply connected through the Fundamental Theorem of Calculus.",
    emphasis: [
      "derivatives",
      "integrals",
      "Fundamental Theorem of Calculus"
    ],
    callouts: [
      {
        type: "insight",
        text: "Calculus matters because it gives exact answers at the edge where algebra only gives averages."
      },
      {
        type: "remember",
        text: "Derivatives track change at a moment, while integrals track accumulation over an interval."
      }
    ]
  },
  definition: {
    term: "Calculus",
    formal:
      "The mathematical study of continuous change, including differential calculus for rates of change and integral calculus for accumulation and area.",
    plain:
      "A branch of math built to answer two questions: how fast something is changing right now, and how much it has added up over time.",
    etymology: "From Latin calculus, a small stone used for counting.",
    examples: [
      "\"Find the speed at exactly 2 seconds.\"",
      "\"Measure the exact area under the graph.\""
    ],
    related_terms: ["Derivative", "Integral", "Limit"]
  },
  worked_example: {
    title: "Approximating instantaneous speed from a height function",
    setup: "A ball dropped from a 100-foot building has height h(t) = 100 - 16t^2. What is its speed at exactly t = 2 seconds?",
    steps: [
      {
        label: "Find the position at t = 2",
        content:
          "h(2) = 100 - 16(4) = 36, so the ball is 36 feet above the ground at t = 2."
      },
      {
        label: "Check a one-second average",
        content:
          "h(3) = -44, so the average speed from t = 2 to t = 3 is (-44 - 36) / 1 = -80 feet per second."
      },
      {
        label: "Shrink the interval",
        content:
          "Over 0.1 seconds the average speed is -65.6 ft/s. Over 0.01 seconds it is about -64.16 ft/s."
      },
      {
        label: "Read the limiting value",
        content:
          "As the interval gets closer to zero, the average speeds approach -64 ft/s. That limiting value is the derivative."
      }
    ],
    conclusion: "The instantaneous speed at t = 2 is -64 feet per second.",
    answer: "-64 feet per second",
    alternatives: [
      "Differentiate h(t) first, then evaluate h'(2).",
      "Estimate with even smaller average-speed intervals to see the same limit."
    ]
  },
  pitfall: {
    misconception: "Calculus is just faster algebra",
    correction:
      "Calculus solves problems algebra cannot solve on its own, including exact rates of change at a single instant and exact accumulation under a curve.",
    example:
      "If you try to compute speed at one instant with algebra alone, the time interval collapses to zero and the usual division breaks down.",
    examples: [
      "Average speed from 2 to 3 seconds is not the same as speed at exactly 2 seconds.",
      "Area of a curved region cannot be captured by one algebraic rectangle."
    ],
    why: "Students often trust familiar algebraic tools and do not yet see why a new idea like limits is necessary."
  },
  practice: {
    problems: [
      {
        difficulty: "warm",
        question:
          "A car is at mile marker 10 at 1 PM and mile marker 35 at 2 PM. What is its average speed during that hour, and why does that not tell you the speed at 1:30 PM?",
        hint: "Average speed is distance divided by time. Then compare one whole hour with one exact instant.",
        hints: [
          "Start with distance traveled between 1 PM and 2 PM.",
          "Divide that distance by 1 hour.",
          "Then ask what information is missing at exactly 1:30 PM."
        ],
        answer: "25 miles per hour on average; it still does not give the exact speed at 1:30 PM.",
        solution:
          "The car traveled 25 miles in 1 hour, so the average speed is 25 mph. But an average over an hour hides how the speed may have changed inside that hour, so it cannot tell you the exact speed at 1:30 PM.",
        writein_lines: 4
      },
      {
        difficulty: "medium",
        question:
          "The height of a ball is h(t) = 40t - 5t^2. Compute the average speed on [1, 2], [1, 1.5], and [1, 1.1]. What value does the pattern suggest at t = 1?",
        hint: "Use (h(b) - h(a)) / (b - a) and watch what happens as b gets closer to 1.",
        hints: [
          "Compute h(1), h(2), h(1.5), and h(1.1) first.",
          "Use the average-rate formula separately on each interval.",
          "Compare the three averages to estimate the instantaneous speed."
        ],
        answer: "The averages approach about 30 feet per second.",
        solution:
          "h(1) = 35, h(2) = 60, h(1.5) = 48.75, and h(1.1) = 37.95. The average speeds are 25, 27.5, and 29.5 feet per second, so the pattern suggests an instantaneous speed of about 30 feet per second at t = 1.",
        writein_lines: 5
      },
      {
        difficulty: "cold",
        question:
          "Explain, in words, why algebra alone cannot give the speed of an object at a single instant. Which operation breaks down?",
        hint: "Speed is distance over time. Ask what the time interval becomes at one exact moment.",
        hints: [
          "Start from the idea that speed is distance divided by elapsed time.",
          "Now imagine the elapsed time shrinking all the way to zero.",
          "Explain why dividing by zero breaks the algebraic approach."
        ],
        answer: "The time interval becomes zero, so the calculation runs into division by zero.",
        solution:
          "To get speed at one instant, you would need the distance traveled over zero elapsed time. That turns the usual distance-over-time expression into division by zero, which algebra alone does not allow. Calculus resolves that edge case with limits.",
        writein_lines: 6
      },
      {
        difficulty: "cold",
        question:
          "A runner covers 90 meters in 10 seconds. Give one piece of information you still need before you can know the runner's speed at exactly 6 seconds.",
        hint: "An overall average does not show how the speed changed during the run.",
        hints: [
          "Think about what the total distance and total time do tell you.",
          "Then identify what they hide about the runner's motion inside the interval."
        ],
        answer: "You need information about how the runner's motion changed near 6 seconds.",
        solution:
          "The total average speed only combines the whole run into one number. To know the speed at exactly 6 seconds, you need local information about what the runner was doing near that time, not just the 10-second total.",
        writein_lines: 4
      }
    ]
  },
  glossary: {
    terms: [
      {
        term: "Derivative",
        definition:
          "The instantaneous rate of change of a function at a specific point.",
        used_in: "Worked example and explanation",
        related: ["Limit", "Instantaneous"]
      },
      {
        term: "Integral",
        definition:
          "The total accumulated change, often interpreted as area under a curve.",
        used_in: "Explanation block",
        related: ["Calculus", "Area"]
      },
      {
        term: "Limit",
        definition:
          "The value a quantity approaches as the inputs get arbitrarily close to a target.",
        used_in: "Worked example and what next",
        related: ["Derivative", "Calculus"]
      },
      {
        term: "Instantaneous",
        definition:
          "Happening at one exact moment instead of over an interval.",
        used_in: "Hook and practice",
        related: ["Derivative", "Limit"]
      }
    ]
  },
  what_next: {
    body: "Now that we know why calculus exists, the next step is understanding the tool that makes exact instant-level reasoning possible.",
    next: "Limits",
    prerequisites: ["Average rate", "Functions", "Slope intuition"]
  }
};
