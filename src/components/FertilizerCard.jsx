import React from "react";
import { motion } from "framer-motion";

const FertilizerCard = ({ recommendations }) => {
  return (
    <div className="max-w-7xl mx-auto my-10 px-6">
      <motion.h2
        className="text-4xl font-bold text-center text-black mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recommended Fertilizers 🌱
      </motion.h2>

      <motion.p
        className="text-center text-gray-600 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Based on your soil, crop, and climate conditions.
      </motion.p>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((fertilizer, index) => (
          <motion.div
            key={index}
            className="p-4"
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 transition-all duration-300 hover:shadow-green-500/50 hover:shadow-xl w-full max-w-sm mx-auto">
              
              {/* Fertilizer Name */}
              <h3 className="text-xl font-semibold text-gray-800">
                {fertilizer.fertilizer_name}
              </h3>

              {/* Tags Section (Adjusted for better placement) */}
              <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(fertilizer.tags) &&
      fertilizer.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>

              {/* Fertilizer Description */}
              <p className="text-gray-600 mt-2">{fertilizer.description}</p>

              {/* Best Suited For Section */}
              <div className="mt-4 border-t border-gray-300 pt-4">
                <p className="font-semibold text-green-700">Best For:</p>
                <p className="text-gray-600">{fertilizer.best_suited_for}</p>
              </div>

              {/* Application Section */}
              <div className="mt-4 border-t border-gray-300 pt-4">
                <p className="font-semibold text-green-700">Application:</p>
                <p className="text-gray-600">{fertilizer.application_frequency_dosage}</p>
              </div>

              {/* Fertilizer Image (Moved below the application section) */}
              <div className="w-full h-44 mt-4">
                <img
                  src={`/images/${fertilizer.image_link}` || "Image"}
                  alt={fertilizer.fertilizer_name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>

              {/* Buttons Section */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={fertilizer.watch_video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
                >
                  🎥 Watch Video
                </a>
                <a
                  href={fertilizer.buy_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
                >
                  🛒 Buy Now
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FertilizerCard;
