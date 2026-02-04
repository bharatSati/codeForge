const data = require("./topicWiseCF");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.AI_API_KEY);

const model = ai.getGenerativeModel({
    model:"gemini-2.5-flash",
})


let topicArray = ["implementation","math","brute force","sortings","binary search","two pointers","strings","bit manipulation","greedy","data structures","number theory","combinatorics","graphs","trees","dp","constructive algorithms","game theory","probabilities","geometry","interactive"];

// this analysis is made using ai using the data collected
function generateTopicConclusions(data) {
  const verdicts = data.verdict;
  const topics = data.topicArray;
  const topicWise = data.verdictTopicWise;
  const user = data.userProfileData.user;

  let totalSubs = 0;
  const topicAnalysis = [];
  const stats = [];

  
  for (let t = 0; t < topics.length; t++) {
    const row = topicWise[t] || [];
    let subs = 0;
    let passed = 0;
    let domVerdict = null;
    let domCnt = 0;

    row.forEach((v, i) => {
      subs += v.verdictCount;
      passed += v.totalPassedTestCases;

      if (v.verdictCount > domCnt) {
        domCnt = v.verdictCount;
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

  
  const strong = [];
  const weak = [];

  for (const s of stats) {
    if (!s.subs) continue;
    if (s.avg >= 6) strong.push(s.topic);
    if (s.avg <= 2) weak.push(s.topic);
  }

 
  const overall =
`${user}, here is a structured evaluation of your topic-wise problem-solving behavior based on non-accepted submissions.

1. A total of ${totalSubs} non-accepted submissions were analyzed across all problem topics.
2. Topics such as ${strong.slice(0, 3).join(", ") || "a limited set"} demonstrate relative strength, where solutions often reach later test cases.
3. Topics like ${weak.slice(0, 3).join(", ") || "certain areas"} show early failures, indicating conceptual or modeling gaps.
4. This uneven distribution suggests topic-specific weaknesses rather than overall inconsistency.
5. Prioritizing weaker topics at lower difficulty levels is likely to produce the fastest improvement.`;


  stats.forEach(s => {
    if (!s.subs) {
      topicAnalysis.push({
        topic: s.topic,
        analysis:
`1. No non-accepted submissions were recorded for this topic.
2. This indicates either no attempts or complete avoidance.
3. As a result, there is insufficient data to draw conclusions here.`
      });
      return;
    }

    let implication, advice;

    if (s.avg >= 6) {
      implication =
        "solutions usually fail late, meaning the core logic is correct but breaks on edge cases or constraints.";
      advice =
        "Improve by focusing on boundary conditions, stress testing, and cleaner implementations.";
    } else if (s.avg >= 3) {
      implication =
        "solutions show partial correctness, driven by the right idea but missing a critical observation.";
      advice =
        "Spend more time validating the complete approach before implementation.";
    } else {
      implication =
        "solutions fail very early, indicating weak fundamentals or incorrect approach selection.";
      advice =
        "Rebuild this topic from basic patterns and easier problems.";
    }

    topicAnalysis.push({
      topic: s.topic,
      analysis:
`1. The dominant verdict in this topic is ${s.domVerdict}, representing the most common failure type.
2. The average number of passed test cases per submission is ${s.avg.toFixed(2)}.
3. This indicates that submissions typically fail because ${implication}
4. Strong performance in this topic requires solid modeling, pattern recognition, and constraint awareness.
5. Recommended focus: ${advice}`
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

