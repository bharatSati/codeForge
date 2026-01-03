const data = require("./ratedQuestionsAI");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.AI_API_KEY);

const model = ai.getGenerativeModel({
    model:"gemini-2.5-flash",
})



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

~100 words

Start with the user's handle.

Describe failure patterns across ratings (WA/TLE/MLE/CE).

Identify the user's current skill ceiling rating.

Identify the stretch zone vs danger zone.

Strongest and weakest rating bands.

Clear rating-based improvement strategy.

Use exact counts or percentages from data.

Be blunt, no praise, no fluff.

[1] Rating-wise analysis (array):
Each index corresponds to rating = index × 100.
ONLY include ratings where verdictCount > 0.

For each included rating (~100 words):

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
        aiResponse = resultResponse.response;
        console.log(aiResponse)
    }
    catch(error){ 
        aiResponse = "Error"

    }
    return aiResponse;
}

module.exports = responseGenerator;

