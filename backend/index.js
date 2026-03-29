require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const brain = require("brain.js");

// --- UTILS & SERVICES ---
const { questions } = require("./src/utils/questions");
const { mapAnswers, extractKeywords } = require("./src/utils/mapper");
const { getGames } = require("./src/services/gameService");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- BRAIN.JS SETUP ---
const net = new brain.NeuralNetwork();
// Training with basic patterns (Expand this for better accuracy)
net.train([
  { input: [1, 1, 1, 1], output: { recommend: 1 } },
  { input: [0, 0, 0, 0], output: { recommend: 0 } },
]);

// --- CHAT API ROUTE ---
app.post("/chat", async (req, res) => {
  const { message, answers = {} } = req.body;

  // 1. Handle Initial Welcome (First load)
  if (
    !message &&
    Object.values(answers).every((v) => v === null || v === undefined)
  ) {
    return res.json({
      reply: "🎮 Welcome! Game AI Here. Tell me what you're looking for!",
      answers: { genre: null, style: null, mood: null, time: null },
      step: 1,
    });
  }

  // 2. Extract keywords from the user's sentence
  const extracted = extractKeywords(message);

  // 3. Merge new keywords with previous answers
  const currentAnswers = {
    genre: extracted.genre || answers.genre || null,
    style: extracted.style || answers.style || null,
    mood: extracted.mood || answers.mood || null,
    time: extracted.time || answers.time || null,
  };

  // 4. Determine what's still missing
  const REQUIRED_FIELDS = ["genre", "style", "mood", "time"];
  const missingField = REQUIRED_FIELDS.find((field) => !currentAnswers[field]);

  if (missingField) {
    // Return the specific question for the missing data
    return res.json({
      reply: questions[missingField],
      answers: currentAnswers,
      step: REQUIRED_FIELDS.indexOf(missingField) + 2, // Keeping step for legacy UI support
    });
  }

  // 5. FINAL STEP: All fields are filled
  try {
    // Map the answers to the 0/1 vector for Brain.js
    const vector = mapAnswers(currentAnswers);
    const result = net.run(vector);

    // Fetch games based on the detected genre
    const games = await getGames(currentAnswers.genre);

    return res.json({
      reply: `🎯 I've analyzed your preferences! Here are the best ${currentAnswers.genre} games for you:`,
      games: games,
      answers: {}, // Reset state for a fresh start
      step: 0,
    });
  } catch (error) {
    console.error("Processing Error:", error);
    return res
      .status(500)
      .json({ reply: "Sorry, I ran into an error finding games." });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
