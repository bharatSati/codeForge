const topicWiseCF = require("./topicWiseCF");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.AI_API_KEY);

const model = ai.getGenerativeModel({
    model:"gemini-2.5-flash",
})


async function responseGenerator(){
   

}

module.exports = responseGenerator

