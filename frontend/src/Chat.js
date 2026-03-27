import { useState, useEffect } from "react";
import axios from "axios";

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
    <>
      <div className="h-screen flex flex-col bg-black text-white p-4">
        <div className="flex-1 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={m.bot ? "text-left" : "text-right"}>
              {m.text}
              {m.games && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {m.games.map((g, i) => (
                    <div key={i} className="bg-gray-800 p-2 rounded">
                      <img src={g.image} alt={g.name} className="rounded" />
                      <h3 className="text-sm mt-1">{g.name}</h3>
                      <p className="text-xs">⭐ {g.rating}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {typing && <div className="text-gray-400 italic">Bot is typing...</div>}

        <input
          className="p-2 text-black"
          placeholder="Type..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              send(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
    </>
  );
}
