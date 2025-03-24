import React from "react";
import { motion } from "framer-motion";

const FertilizerCard = ({ recommendations }) => {
  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-black mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recommended Fertilizers 🌱
      </motion.h2>

      <motion.p
        className="text-center text-gray-600 mb-8 text-sm sm:text-base"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Based on your soil, crop, and climate conditions.
      </motion.p>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendations.map((fertilizer, index) => (
          <motion.div
            key={index}
            className="p-2"
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 transition-all duration-300 hover:shadow-green-500/50 hover:shadow-xl w-full mx-auto">
              {/* Fertilizer Name */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {fertilizer.fertilizer_name}
              </h3>

              {/* Tags Section */}
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(fertilizer.tags) &&
                  fertilizer.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>

              {/* Fertilizer Description */}
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {fertilizer.description}
              </p>

              {/* Best Suited For Section */}
              <div className="mt-4 border-t border-gray-300 pt-3">
                <p className="font-semibold text-green-700">Best For:</p>
                <p className="text-gray-600 text-sm sm:text-base">
                  {fertilizer.best_suited_for}
                </p>
              </div>

              {/* Application Section */}
              <div className="mt-4 border-t border-gray-300 pt-3">
                <p className="font-semibold text-green-700">Application:</p>
                <p className="text-gray-600 text-sm sm:text-base">
                  {fertilizer.application_frequency_dosage}
                </p>
              </div>

              {/* Fertilizer Image */}
              <div className="w-full h-40 sm:h-44 mt-4">
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
              <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
                <a
                  href={fertilizer.watch_video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  🎥 Watch Video
                </a>
                <a
                  href={fertilizer.buy_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
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
