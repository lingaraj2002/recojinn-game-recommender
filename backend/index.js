require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const brain = require("brain.js");

const { questions } = require("./src/utils/questions");
const { mapAnswers } = require("./src/utils/mapper");
const { getGames } = require("./src/services/gameService");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ML Model
const net = new brain.NeuralNetwork();
net.train([
  { input: [1, 1, 1, 1], output: [1] },
  { input: [0, 0, 0, 0], output: [0] },
]);

// Chat API
app.post("/chat", async (req, res) => {
  const { message, step, answers } = req.body;

  let currentStep = step;
  let data = { ...answers };

  // STEP 0 → Welcome
  if (step === 0) {
    return res.json({
      reply: "🎮 Welcome! Choose your game style.\nReady? (yes/no)",
      step: 1,
      answers: {},
    });
  }

  // STEP 1 → Start
  if (step === 1) {
    if (message.toLowerCase() !== "yes") {
      return res.json({
        reply: "Type 'yes' to start.",
        step: 1,
        answers: {},
      });
    }

    return res.json({
      reply: questions[0].text,
      step: 2,
      answers: {},
    });
  }

  const qIndex = step - 2;
  const currentQ = questions[qIndex];

  // VALIDATION
  if (!currentQ.options.includes(message.toLowerCase())) {
    return res.json({
      reply: `⚠️ Invalid input.\n${currentQ.text}`,
      step,
      answers: data,
    });
  }

  // SAVE ANSWER
  data[currentQ.key] = message.toLowerCase();

  // NEXT QUESTION
  if (qIndex + 1 < questions.length) {
    return res.json({
      reply: questions[qIndex + 1].text,
      step: step + 1,
      answers: data,
    });
  }

  // FINAL → RECOMMEND
  const vector = mapAnswers(data);
  const result = net.run(vector);

  const games = await getGames(data.genre);

  return res.json({
    reply: "🎯 Recommended Games:",
    games: games,
    step: 0,
    answers: {},
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
