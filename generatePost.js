const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialized as 'genAI'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generatePost() {
  // FIXED: Changed 'genai' to 'genAI' to match the variable above
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });  
  
  const prompt = `
    Write a high-engagement LinkedIn post about AI automation for founders.

    Rules:
    - Strong hook in first line
    - Short lines
    - Add spacing
    - Add storytelling
    - End with a question
    - Add 5 relevant hashtags
    - First line must be bold using Unicode characters
    - Do not use markdown formatting
    - Do not wrap text in quotes
    - Output plain text only
  `;

  const result = await model.generateContent(prompt);
  // Optional cleanup: you don't need 'await' for result.response 
  const response = result.response;
  return response.text();
}

module.exports = generatePost;