import { useState, useEffect } from "react";
import axios from "axios";
import SendIcon from "./assets/images/recojinn-send-msg-icon.png";
import UserIcon from "./assets/images/recojinn-chat-user-icon.png";
import BotIcon from "./assets/images/recojinn-chat-bot-icon.png";
import BackIcon from "./assets/images/recojinn-back-icon.png";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    startChat();
  }, []);

  const startChat = async () => {
    const res = await axios.post("http://localhost:5000/chat", {
      message: "",
      step: 0,
      answers: {},
    });

    setMessages([{ text: res.data.reply, bot: true }]);
    setStep(res.data.step);
  };

  const send = async (text) => {
    setMessages((prev) => [...prev, { text, bot: false }]);

    setTyping(true);

    const res = await axios.post("http://localhost:5000/chat", {
      message: text,
      step,
      answers,
    });

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        { text: res.data.reply, bot: true, games: res.data.games },
      ]);

      setStep(res.data.step);
      setAnswers(res.data.answers);
    }, 800); // typing delay
  };
  console.log(messages, "MESSAGES");

  return (
    <section className="h-screen flex items-center justify-center bg-[#240046] p-6">
      <div className="h-full flex flex-col justify-between w-full max-w-[512px] bg-[#5A189A] p-6 rounded-tl-[48px] rounded-br-[48px]">
        <div className="w-full flex items-center justify-start py-4">
          <button className="bg-[#E0AAFF] p-2 rounded-full mr-4">
            <img
              src={BackIcon}
              alt="Back"
              className="w-6 h-6 [image-rendering:pixelated]"
            />
          </button>
          <h2 className="flex-1 text-2xl text-white font-bold text-center">
            Game Recommender
          </h2>
        </div>
        <div className="flex-1 flex flex-col justify-start gap-4 overflow-y-auto scrollbar-hide [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {messages.map((m, i) =>
            m.bot ? (
              <div key={i} className="w-full flex flex-col items-start">
                <div className="w-fit flex items-start gap-2 px-4 py-3 bg-[#9D4EDD] text-white rounded-3xl">
                  <img
                    src={BotIcon}
                    alt="Bot"
                    className="w-6 h-6 [image-rendering:pixelated]"
                  />
                  <span>{m.text}</span>
                </div>
                {m.games && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {m.games.map((g, i) => (
                      <div key={i} className="bg-[#10002B] p-2 rounded">
                        <div className="w-full h-[108px] rounded mb-2 overflow-hidden">
                          <img
                            src={g.image}
                            alt={g.name}
                            className="min-w-full h-auto"
                          />
                        </div>
                        <h3 className="text-sm text-white">{g.name}</h3>
                        <p className="text-xs text-white">⭐ {g.rating}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div key={i} className="w-full flex flex-col items-end">
                <div className="w-fit flex items-center gap-2 px-4 py-3 bg-[#3C096C] text-white rounded-3xl">
                  <span>{m.text}</span>
                  <img
                    src={UserIcon}
                    alt="User"
                    className="w-6 h-6 [image-rendering:pixelated]"
                  />
                </div>
              </div>
            ),
          )}
          {typing && (
            <div className="w-full flex flex-col items-start">
              <div className="w-fit flex items-center gap-2 px-4 py-3 bg-[#9D4EDD] text-white rounded-3xl">
                <img
                  src={BotIcon}
                  alt="Bot"
                  className="w-6 h-6 [image-rendering:pixelated]"
                />
                <div className="flex items-center gap-3 rounded-2xl w-fit">
                  <div className="w-2 h-2 bg-white rounded-full animate-[pulse-scale_1.5s_infinite_ease-in-out]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-[pulse-scale_1.5s_infinite_ease-in-out_0.2s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-[pulse-scale_1.5s_infinite_ease-in-out_0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex items-center gap-4 pt-4">
          <input
            className="px-6 py-2 text-2xl text-white bg-[#E0AAFF] flex-1 rounded-full outline-none "
            placeholder="Enter your answer..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                send(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <button className="bg-[#E0AAFF] p-4  rounded-full">
            <img
              src={SendIcon}
              alt="Send"
              className="w-4 h-4 [image-rendering:pixelated]"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
