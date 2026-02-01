const data = require("./ratedQuestionsAI");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.AI_API_KEY);

const model = ai.getGenerativeModel({
    model:"gemini-2.5-flash",
})


function generateRatingConclusions(data) {
  const verdicts = data.verdict;
  const ratingWise = data.verdictRatingWise;
  const user = data.userProfileData.user;
  const maxRating = data.userProfileData.maxRating;

  let totalSubs = 0;
  const ratingAnalysis = [];
  const stats = [];

  // Collect stats
  for (let r = 8; r <= 35; r++) {
    const row = ratingWise[r] || [];
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
      rating: r * 100,
      subs,
      avg: subs ? passed / subs : 0,
      domVerdict
    });
  }

  // Identify zones
  let comfort = 0;
  let breakdown = 0;

  for (const s of stats) {
    if (!s.subs) continue;
    if (s.avg >= 6) comfort = s.rating;
    if (!breakdown && s.avg <= 2) breakdown = s.rating;
  }

  // Overall (≤ 80 words)
  const overall = `${user}, your problem-solving data has been compiled. Explore your strengths, trends, and improvement areas.

• ${totalSubs} non-accepted rated submissions analyzed.
• Stable performance up to ${comfort || "lower ratings"}, where higher passed test averages indicate near-correct solutions.
• Sharp efficiency drop around ${breakdown || "mid ratings"}, showing early-test failures.
• This marks your current skill ceiling near ${comfort || maxRating}.
• Attempts beyond this range yield low return.
• Best improvement lies just below the ceiling by converting partial passes into ACs.`;

  // Per-rating analysis (≤ 80 words each)
  stats.forEach(s => {
    if (!s.subs) {
      ratingAnalysis.push({
        rating: s.rating,
        analysis:
          "• No non-accepted submissions recorded.\n" +
          "• Either no attempts or full avoidance.\n" +
          "• Insufficient data to infer weaknesses."
      });
      return;
    }

    let implication = "";
    if (s.avg >= 6)
      implication = "late-stage failure indicating edge-case or optimization issues.";
    else if (s.avg >= 3)
      implication = "partial solution depth with missing transitions or constraints.";
    else
      implication = "early failure indicating incorrect modeling or brute-force thinking.";

    ratingAnalysis.push({
      rating: s.rating,
      analysis:
        `• Dominant verdict: ${s.domVerdict}.\n` +
        `• Average passed tests per submission: ${s.avg.toFixed(2)}.\n` +
        `• This reflects ${implication}\n` +
        `• Problems here demand stronger observations and complexity control.\n` +
        `• Improve by re-solving similar-rated problems until full AC without relying on partial passes.`
    });
  });

  return [
    overall,
    ratingAnalysis
  ];
}


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
        aiResponse = JSON.stringify( generateRatingConclusions(data));

    }
    return aiResponse;
}

module.exports = responseGenerator;

