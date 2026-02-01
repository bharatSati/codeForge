const data = require("./topicWiseCF");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.AI_API_KEY);

const model = ai.getGenerativeModel({
    model:"gemini-2.5-flash",
})


let topicArray = ["implementation","math","brute force","sortings","binary search","two pointers","strings","bit manipulation","greedy","data structures","number theory","combinatorics","graphs","trees","dp","constructive algorithms","game theory","probabilities","geometry","interactive"];
function generateTopicConclusions(data) {
  const verdicts = data.verdict;
  const topics = data.topicArray;
  const topicWise = data.verdictTopicWise;
  const user = data.userProfileData.user;

  let totalSubs = 0;
  const topicAnalysis = [];
  const stats = [];

  // -------- COLLECT STATS PER TOPIC --------
  for (let t = 0; t < topics.length; t++) {
    const row = topicWise[t] || [];
    let subs = 0, passed = 0;
    let domVerdict = null, domCnt = 0;

    row.forEach((v, i) => {
      const cnt = v.verdictCount;
      const p = v.totalPassedTestCases;
      subs += cnt;
      passed += p;
      if (cnt > domCnt) {
        domCnt = cnt;
        domVerdict = verdicts[i];
      }
    });

    totalSubs += subs;

    stats.push({
      topic: topics[t],
      subs,
      avg: subs ? passed / subs : 0,
      domVerdict
    });
  }

  // -------- IDENTIFY STRONG / WEAK TOPICS --------
  let strong = [];
  let weak = [];

  for (const s of stats) {
    if (!s.subs) continue;
    if (s.avg >= 6) strong.push(s.topic);
    if (s.avg <= 2) weak.push(s.topic);
  }

  // -------- OVERALL ANALYSIS --------
  const overall =
`${user}, here is a structured breakdown of your performance across different topics, based strictly on submission behavior and test case progression.

• A total of ${totalSubs} non-accepted submissions were analyzed, giving a broad view of how your solutions evolve across topics.
• Topics like ${strong.slice(0, 3).join(", ") || "a limited set"} stand out as relative strengths, where higher average passed test cases indicate that your core logic is usually correct.
• On the other hand, ${weak.slice(0, 3).join(", ") || "some topics"} repeatedly fail early, suggesting gaps in problem modeling or approach selection.
• This contrast points to uneven conceptual confidence rather than a lack of effort.
• Targeting weaker topics—starting with lower difficulty problems—will likely yield the fastest overall improvement.`;


  // -------- PER-TOPIC ANALYSIS --------
  stats.forEach(s => {
    if (!s.subs) {
      topicAnalysis.push({
        topic: s.topic,
        analysis:
          "• No non-accepted submissions were recorded for this topic.\n" +
          "• This usually indicates either no attempts or deliberate avoidance.\n" +
          "• As a result, there is insufficient data to draw reliable conclusions here."
      });
      return;
    }

    let implication = "";
    let advice = "";

    if (s.avg >= 6) {
      implication =
        "solutions generally reach the later test cases, meaning the main idea is correct but tends to fail on edge cases, limits, or implementation details.";
      advice =
        "Shift focus toward stress testing, corner cases, and tighter constraint handling in this topic.";
    } else if (s.avg >= 3) {
      implication =
        "solutions show partial correctness, often driven by the right intuition but missing a key observation or transition.";
      advice =
        "Slow down before coding—aim to fully reconstruct the editorial logic in your head.";
    } else {
      implication =
        "most solutions fail very early, which points to weak conceptual grounding or incorrect approach selection.";
      advice =
        "Revisit fundamentals and solve simpler, well-known patterns before attempting harder problems here.";
    }

    topicAnalysis.push({
      topic: s.topic,
      analysis:
        `• Dominant verdict type: ${s.domVerdict}, indicating the most frequent failure pattern.\n` +
        `• Average passed test cases per submission: ${s.avg.toFixed(2)}, reflecting how far solutions typically progress.\n` +
        `• Interpretation: Your submissions in this topic tend to fail due to ${implication}\n` +
        `• This topic rewards strong pattern recognition, clean modeling, and careful handling of constraints.\n` +
        `• Actionable advice: ${advice}`
    });
  });

  return [
    overall,
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
         aiResponse = JSON.stringify( generateTopicConclusions(data));


    }
    return aiResponse;
}

module.exports = responseGenerator;

