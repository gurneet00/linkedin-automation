const axios = require("axios");
const generatePost = require("./generatePost");

(async () => {
  try {
    const post = await generatePost();

    console.log("Generated Post:\n", post);

    // Send to Make webhook
    await axios.post("https://hook.eu1.make.com/qbpo96hmx09mo2otq8cl5v1mu3x7ljml", {
      post: post
    });

    console.log("Post sent to Make successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  }
})();