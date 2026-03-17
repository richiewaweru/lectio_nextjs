import type { SectionContent } from "@/lib/types";

const tangentLineSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" fill="none">
  <rect width="480" height="260" rx="24" fill="#FFFBEB"/>
  <line x1="50" y1="220" x2="430" y2="220" stroke="#64748B" stroke-width="2"/>
  <line x1="80" y1="230" x2="80" y2="30" stroke="#64748B" stroke-width="2"/>
  <path d="M80 200C130 180 170 145 215 110C255 80 312 58 400 48" stroke="#4338CA" stroke-width="8" stroke-linecap="round"/>
  <line x1="150" y1="158" x2="330" y2="102" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
  <circle cx="235" cy="132" r="9" fill="#D97706"/>
  <text x="348" y="92" fill="#D97706" font-size="18" font-family="Arial">tangent</text>
  <text x="360" y="42" fill="#4338CA" font-size="18" font-family="Arial">curve</text>
</svg>`;

const secantToTangentBeforeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" fill="none">
  <rect width="480" height="260" rx="24" fill="#F8FAFC"/>
  <line x1="50" y1="220" x2="430" y2="220" stroke="#64748B" stroke-width="2"/>
  <line x1="80" y1="230" x2="80" y2="30" stroke="#64748B" stroke-width="2"/>
  <path d="M80 200C140 178 195 138 240 100C285 70 338 54 410 48" stroke="#0F766E" stroke-width="8" stroke-linecap="round"/>
  <line x1="145" y1="170" x2="320" y2="92" stroke="#0284C7" stroke-width="5" stroke-linecap="round"/>
  <circle cx="145" cy="170" r="8" fill="#0284C7"/>
  <circle cx="320" cy="92" r="8" fill="#0284C7"/>
</svg>`;

const secantToTangentAfterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 260" fill="none">
  <rect width="480" height="260" rx="24" fill="#FFFBEB"/>
  <line x1="50" y1="220" x2="430" y2="220" stroke="#64748B" stroke-width="2"/>
  <line x1="80" y1="230" x2="80" y2="30" stroke="#64748B" stroke-width="2"/>
  <path d="M80 200C140 178 195 138 240 100C285 70 338 54 410 48" stroke="#0F766E" stroke-width="8" stroke-linecap="round"/>
  <line x1="180" y1="146" x2="330" y2="102" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
  <circle cx="250" cy="126" r="9" fill="#D97706"/>
</svg>`;

const derivativeSeriesStep1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" fill="none">
  <rect width="440" height="220" rx="24" fill="#F8FAFC"/>
  <line x1="48" y1="184" x2="396" y2="184" stroke="#64748B" stroke-width="2"/>
  <path d="M52 176C100 160 146 132 188 98C230 66 278 50 390 42" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
</svg>`;

const derivativeSeriesStep2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" fill="none">
  <rect width="440" height="220" rx="24" fill="#F8FAFC"/>
  <line x1="48" y1="184" x2="396" y2="184" stroke="#64748B" stroke-width="2"/>
  <path d="M52 176C100 160 146 132 188 98C230 66 278 50 390 42" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
  <line x1="132" y1="136" x2="294" y2="92" stroke="#059669" stroke-width="5" stroke-linecap="round"/>
</svg>`;

const derivativeSeriesStep3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" fill="none">
  <rect width="440" height="220" rx="24" fill="#FFFBEB"/>
  <line x1="48" y1="184" x2="396" y2="184" stroke="#64748B" stroke-width="2"/>
  <path d="M52 176C100 160 146 132 188 98C230 66 278 50 390 42" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
  <line x1="176" y1="118" x2="312" y2="86" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
  <circle cx="244" cy="102" r="8" fill="#D97706"/>
</svg>`;

