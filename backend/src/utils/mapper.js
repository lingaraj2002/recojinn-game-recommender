const { keywords } = require("./keywords");

// Smart keyword extraction function
function extractKeywords(input) {
  if (!input) return {};
  const words = input.toLowerCase().split(/\s+/);
  const found = {};

  words.forEach((word) => {
    for (const [key, values] of Object.entries(keywords)) {
      if (values.includes(word)) {
        found[key] = word;
      }
    }
  });
  return found;
}

// Keep your existing mapAnswers function below
function mapAnswers(answers) {
  return [
    answers.genre === "action" ? 1 : 0,
    answers.style === "hardcore" ? 1 : 0,
    answers.mood === "competitive" ? 1 : 0,
    answers.time === "long" ? 1 : 0,
  ];
}

module.exports = { mapAnswers, extractKeywords };
