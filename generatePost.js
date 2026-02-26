const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generatePost() {
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
    - bold the keywords and first line
  `;

  const result = await model.generateContent(prompt);

  // ✅ Extract text correctly
  const rawText = result.response.text();

  // ✅ Format for LinkedIn
  const formatted = formatForLinkedIn(rawText);

  return formatted;
}

function toBoldUnicode(str) {
  const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bold   = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';

  return str.split('').map(c => {
    const i = normal.indexOf(c);
    return i >= 0 ? bold[i] : c;
  }).join('');
}

function formatForLinkedIn(text) {
  // Convert **bold**
  text = text.replace(/\*\*(.*?)\*\*/g, (_, match) => {
    return toBoldUnicode(match);
  });

  // Remove *italic*
  text = text.replace(/\*(.*?)\*/g, '$1');

  return text;
}

module.exports = generatePost;