export const calculusSection: SectionContent = {
  section_id: "calc-01",
  template_id: "guided_concept_path_v1",
  title: "Why does calculus exist?",
  subtitle: "Two questions algebra cannot answer",
  subject: "Mathematics",
  grade_band: "secondary",
  header: {
    title: "Why does calculus exist?",
    subtitle: "Two questions algebra cannot answer",
    subject: "Mathematics",
    section_number: "Section 01",
    grade_band: "secondary",
    objective: "Understand why rates of change and accumulation required new mathematical tools."
  },
  hook: {
    headline: "How fast is something moving at this exact instant?",
    body: "Algebra can compare two moments, but it cannot answer what is happening at one frozen instant. That missing question is what pushed calculus into existence.",
    anchor: "the gap between average speed and instantaneous speed",
    image: {
      url: "/images/calculus-hook.svg",
      alt: "A stylized curve and tangent line illustrating calculus as a bridge from motion to exact change."
    }
  },
  explanation: {
    body: "Calculus was invented to answer questions that break ordinary algebra. Average speed over an interval is manageable, but speed at one instant forces the interval toward zero. Area under a curve works the same way: rectangles can approximate it, but exact accumulation demands a limiting process. Calculus answered both problems through derivatives and integrals, and later unified them through the Fundamental Theorem of Calculus.",
    emphasis: ["derivatives", "integrals", "Fundamental Theorem of Calculus"],
    callouts: [
      {
        type: "insight",
        text: "Calculus gives exact answers where algebra only gives approximations over intervals."
      },
      {
        type: "remember",
        text: "Derivatives track instantaneous change while integrals track accumulation."
      }
    ]
  },
  definition: {
    term: "Calculus",
    formal:
      "The mathematical study of continuous change, including differential calculus for rates of change and integral calculus for accumulation and area.",
    plain:
      "A branch of math built to answer how fast something is changing right now and how much it has added up over time.",
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
        content: "h(2) = 100 - 16(4) = 36, so the ball is 36 feet above the ground."
      },
      {
        label: "Check a one-second average",
        content: "h(3) = -44, so the average speed from t = 2 to t = 3 is -80 feet per second."
      },
      {
        label: "Shrink the interval",
        content: "Over 0.1 seconds the average speed is -65.6 ft/s. Over 0.01 seconds it is about -64.16 ft/s."
      },
      {
        label: "Read the limiting value",
        content: "As the interval gets closer to zero, the average speeds approach -64 ft/s."
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
      "Calculus solves problems algebra cannot solve on its own, especially exact local change and exact accumulation.",
    example:
      "At one instant, the usual distance-over-time ratio collapses into division by zero.",
    examples: [
      "Average speed from 2 to 3 seconds is not the same as speed at exactly 2 seconds.",
      "Area under a curve cannot be captured by one rectangle."
    ],
    why: "Students often trust familiar algebraic tools and do not yet see why limits are needed."
  },
  practice: {
    problems: [
      {
        difficulty: "warm",
        question: "A car moves from mile marker 10 to mile marker 35 in one hour. What is its average speed, and why does that not give the speed at 1:30 PM?",
        hint: "Average speed is distance divided by time, but an instant needs more local information.",
        hints: [
          "Start with total distance traveled.",
          "Divide that distance by 1 hour.",
          "Then ask what is missing at exactly 1:30 PM."
        ],
        answer: "25 miles per hour on average; it does not give the exact speed at 1:30 PM.",
        solution:
          "The car traveled 25 miles in 1 hour, so the average speed is 25 mph. But an hourly average hides any changes inside the hour.",
        writein_lines: 4
      },
      {
        difficulty: "medium",
        question: "For h(t) = 40t - 5t^2, compute average speed on [1, 2], [1, 1.5], and [1, 1.1]. What value does the pattern suggest at t = 1?",
        hint: "Use (h(b) - h(a)) / (b - a) and compare the answers.",
        hints: [
          "Compute h(1), h(2), h(1.5), and h(1.1) first.",
          "Use the average-rate formula on each interval.",
          "Compare the three averages to estimate the instantaneous speed."
        ],
        answer: "The averages approach about 30 feet per second.",
        solution:
          "The computed average speeds get closer to 30, suggesting an instantaneous speed of about 30 feet per second at t = 1.",
        writein_lines: 5
      },
      {
        difficulty: "cold",
        question: "Explain why algebra alone cannot give the speed of an object at a single instant. Which operation breaks down?",
        hint: "Ask what happens to the time interval at one exact moment.",
        hints: [
          "Speed starts as distance divided by elapsed time.",
          "At one exact moment the elapsed time shrinks toward zero.",
          "Division by zero is the breaking point."
        ],
        answer: "The time interval becomes zero, so the calculation runs into division by zero.",
        solution:
          "To get speed at one instant, you would need distance traveled over zero elapsed time. Calculus resolves that edge case with limits.",
        writein_lines: 6
      },
      {
        difficulty: "cold",
        question: "A runner covers 90 meters in 10 seconds. Give one piece of information you still need before you can know the runner's speed at exactly 6 seconds.",
        hint: "An overall average does not show how the speed changed during the run.",
        hints: [
          "Think about what total distance and total time do tell you.",
          "Then identify what they hide about the motion near 6 seconds."
        ],
        answer: "You need local information about how the runner was moving near 6 seconds.",
        solution:
          "The total average speed only gives one overall number. To know the speed at 6 seconds, you need nearby data around that moment.",
        writein_lines: 4
      }
    ]
  },
  glossary: {
    terms: [
      {
        term: "Derivative",
        definition: "The instantaneous rate of change of a function at a point.",
        used_in: "Worked example and explanation",
        pronunciation: "duh-RIV-uh-tiv",
        related: ["Limit", "Instantaneous"]
      },
      {
        term: "Integral",
        definition: "The total accumulated change, often seen as area under a curve.",
        used_in: "Explanation block",
        pronunciation: "IN-tuh-gruhl",
        related: ["Calculus", "Area"]
      },
      {
        term: "Limit",
        definition: "The value a quantity approaches as inputs get arbitrarily close to a target.",
        used_in: "Worked example and what next",
        pronunciation: "LIM-it",
        related: ["Derivative", "Calculus"]
      },
      {
        term: "Instantaneous",
        definition: "Happening at one exact moment instead of over an interval.",
        used_in: "Hook and practice",
        pronunciation: "in-stuhn-TAY-nee-uhs",
        related: ["Derivative", "Limit"]
      }
    ]
  },
  what_next: {
    body: "Now that we know why calculus exists, the next step is the tool that makes exact instant-level reasoning possible.",
    next: "Limits",
    preview: "The language that lets change approach a moment without breaking algebra.",
    prerequisites: ["Average rate", "Functions", "Slope intuition"]
  }
};

