/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.4" },
          "50%": { transform: "scale(1.5)", opacity: "1" },
        },

        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },

        radialMove: {
          "0%, 100%": { backgroundPosition: "50% 50%" },
          "25%": { backgroundPosition: "30% 70%" },
          "50%": { backgroundPosition: "70% 30%" },
          "75%": { backgroundPosition: "40% 40%" },
        },
      },

      animation: {
        "pulse-scale": "pulse-scale 2s ease-in-out infinite",
        gradient: "gradientMove 12s ease infinite",
        radial: "radialMove 15s ease-in-out infinite",
      },

      backgroundSize: {
        400: "400% 400%",
      },
    },
  },
  plugins: [],
};
