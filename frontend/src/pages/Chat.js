import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SendIcon from "../assets/images/recojinn-send-msg-icon.png";
import UserIcon from "../assets/images/recojinn-chat-user-icon.png";
import BotIcon from "../assets/images/recojinn-chat-bot-icon.png";
import BackIcon from "../assets/images/recojinn-back-icon.png";
import { Link } from "react-router-dom";
import GameDetailsPopup from "../components/GameDetailsPopup";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState({});
  const [typing, setTyping] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const messagesEndRef = useRef(null);
  const gameGridRef = useRef(null);

  // Determine if the very last message received has games attached
  const lastMsg = messages[messages.length - 1];
  const hasGames = !!(lastMsg?.games && lastMsg.games.length > 0);

  useEffect(() => {
    startChat();
  }, []);

  useEffect(() => {
    if (hasGames) {
      // Scroll to the TOP of the grid so it pins to the top of the container
      gameGridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Normal behavior: scroll to bottom for ongoing conversation
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, hasGames]);

  const startChat = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: "",
        answers: {},
      });
      setMessages([{ text: res.data.reply, bot: true }]);
      setAnswers(res.data.answers);
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  const send = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text, bot: false }]);
    setTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: text,
        answers,
      });

      // Artificial delay for bot "thinking"
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { text: res.data.reply, bot: true, games: res.data.games },
        ]);
        setAnswers(res.data.answers);
      }, 800);
    } catch (err) {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to server.", bot: true },
      ]);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-[#240046] p-6">
      <div className="h-full flex flex-col justify-between w-full max-w-[512px] ">
        {/* Header */}
        <div className="w-full flex items-center justify-start pb-6 mb-4 border-b border-[#E0AAFF]">
          <Link to="/" className="bg-[#E0AAFF] p-2 rounded-full mr-4">
            <img src={BackIcon} alt="Back" className="w-6 h-6" />
          </Link>
          <h2 className="flex-1 text-2xl text-white font-bold text-center">
            Game Recommender
          </h2>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 flex flex-col justify-start gap-4 overflow-y-auto scrollbar-hide [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`w-full flex flex-col ${m.bot ? "items-start" : "items-end"}`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[90%] flex items-start gap-2 px-4 py-3 text-white rounded-3xl ${m.bot ? "bg-[#9D4EDD]" : "bg-[#3C096C]"}`}
              >
                {m.bot && <img src={BotIcon} alt="Bot" className="w-6 h-6" />}
                <span className="text-sm md:text-base">{m.text}</span>
                {!m.bot && (
                  <img src={UserIcon} alt="User" className="w-6 h-6" />
                )}
              </div>

              {/* Game Grid attached to the Bot Message */}
              {m.games && (
                <div
                  ref={gameGridRef}
                  className="grid grid-cols-2 gap-2 mt-4 w-full animate-in fade-in slide-in-from-top-4 duration-500"
                >
                  {m.games.map((g, index) => (
                    <div
                      key={index}
                      className="bg-[#10002B] p-2 rounded-xl border border-purple-400/20"
                    >
                      <div className="w-full h-[100px] rounded-lg mb-2 overflow-hidden bg-purple-900">
                        <img
                          src={g.image}
                          alt={g.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs text-white font-bold truncate">
                          {g.name}
                        </h3>
                        {g.isFree ? (
                          <span className="text-green-600 text-sm">Free</span>
                        ) : (
                          <span className="text-red-600 text-sm">Paid</span>
                        )}
                      </div>
                      <p className="text-[10px] text-purple-200">
                        ⭐ {g.rating}
                      </p>
                      <button
                        className="mt-2 w-full bg-[#E0AAFF] text-purple-700 text-xs py-1 rounded-full hover:bg-[#9D4EDD] hover:text-white transition-colors"
                        onClick={() => setSelectedGame(g)}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <div className="w-full flex flex-col items-start">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#9D4EDD] text-white rounded-3xl">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}

          {/* Invisible Anchor for ongoing chat scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="w-full flex items-center gap-4 pt-4">
          <input
            className="px-6 py-3 text-lg text-[#240046] bg-[#E0AAFF] placeholder:text-purple-700 flex-1 rounded-full outline-none focus:ring-2 focus:ring-white/50"
            placeholder="Type your answer..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                send(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <button className="bg-[#E0AAFF] p-4 rounded-full hover:scale-105 active:scale-95 transition-transform">
            <img src={SendIcon} alt="Send" className="w-4 h-4" />
          </button>
        </div>
      </div>
      {selectedGame && (
        <GameDetailsPopup
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </section>
  );
}
