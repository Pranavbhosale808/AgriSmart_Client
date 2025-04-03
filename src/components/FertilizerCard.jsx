import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const FertilizerCard = ({ recommendations }) => {
  const [index, setIndex] = useState(0);
  const totalCards = recommendations.length;

  const handleSwipe = (dir) => {
    if (dir === "left") {
      setIndex((prev) => (prev + 1) % totalCards);
    } else if (dir === "right") {
      setIndex((prev) => (prev - 1 + totalCards) % totalCards);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleNext = () => handleSwipe("left");
  const handlePrev = () => handleSwipe("right");

  return (
    <div className="w-full max-w-4xl mx-auto my-6 md:my-10 px-2 sm:px-4 md:px-6 lg:px-8">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-3 md:mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recommended Fertilizers 🌱
      </motion.h2>

      <motion.p
        className="text-center text-gray-600 mb-4 text-xs sm:text-sm md:text-base"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Based on your soil, crop, and climate conditions.
      </motion.p>

      {/* Mobile swipe instruction - visible only on small screens */}
      <motion.p
        className="text-center text-gray-500 mb-3 text-xs sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Swipe left or right to browse
      </motion.p>

      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-64 md:min-h-80">
        {/* Navigation controls - visible only on medium and larger devices */}
        <div className="absolute top-1/2 left-0 right-0 hidden md:flex justify-between z-20 px-4 -mt-6">
          <button 
            onClick={handlePrev} 
            className="bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md text-gray-700 hover:text-gray-900 transition-all"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext} 
            className="bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md text-gray-700 hover:text-gray-900 transition-all"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Card indicator dots - for all device sizes */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 z-20">
          {recommendations.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`mx-1 h-2 w-2 md:h-3 md:w-3 rounded-full transition-all ${
                i === index ? "bg-green-600 scale-125" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Swipeable card container */}
        <div 
          {...handlers} 
          className="w-full h-170 flex items-center justify-center overflow-hidden touch-pan-y"
          aria-live="polite"
        >
          <AnimatePresence>
            {recommendations.length > 0 ? (
              recommendations.map((fertilizer, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-11/12 sm:w-80 md:w-96 p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-gray-200 transition-all duration-300 transform ${
                    i === index ? "z-10" : "z-0 -rotate-6 scale-95 opacity-50"
                  }`}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: i === index ? 0 : 50, opacity: i === index ? 1 : 0.5 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    {fertilizer.fertilizer_name}
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                    {fertilizer.tags.map((tag, idx) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">
                    {fertilizer.description}
                  </p>
                  <div className="mt-3 sm:mt-4 border-t border-gray-300 pt-2 sm:pt-3">
                    <p className="font-semibold text-green-700 text-sm md:text-base">Best For:</p>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base">{fertilizer.best_suited_for}</p>
                  </div>
                  <div className="mt-3 sm:mt-4 border-t border-gray-300 pt-2 sm:pt-3">
                    <p className="font-semibold text-green-700 text-sm md:text-base">Application:</p>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base">{fertilizer.application_frequency_dosage}</p>
                  </div>
                  <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 mt-3 sm:mt-4">
                    <img
                      src={`images/${fertilizer.image_link}` || "Image"}
                      alt={fertilizer.fertilizer_name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/320";
                      }}
                    />
                  </div>
                  <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <a href={fertilizer.watch_video} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-medium sm:font-semibold py-2 px-3 sm:px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                      🎥 Watch Video
                    </a>
                    <a href={fertilizer.buy_link} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-medium sm:font-semibold py-2 px-3 sm:px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                      🛒 Buy Now
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="absolute w-11/12 sm:w-80 md:w-96 p-4 sm:p-6 bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-xl border border-gray-200 transition-all duration-300 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">No Data Found</h3>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">Try again later!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FertilizerCard;