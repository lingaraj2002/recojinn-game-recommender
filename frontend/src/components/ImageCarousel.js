import { useState } from "react";

const ImageCarousel = ({ game }) => {
  const images = [...(game.screenshots || [])].filter(Boolean);

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
        <img
          src={images[index]}
          alt="game"
          className="w-full h-full object-cover transition duration-300"
        />

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 px-2 py-1 rounded"
        >
          ◀
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 px-2 py-1 rounded"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
