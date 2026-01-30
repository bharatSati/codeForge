const data = require("./ratedQuestionsAI");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.AI_API_KEY);

const model = ai.getGenerativeModel({
    model:"gemini-2.5-flash",
})


// ---------- HELPERS ----------
function prettyVerdict(v) {
  if (!v) return "";
  return v
    .toLowerCase()
    .split("_")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------- RATING ANALYSIS ----------
function analyzeRatingExpanded(rating, verdictRow, verdictTypes) {
  let totalSubs = 0;
  let totalPassed = 0;
  let dominantVerdict = null;
  let dominantCount = 0;

  verdictRow.forEach((v, i) => {
    const cnt = v.verdictCount || 0;
    const passed = v.totalPassedTestCases || 0;

    totalSubs += cnt;
    totalPassed += passed;

    if (cnt > dominantCount) {
      dominantCount = cnt;
      dominantVerdict = verdictTypes[i];
    }
  });

  if (totalSubs === 0) {
    return {
      rating,
      analysis: `
Rating ${rating} Overview

No non-accepted submissions were recorded at this rating.
There is no verdict distribution or passed-test information available to summarize.
Problems at this rating normally require structured observations and constraint-aware solutions. Add attempts here to establish a baseline for higher ratings.
      `.trim()
    };
  }

  let lines = [];

  lines.push(`Rating ${rating} Overview\n`);
  lines.push(`1. Total non-accepted submissions: ${totalSubs}`);
  lines.push(`2. Total passed test cases across all attempts: ${totalPassed}\n`);
  lines.push(`Verdict-wise breakdown:`);

  let idx = 1;
  verdictRow.forEach((v, i) => {
    if (!v.verdictCount) return;

    const cnt = v.verdictCount;
    const passed = v.totalPassedTestCases || 0;
    // fixed average calculation
    const avg = cnt > 0 ? (passed / cnt).toFixed(2) : "0.00";

    const name = prettyVerdict(verdictTypes[i]);

    lines.push(`${idx}. ${name} occurred ${cnt} times, contributing ${passed} passed test cases, averaging about ${avg} passed tests per submission.`);
    idx++;
  });

  lines.push(``);
  if (dominantVerdict) {
    const name = prettyVerdict(dominantVerdict);
    lines.push(`Among all verdicts at rating ${rating}, ${name} appears most frequently (${dominantCount} times) and is the primary failure type at this rating.`);
  }

  return {
    rating,
    analysis: lines.join("\n")
  };
}

// ---------- OVERALL SUMMARY ----------
function buildOverallExpanded(data) {
  let totalAll = 0;
  const verdictTotals = {};

  for (let r = 0; r < data.verdictRatingWise.length; r++) {
    const row = data.verdictRatingWise[r] || [];
    row.forEach((v, i) => {
      const cnt = v.verdictCount || 0;
      totalAll += cnt;
      if (!verdictTotals[i]) verdictTotals[i] = 0;
      verdictTotals[i] += cnt;
    });
  }

  const parts = [];
  Object.entries(verdictTotals).forEach(([i, cnt]) => {
    if (cnt > 0) {
      const name = prettyVerdict(data.verdict[i]);
      parts.push(`${name} contributes ${cnt} non-accepted submissions across all ratings.`);
    }
  });

  const user = data.userProfileData.user || "User";

  return `
${user}, your problem-solving data has been compiled. Explore your strengths, trends, and improvement areas.

Across all rated problems, there are ${totalAll} non-accepted submissions recorded.

Overall verdict activity across ratings:

${parts.map((p, i) => `${i + 1}. ${p}`).join("\n")}
  `.trim();
}

// ---------- FINAL ANALYSIS GENERATOR ----------
function generateAnalysisExpanded(data) {
  const ratingAnalysis = [];

  for (let r = 8; r <= 35; r++) {
    const row = data.verdictRatingWise[r] || [];
    ratingAnalysis.push(analyzeRatingExpanded(r * 100, row, data.verdict));
  }

  return [
    buildOverallExpanded(data),
    ratingAnalysis
  ];
}

// ---------- USAGE ----------
// const result = generateAnalysisExpanded(data);
// console.log(JSON.stringify(result, null, 2));

// In React, render like:
// <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>



async function responseGenerator(data){   
    let aiResponse;
    let prompt = `
        Analyze Codeforces rated, non-accepted submissions to identify the user's weaknesses across problem ratings.

PRIMARY GOAL:
Convert verdict and rating-wise failure patterns into conclusions about the user's rating ceiling, comfort zone, and conceptual gaps.
Do NOT repeat raw data unless required to justify a conclusion.

THINKING RULES (CRITICAL):

Always infer the root cause behind failures.
Translate verdict distributions into rating-level skill limitations.
Explain why failures occur at certain ratings, not just how many.
Focus on thinking gaps, scaling issues, and incorrect problem-solving depth.

Prefer explanations like:
"This indicates inability to scale solutions beyond brute force"
"This suggests weak observation-building at mid ratings"
"This points to edge-case blindness in higher-rated problems"
"This implies premature attempts beyond current skill ceiling"

DATA (STRICTLY PROVIDED):
User profile: ${data.userProfileData}

Verdict types (index-aligned):
${data.verdict}

Overall verdict stats (index-aligned with verdict array):
${data.verdictArray}

Rating-wise verdict stats:
${data.verdictRatingWise}

NOTES ABOUT DATA STRUCTURE (IMPORTANT FOR INTERPRETATION):

verdictRatingWise[r] represents problems of rating (r × 100).
Each verdictRatingWise[r][v] contains:

verdictCount
totalPassedTestCases
avgPassedTestCases (to be inferred if zero)
Only rated problems are included.
Only non-AC submissions are analyzed.

GOALS:
Identify the user's effective rating comfort zone.
Detect the rating at which failures spike sharply.
Use verdict frequency + passed test cases to judge depth of understanding.
High avgPassedTestCases ⇒ late-stage issues (edge cases / optimizations).
Low avgPassedTestCases ⇒ rating exceeds conceptual readiness.
Identify ratings where effort is wasted with low return.
Identify ratings close to breakthrough needing refinement.
Recommend optimal rating ranges to practice for fastest improvement.

OUTPUT (STRICT – MUST FOLLOW):
Return ONE array with EXACTLY TWO elements.

[0] Overall assessment (string):

~70 words

Start with the user's handle with his name and starting like - ${data.userProfileData.user}, your problem-solving data has been compiled. Explore your strengths, trends, and improvement areas..

Describe failure patterns across ratings (WA/TLE/MLE/CE).
Identify the user's current skill ceiling rating.
Identify the stretch zone vs danger zone.
Strongest and weakest rating bands.
Clear rating-based improvement strategy.
Use exact counts or percentages from data.
Be blunt, no praise, no fluff.

[1] Rating-wise analysis (array):
each element should be a object...first key should be rating and second key should be analysis
Each index corresponds to rating = index × 100.
from 800 to 3500 u have to make conclusions...in the rating u didnt find submission just report u didnt have submissions

For each included rating (~60 words):

Dominant failure verdict at this rating.
What this verdict pattern implies about thinking mistakes.
Interpretation of passed test cases.
What problems at this rating expect conceptually.
Why the user fails or partially succeeds here.
Concrete, rating-appropriate improvement advice.

FORMAT RULE (ABSOLUTE):

Return ONLY raw JSON.
No markdown, no backticks, no comments, no explanations.
Output must be directly parsable by JSON.parse().

RULES:

Base conclusions strictly on provided data.
Use relative comparison across ratings.
Use competitive programming terminology.
Align expectations with the user’s current rating and maxRating.
Do NOT hallucinate topics, techniques, or unseen data.`;

    try{
        let resultResponse = await model.generateContent(prompt);
        aiResponse = resultResponse.response.candidates[0].content.parts[0].text;
        console.log(aiResponse)
    }
    catch(error){ 
        aiResponse = JSON.stringify( generateAnalysisExpanded(data));

    }
    return aiResponse;
}

module.exports = responseGenerator;

