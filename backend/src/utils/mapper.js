function mapAnswers(answers) {
  return [
    answers.genre === "action" ? 1 : 0,
    answers.style === "hardcore" ? 1 : 0,
    answers.mood === "competitive" ? 1 : 0,
    answers.time === "long" ? 1 : 0,
  ];
}

module.exports = { mapAnswers };
