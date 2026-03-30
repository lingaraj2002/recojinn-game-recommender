const keywords = {
  genre: [
    "action",
    "rpg",
    "adventure",
    "strategy",
    "simulation",
    "puzzle",
    "shooter",
    "platformer",
    "racing",
    "sports",
    "fighting",
    "arcade",
  ],

  style: [
    "indie",
    "retro",
    "pixel",
    "realistic",
    "cinematic",
    "story rich",
    "fast paced",
    "turn based",
    "exploration",
  ],

  mood: [
    "competitive",
    "relaxing",
    "fun",
    "intense",
    "dark",
    "immersive",
    "thrilling",
  ],

  time: ["short", "medium", "long"],
};

const synonymMap = {
  fps: ["shooter", "gun", "gun game"],
  rpg: ["role playing", "story game"],
  casual: ["easy", "simple", "light"],
  relaxing: ["chill", "peaceful", "calm"],
  competitive: ["ranked", "pvp"],
  horror: ["scary", "creepy"],
  short: ["quick", "fast"],
  long: ["story", "open world"],
};

const questions = {
  genre: {
    primary: "What kind of game experience are you in the mood for right now?",
    fallback:
      "You can choose something like action, RPG, adventure, strategy, shooter, racing, or sports.",
  },

  style: {
    primary:
      "Do you prefer a specific style, like story-driven, fast-paced, or something more exploratory?",
    fallback:
      "For example: indie, retro, cinematic, story rich, fast paced, turn based, or exploration.",
  },

  mood: {
    primary: "What kind of vibe are you looking for while playing?",
    fallback:
      "You can say relaxing, competitive, fun, intense, dark, immersive, or thrilling.",
  },

  time: {
    primary: "How much time do you want to spend playing?",
    fallback: "You can say short, medium, or long sessions.",
  },
};

module.exports = { keywords, synonymMap, questions };
