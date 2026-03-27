const questions = [
  {
    key: "genre",
    text: "Choose a genre:\n(action / adventure / racing / puzzle / sports)",
    options: ["action", "adventure", "racing", "puzzle", "sports"],
  },
  {
    key: "style",
    text: "Casual or hardcore?",
    options: ["casual", "hardcore"],
  },
  {
    key: "mood",
    text: "Your mood?\n(relax / competitive / story / explore)",
    options: ["relax", "competitive", "story", "explore"],
  },
  {
    key: "time",
    text: "Play time?\n(short / long)",
    options: ["short", "long"],
  },
];

module.exports = { questions };
