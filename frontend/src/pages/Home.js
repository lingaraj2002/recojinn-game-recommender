import { Link } from "react-router-dom";
import Logo from "../assets/images/recojinn-logo.png";

export default function Home() {
  return (
    <section
      className="h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,#10002B,#240046,#3C096C,#5A189A,#7B2CBF,#9D4EDD,#C77DFF,#E0AAFF)]
bg-400 animate-radial"
    >
      <div className="flex items-center justify-center gap-6">
        <div className="w-[368px]">
          <img
            src={Logo}
            alt="Logo"
            className="w-full h-auto [image-rendering:pixelated]"
          />
        </div>
        <div className="w-[550px]">
          <h1 className="text-5xl font-bold text-white mb-4">
            Find Your Perfect Game Instantly
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            Answer a few quick questions and get personalized game
            recommendations powered by AI.
          </p>
          <Link
            to="/chat"
            className="inline-block px-6 py-2 bg-[#C77DFF] text-2xl text-white rounded-full hover:bg-[#E0AAFF] transition duration-300 text-center"
          >
            Find my game
          </Link>
        </div>
      </div>
    </section>
  );
}
