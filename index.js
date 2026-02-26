const generatePost = require("./generatePost");

(async () => {
  const post = await generatePost();
  console.log(post);
})();