export const calculusExtendedSection: SectionContent = {
  section_id: "calc-02",
  template_id: "extended_concept_path_v1",
  title: "How derivatives describe change",
  subtitle: "From secant slopes to local behavior",
  subject: "Mathematics",
  grade_band: "advanced",
  header: {
    title: "How derivatives describe change",
    subtitle: "From secant slopes to local behavior",
    subject: "Mathematics",
    section_number: "Section 02",
    grade_band: "advanced",
    objective: "Read a derivative as the local slope a graph is approaching.",
    level_pills: [
      { label: "Warm-up", variant: "warm" },
      { label: "Core idea", variant: "medium" },
      { label: "Stretch", variant: "cold" }
    ]
  },
  hook: {
    headline: "When does an average slope become a real slope?",
    body: "A secant line uses two points, but a derivative seems to ask for a slope at one point. So where does that slope come from if one point alone cannot make a line?",
    anchor: "the moment where a changing secant line becomes a tangent line",
    type: "question",
    question_options: [
      "When the points get closer together",
      "When the graph becomes straight",
      "When the average slope stops changing"
    ],
    image: {
      url: "/images/calculus-hook.svg",
      alt: "A curve with a tangent line, suggesting local slope."
    }
  },
  explanation: {
    body: "A derivative is the limit of average rates of change over smaller and smaller intervals. We begin with a secant line through two nearby points on the graph. As the second point slides toward the first, the secant slope changes. If those slopes approach one stable value, that limiting slope is the derivative at the point. The derivative therefore captures local behavior without pretending a single point can define slope on its own.",
    emphasis: ["limit", "secant slope", "derivative"],
    callouts: [
      {
        type: "insight",
        text: "The derivative is not guessed from one secant line. It is the value the secant slopes settle toward."
      },
      {
        type: "remember",
        text: "Average rate uses two points; derivative asks what happens as those two points collapse together."
      },
      {
        type: "sidenote",
        text: "If the slopes do not settle toward one value, the derivative does not exist there."
      }
    ]
  },
  prerequisites: {
    label: "Bring these with you",
    items: [
      {
        concept: "Slope",
        refresher: "Slope compares vertical change to horizontal change."
      },
      {
        concept: "Functions",
        refresher: "A function assigns one output to each allowed input."
      },
      {
        concept: "Average rate",
        refresher: "Average rate of change is the secant slope across an interval."
      }
    ]
  },
  insight_strip: {
    cells: [
      {
        label: "Secant",
        value: "Average change over an interval",
        note: "Two points required"
      },
      {
        label: "Tangent",
        value: "Local direction at one point",
        note: "Captured by a limit",
        highlight: true
      },
      {
        label: "Derivative",
        value: "The slope value those secants approach",
        note: "Local rate of change"
      }
    ]
  },
  definition: {
    term: "Derivative",
    formal:
      "The limit of the average rate of change as the interval width approaches zero, when that limit exists.",
    plain: "The slope a curve is settling toward at one exact point.",
    notation: "f'(a) = \\lim_{h \\to 0} \\frac{f(a+h)-f(a)}{h}",
    symbol: "f'",
    etymology: "Named because it is derived from nearby average changes.",
    examples: ["\"Find the derivative at x = 2.\"", "\"Estimate the tangent slope.\""],
    related_terms: ["Limit", "Secant line", "Tangent line"]
  },
  definition_family: {
    family_title: "Slope language",
    family_intro: "These terms describe the progression from average change to local change.",
    definitions: [
      {
        term: "Average rate of change",
        formal: "The change in output divided by the change in input across an interval.",
        plain: "The secant slope between two points.",
        notation: "\\frac{f(b)-f(a)}{b-a}",
        symbol: "\\Delta y / \\Delta x"
      },
      {
        term: "Secant line",
        formal: "A line passing through two points on a curve.",
        plain: "A line that measures average slope between two locations."
      },
      {
        term: "Tangent line",
        formal: "A line whose slope matches the curve's local slope at a point.",
        plain: "The line that best matches the curve right where you are looking."
      }
    ]
  },
  worked_example: {
    title: "Estimating the derivative from nearby slopes",
    setup: "Suppose f(x) = x^2 + x. Estimate the derivative at x = 2 by computing nearby secant slopes.",
    method_label: "Method A: Numerical approach",
    steps: [
      {
        label: "Choose nearby x-values",
        content: "Use x = 2.5, 2.1, and 2.01 to compare secant slopes against x = 2.",
        note: "Closer points should better reveal the limiting slope."
      },
      {
        label: "Compute the quotient",
        content: "For each value, evaluate (f(2+h) - f(2)) / h.",
        formula: "\\frac{f(2+h)-f(2)}{h}"
      },
      {
        label: "Track the pattern",
        content: "The slopes move toward 5 as h becomes smaller and smaller.",
        diagram_ref: "figure-derivative-limit"
      }
    ],
    conclusion: "The derivative at x = 2 is 5.",
    answer: "5",
    alternatives: [
      "Compute a symmetric difference quotient with points on both sides of x = 2.",
      "Use the derivative rule first, then substitute x = 2."
    ],
    alternative: {
      title: "Differentiate first",
      setup: "Apply the power rule and then evaluate the result.",
      method_label: "Method B: Symbolic approach",
      steps: [
        {
          label: "Differentiate term by term",
          content: "The derivative of x^2 + x is 2x + 1.",
          formula: "\\frac{d}{dx}(x^2 + x) = 2x + 1"
        },
        {
          label: "Substitute x = 2",
          content: "Evaluating 2x + 1 at x = 2 gives 5."
        }
      ],
      conclusion: "Both the symbolic and numerical paths agree on the same local slope."
    }
  },
  worked_examples: [
    {
      title: "Reading derivative sign from a graph",
      setup: "A function rises before x = 3, flattens near x = 3, and then falls after x = 3.",
      method_label: "Graph interpretation",
      steps: [
        { label: "Observe increasing behavior", content: "Where the function rises, the derivative is positive." },
        { label: "Find the flat point", content: "At the local peak, the tangent line is horizontal, so the derivative is 0." },
        { label: "Observe decreasing behavior", content: "Where the function falls, the derivative is negative." }
      ],
      conclusion: "Derivative sign tracks whether the graph is rising, flat, or falling."
    }
  ],
  process: {
    title: "How to estimate a derivative from a graph",
    intro: "Use this process when a formula is unavailable but the graph is visible.",
    steps: [
      {
        number: 1,
        action: "Choose a point",
        detail: "Mark the location where you want the local rate of change.",
        input: "Graph",
        output: "Target point"
      },
      {
        number: 2,
        action: "Pick nearby points",
        detail: "Choose points close to the target on one or both sides.",
        input: "Target point",
        output: "Intervals",
        warning: "Do not use faraway points."
      },
      {
        number: 3,
        action: "Estimate secant slopes",
        detail: "Compute or visually estimate the average slope on each short interval.",
        input: "Intervals",
        output: "Slope estimates"
      },
      {
        number: 4,
        action: "Look for a stable value",
        detail: "If the secant slopes settle toward one number, that is your derivative estimate.",
        input: "Slope estimates",
        output: "Derivative estimate"
      }
    ]
  },
  diagram: {
    svg_content: tangentLineSvg,
    caption: "As the second point approaches the first, the secant line approaches the tangent line.",
    zoom_label: "Inspect",
    alt_text: "A curve with a secant line turning into a tangent line near a highlighted point.",
    figure_number: 1,
    callouts: [
      {
        id: "curve",
        x: 82,
        y: 20,
        label: "curve",
        explanation: "The function graph gives the changing output values."
      },
      {
        id: "point",
        x: 49,
        y: 51,
        label: "point",
        explanation: "This is the location where the derivative is being estimated."
      },
      {
        id: "tangent",
        x: 72,
        y: 38,
        label: "tangent",
        explanation: "The tangent line captures the local slope right at the point."
      }
    ]
  },
  diagram_compare: {
    before_svg: secantToTangentBeforeSvg,
    after_svg: secantToTangentAfterSvg,
    before_label: "Secant",
    after_label: "Tangent",
    caption: "The comparison slider shows how the secant line becomes a tangent line as the second point closes in.",
    alt_text: "A before-and-after comparison between a secant line and a tangent line on the same curve."
  },
  diagram_series: {
    title: "Secant collapse",
    diagrams: [
      { svg_content: derivativeSeriesStep1, step_label: "Start", caption: "Begin with the curve alone." },
      { svg_content: derivativeSeriesStep2, step_label: "Compare", caption: "Add a secant line between nearby points." },
      { svg_content: derivativeSeriesStep3, step_label: "Limit", caption: "As the second point moves in, the local tangent behavior appears." }
    ]
  },
  pitfall: {
    misconception: "A derivative is just any slope you can draw.",
    correction:
      "A derivative is the slope value approached by secant lines near one point, not a random line that touches the graph.",
    example:
      "Drawing a line through a point on the curve does not guarantee it matches the curve's local direction.",
    severity: "major",
    why: "Students often overgeneralize slope from straight lines and forget the limiting process that defines tangent slope."
  },
  pitfalls: [
    {
      misconception: "A horizontal tangent means the function is always flat nearby.",
      correction:
        "A zero derivative at one point only tells you the local slope there; behavior can still change on either side.",
      severity: "minor",
      examples: [
        "A local maximum has derivative 0 at the top but decreasing behavior immediately after."
      ]
    }
  ],
  quiz: {
    question: "What does the derivative at x = a represent?",
    options: [
      {
        text: "The average slope over the whole graph",
        correct: false,
        explanation: "A derivative is local, not global."
      },
      {
        text: "The limiting slope near one point",
        correct: true,
        explanation: "This captures the tangent behavior at x = a."
      },
      {
        text: "The y-value of the graph at a",
        correct: false,
        explanation: "That is f(a), not f'(a)."
      }
    ],
    feedback_correct: "Yes. The derivative is the limiting local slope.",
    feedback_incorrect: "Not quite. Look again for the option about a limiting local slope.",
    show_explanations: true
  },
  practice: {
    problems: [
      {
        difficulty: "warm",
        question: "A secant slope near x = 3 changes from 4.8 to 4.95 to 4.99 as the interval shrinks. What derivative value is suggested?",
        context: "Numerical limit table",
        hints: [
          { level: 1, text: "Look for the number the slopes are settling toward." },
          { level: 2, text: "All three estimates are moving closer to the same whole number." },
          { level: 3, text: "The derivative appears to be 5." }
        ],
        solution: {
          approach: "Read the pattern in the secant slopes instead of averaging them together.",
          answer: "About 5",
          worked: "Each secant slope is approaching 5 as the interval gets smaller, so the local slope suggested by the limit is 5."
        },
        self_assess: true,
        writein_lines: 3
      },
      {
        difficulty: "medium",
        question: "If a graph is decreasing at x = 1, what sign should its derivative have there and why?",
        context: "Sign interpretation",
        hints: [
          { level: 1, text: "Think about what happens to slope when a graph falls as x increases." },
          { level: 2, text: "A falling graph has negative change in y for positive change in x." }
        ],
        solution: {
          approach: "Relate derivative sign to rising or falling behavior.",
          answer: "Negative",
          worked: "When the graph decreases as x increases, the local slope points downward from left to right. That makes the derivative negative."
        },
        self_assess: true,
        writein_lines: 4
      },
      {
        difficulty: "cold",
        question: "Explain why the slope at one point cannot be computed from just that point alone.",
        context: "Concept explanation",
        hints: [
          { level: 1, text: "Slope compares change in y to change in x." },
          { level: 2, text: "One point alone gives no interval and therefore no visible change." },
          { level: 3, text: "We need nearby points and then a limit." }
        ],
        solution: {
          approach: "Explain why slope starts with change over an interval.",
          answer: "One point gives no interval, so you need nearby points and a limit.",
          worked: "Slope begins by comparing how output changes as input changes. One point alone gives no interval to measure, so a derivative uses nearby secant slopes and a limit."
        },
        self_assess: true,
        writein_lines: 5
      },
      {
        difficulty: "extension",
        question: "Why might a sharp corner fail to have a derivative even if the graph is continuous there?",
        context: "Edge case",
        hints: [
          { level: 1, text: "Check whether slopes from the left and right agree." },
          { level: 2, text: "A derivative needs one stable limiting slope, not two competing values." }
        ],
        solution: {
          approach: "Compare the left-hand and right-hand local slopes.",
          answer: "The left and right slopes can approach different values.",
          worked: "A corner can still be continuous, but if secant slopes from the left and right settle toward different numbers, there is no single derivative."
        },
        self_assess: true,
        writein_lines: 5
      }
    ]
  },
  reflection: {
    prompt: "What changed in your understanding once slope became a limiting process instead of a single secant line?",
    type: "sentence-stem",
    sentence_stem: "I used to think slope at a point meant..., but now I think...",
    space: 4
  },
  glossary: {
    terms: [
      {
        term: "Secant line",
        definition: "A line through two points on a curve.",
        used_in: "Hook, explanation, and process",
        pronunciation: "SEE-kunt",
        related: ["Average rate of change", "Tangent line"]
      },
      {
        term: "Tangent line",
        definition: "A line matching the curve's local slope at one point.",
        used_in: "Definition family and diagrams",
        pronunciation: "TAN-junt",
        related: ["Derivative", "Secant line"]
      },
      {
        term: "Derivative",
        definition: "The limiting local slope of a function.",
        used_in: "Definition and worked example",
        pronunciation: "duh-RIV-uh-tiv",
        related: ["Limit", "Tangent line"]
      },
      {
        term: "Limit",
        definition: "The value a quantity approaches as inputs move toward a target.",
        used_in: "Explanation and practice",
        pronunciation: "LIM-it",
        related: ["Derivative", "Secant line"]
      }
    ]
  },
  simulation: {
    explanation: "Eventually this block will let learners drag the second point and watch secant slopes converge.",
    spec: {
      type: "graph_slider",
      goal: "Discover how nearby secant slopes settle into one local slope.",
      anchor_content: { function_name: "quadratic-growth", target_x: 2 },
      context: {
        learner_level: "advanced",
        template_id: "extended_concept_path_v1",
        color_mode: "light",
        accent_color: "#D97706",
        surface_color: "#FFF7ED",
        font_mono: "ui-monospace"
      },
      dimensions: { width: "100%", height: 280, resizable: false },
      print_translation: "static_diagram"
    },
    fallback_diagram: {
      svg_content: tangentLineSvg,
      caption: "Fallback view of the tangent relationship when interactivity is unavailable.",
      alt_text: "A static fallback diagram of a tangent line touching a curve."
    }
  },
  interview: {
    prompt: "Explain to a classmate why a derivative needs nearby secant slopes before it can describe one point.",
    audience: "a classmate",
    follow_up: "How would you explain the same idea without using the word limit?"
  },
  what_next: {
    body: "With the local meaning of derivative in place, the next move is learning the rules that let us compute derivatives efficiently.",
    next: "Derivative rules",
    preview: "Power, sum, and product rules turn local slope into something you can calculate fast.",
    prerequisites: ["Slope", "Limits", "Function notation"]
  }
};
