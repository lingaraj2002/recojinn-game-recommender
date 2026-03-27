const axios = require("axios");

async function getGames(genre) {
  const res = await axios.get(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&genres=${genre}&page_size=5`,
  );
  console.log("API KEY:", process.env.RAWG_API_KEY);

  return res.data.results.map((g) => ({
    name: g.name,
    rating: g.rating,
    image: g.background_image,
  }));
}

module.exports = { getGames };
