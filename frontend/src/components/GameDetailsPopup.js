import { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import StorePopup from "./StorePopup";

const GameDetailsPopup = ({ game, onClose }) => {
  const [showStorePopup, setShowStorePopup] = useState(false);
  if (!game) return null;

  const isFree = game.isFree;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        {/* Modal */}
        <div className="bg-gray-900 text-white w-[95%] md:w-[600px] max-h-[calc(100%-3rem)] rounded-2xl shadow-xl overflow-auto no-scrollbar relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl z-10"
          >
            ✕
          </button>

          {/* Banner Image & Screenshots */}
          <ImageCarousel game={game} />

          {/* Content */}
          <div className="p-4">
            {/* Title + Rating */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-bold">{game.name}</h2>
                {/* Genre + Year */}
                <div className="flex flex-wrap gap-2">
                  {game.genre?.map((p, i) => (
                    <>
                      {i > 0 && " • "}
                      <span key={i} className="text-gray-300 text-sm ">
                        {p}
                      </span>
                    </>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {/* Badge */}
                <div>
                  {isFree ? (
                    <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                      🆓 Free to Play
                    </span>
                  ) : (
                    <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                      💰 Paid Game
                    </span>
                  )}
                </div>
                <span className="text-yellow-400 font-semibold mr-1">
                  ⭐ {game.rating?.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Platforms */}
            <div className="mb-2">
              <h3 className="text-sm text-gray-400 mb-1">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms?.map((p, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 px-2 py-1 rounded text-xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Stores */}
            <div className="mb-2">
              <h3 className="text-sm text-gray-400 mb-1">Available On</h3>
              <div className="flex flex-wrap gap-2">
                {game.stores?.map((store, i) => (
                  <span
                    key={i}
                    className="bg-blue-700 px-2 py-1 rounded text-xs"
                  >
                    {store.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Playtime + Metacritic */}
            <div className="flex gap-6 text-sm text-gray-300">
              {game.released && <span>🚀 {game.released}</span>}
              {game.playtime && <span>⏱️ {game.playtime}+ hrs</span>}
              {game.metacritic && <span>🔥 {game.metacritic} Meta</span>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3">
              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg w-full"
                onClick={() => setShowStorePopup(true)}
              >
                {isFree ? "🎮 Play Now" : "🛒 Buy / Play"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showStorePopup && (
        <StorePopup
          stores={game.stores}
          onClose={() => setShowStorePopup(false)}
        />
      )}
    </>
  );
};

export default GameDetailsPopup;
