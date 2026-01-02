const data = require("./topicWiseCF");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.AI_API_KEY);

const model = ai.getGenerativeModel({
    model:"gemini-2.5-flash",
})



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
        aiResponse = "Error"

    }
    return aiResponse;
}

module.exports = responseGenerator;

