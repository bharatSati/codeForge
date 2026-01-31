const data = require("./topicWiseCF");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.AI_API_KEY);

const model = ai.getGenerativeModel({
    model:"gemini-2.5-flash",
})


function prettyVerdict(v) {
  if (!v) return "";
  return v
    .toLowerCase()
    .split("_")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function analyzeTopic(topic, verdictRow, verdictTypes, globalAvg) {
  let totalSubs = 0;
  let weightedAvgPassed = 0;
  let dominantVerdict = null;
  let dominantCount = 0;

  verdictRow.forEach((v, i) => {
    const cnt = v.verdictCount || 0;
    const avg = v.avgPassedTestCases || 0;

    totalSubs += cnt;
    weightedAvgPassed += cnt * avg;

    if (cnt > dominantCount) {
      dominantCount = cnt;
      dominantVerdict = verdictTypes[i];
    }
  });

  if (totalSubs === 0) {
    return [
      `Topic: ${topic}`,
      `• No non-accepted submissions are recorded.`,
      `• Insufficient data to infer conceptual or implementation weaknesses.`,
      `• More attempts are required to evaluate approach quality and consistency.`
    ].join("\n");
  }

  const topicAvg = weightedAvgPassed / totalSubs;
  const verdictName = prettyVerdict(dominantVerdict);

  let diagnosis;
  if (topicAvg < globalAvg * 0.7) {
    diagnosis =
      "Failures occur much earlier than your overall average, indicating incorrect approach selection, weak fundamentals, or misunderstanding of constraints.";
  } else if (topicAvg > globalAvg * 1.2) {
    diagnosis =
      "Most solutions reach late test cases, pointing to edge-case oversights, boundary condition failures, or missed optimizations.";
  } else {
    diagnosis =
      "Failures occur at an average stage, suggesting unstable logic and inconsistent implementation rather than a single clear gap.";
  }

  return [
    `Topic: ${topic}`,
    `1. Total non-accepted submissions: ${totalSubs}`,
    `2. Dominant verdict: ${verdictName} (${dominantCount} cases, ${(dominantCount / totalSubs * 100).toFixed(1)}%)`,
    `3. Average passed test cases per attempt: ${topicAvg.toFixed(2)} (global average: ${globalAvg.toFixed(2)})`,
    `4. Interpretation: ${diagnosis}`,
    `5. Improvement focus: Strengthen dry-run discipline, explicitly list edge cases before coding, and validate time/space complexity against worst-case constraints.`
  ].join("\n");
}

function buildOverallAssessment(data) {
  let totalSubs = 0;
  let weightedAvg = 0;
  let verdictTotals = {};

  data.verdictArray.forEach((v, i) => {
    const cnt = v.verdictCount || 0;
    const avg = v.avgPassedTestCases || 0;

    totalSubs += cnt;
    weightedAvg += cnt * avg;
    verdictTotals[data.verdict[i]] = cnt;
  });

  const globalAvg = weightedAvg / totalSubs;
  const [domVerdict, domCount] =
    Object.entries(verdictTotals).sort((a, b) => b[1] - a[1])[0] || [];

  const user = data.userProfileData.user || "User";

  const assessment = [
    `${user} — Overall Assessment`,
    `1. Total non-accepted submissions: ${totalSubs}`,
    `2. Dominant failure type: ${prettyVerdict(domVerdict)} (${domCount} cases, ${(domCount / totalSubs * 100).toFixed(1)}%)`,
    `3. Average passed test cases per submission: ${globalAvg.toFixed(2)}`,
    `4. Failure stage analysis: Most failures occur after partial progress, indicating that ideas often work initially but break on edge cases or constraints.`,
    `5. Cross-topic consistency: Performance varies significantly across topics, showing uneven conceptual depth rather than a uniform skill level.`,
    `6. Coding habit inference: There is reliance on assumption-driven logic with insufficient validation against extreme cases.`,
    `7. Strategy recommendation: Prioritize approach verification before coding, simulate edge cases manually, and reject solutions that barely meet constraints.`
  ].join("\n");

  return { assessment, globalAvg };
}

function generateAnalysisExpanded(data) {
  const { assessment, globalAvg } = buildOverallAssessment(data);

  const topicAnalysis = data.topicArray.map((topic, i) =>
    analyzeTopic(
      topic,
      data.verdictTopicWise[i] || [],
      data.verdict,
      globalAvg
    )
  );

  return [
    assessment,
    topicAnalysis
  ];
}




async function responseGenerator(data){   
    let aiResponse;
    let prompt = `
        Analyze Codeforces non-accepted submissions to identify the user's shortcomings.

        PRIMARY GOAL:
        Turn verdict patterns into conclusions about the user's thinking and coding habits.
        Do NOT repeat raw data unless needed to support a conclusion.

        THINKING RULES (IMPORTANT):
        - Always infer the *root cause* behind failures.
        - Convert verdict patterns into *coding mistakes*.
        - Explain *why* the user is failing, not just *how often*.
        - Focus on conceptual gaps, bad habits, and incorrect approaches.
        - Prefer explanations like:
            "This indicates missing base cases"
            "This suggests brute-force thinking"
            "This points to weak edge-case handling"
            "This implies poor complexity awareness"

        DATA (non-AC only):
        User: ${data.userProfileData}
        Verdicts: ${data.verdict}
        Verdict stats: ${data.verdictArray}
        Topics (order matters): ${data.topicArray}
        Topic-wise verdict stats (index-aligned): ${data.verdictTopicWise}

        GOALS:
        - Identify overall weaknesses and CP profile.
        - Use verdict frequency + avgPassedTestCases.
        - High avgPassedTestCases ⇒ late-stage issues (edge cases/optimization).
        - Low avgPassedTestCases ⇒ conceptual or approach issues.
        - Find high-effort, low-gain topics.
        - Find near-success topics needing refinement.
        - Recommend focus areas with max improvement.

        OUTPUT (STRICT):
        Return ONE array with TWO elements.

        [0] Overall assessment (string):
        - 100 words approx
        - Start with user's handle.
        - Failure vs success patterns (WA/TLE/MLE etc.).
        - Consistency across topics.
        - Strongest & weakest areas.
        - General improvement strategy.
        - Use exact numbers/percentages from data.
        - Be direct, no praise.

        [1] Topic-wise analysis (array):
        Each index maps to topicArray.
        For each topic:- 100wordsapprox
        - Dominant issue.
        - Verdict pattern explanation.
        - avgPassedTestCases interpretation.
        - Specific improvement advice.


        FORMAT RULE (CRITICAL):
        - Return ONLY raw JSON.
        - Do NOT wrap the output in markdown, code blocks, or backticks.
        - Do NOT include explanations, comments, or extra text.
        - The response must be directly parsable using JSON.parse().

        RULES:
        - Base analysis strictly on data.
        - Use percentages/ratios.
        - Compare topics relative to each other.
        - Use CP-specific terminology.
        - Match expectations to user's rating/rank.
`;

    try{
        let resultResponse = await model.generateContent(prompt);
        aiResponse = resultResponse.response;
        console.log(aiResponse)
    }
    catch(error){ 
         aiResponse = JSON.stringify( generateAnalysisExpanded(data));


    }
    return aiResponse;
}

module.exports = responseGenerator;

