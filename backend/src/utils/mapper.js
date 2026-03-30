const { keywords, synonymMap } = require("./nlpConfig");

// normalize
const normalize = (text) => text.toLowerCase().trim();

// scoring function
const scoreCategory = (text, values, synonymMap) => {
  const scores = {};

  values.forEach((key) => {
    scores[key] = 0;

    // direct match (strong)
    if (text.includes(key)) scores[key] += 2;

    // synonym match (medium)
    if (synonymMap[key]) {
      synonymMap[key].forEach((syn) => {
        if (text.includes(syn)) scores[key] += 1;
      });
    }
  });

  return scores;
};

// pick best match
const getBestMatch = (scores) => {
  let best = null;
  let max = 0;

  for (const key in scores) {
    if (scores[key] > max) {
      max = scores[key];
      best = key;
    }
  }

  return best;
};

function extractKeywords(input) {
  if (!input) return {};

  const text = normalize(input);
  const result = {};

  for (const [category, values] of Object.entries(keywords)) {
    const scores = scoreCategory(text, values, synonymMap);
    const bestMatch = getBestMatch(scores);

    if (bestMatch) {
      result[category] = bestMatch;
    }
  }

  return result;
}

// Keep your existing mapAnswers function below
function mapAnswers(answers) {
  return [
    answers.genre ? 1 : 0,
    answers.style ? 1 : 0,
    answers.mood ? 1 : 0,
    answers.time ? 1 : 0,
  ];
}

module.exports = { mapAnswers, extractKeywords };
