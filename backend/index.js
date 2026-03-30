require("dotenv").config();
const express = require("express");
const cors = require("cors");

const chatRoute = require("./src/routes/chatRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", chatRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
