const axios = require("axios");

async function getGames(genre) {
  const res = await axios.get(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&genres=${genre}&page_size=10`,
  );

  const getStoreUrl = (store, slug) => {
    switch (store.toLowerCase()) {
      case "steam":
        return `https://store.steampowered.com/app/${slug}`;
      case "epic games":
        return `https://store.epicgames.com/en-US/p/${slug}`;
      case "playstation store":
        return `https://store.playstation.com/en-in/search/${slug}`;
      case "xbox store":
        return `https://www.xbox.com/en-IN/games/store/${slug}`;
      default:
        return null;
    }
  };

  return res.data.results.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.background_image,
    screenshots: game.short_screenshots?.map((s) => s.image),
    rating: game.rating,
    genre: game.genres?.map((g) => g.name),
    platforms: game.platforms?.map((p) => p.platform.name),
    stores: game.stores?.map((s) => ({
      name: s.store.name,
      url: getStoreUrl(s.store.name, game.slug),
    })),
    released: game.released?.split("-")[0],
    playtime: game.playtime,
    metacritic: game.metacritic,
    isFree:
      game.tags?.some((tag) => tag.name.toLowerCase() === "free to play") ||
      game.genres?.some((g) => g.name.toLowerCase() === "free-to-play"),
  }));

  // return res.data.results;
}

module.exports = getGames;
