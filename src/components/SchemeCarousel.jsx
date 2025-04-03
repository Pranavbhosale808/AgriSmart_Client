import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SchemeCarousel = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Fetching from local JSON file
    fetch("/schemes.json") 
      .then((response) => response.json())
      .then((data) => setSchemes(data))
      .catch((error) => console.error("Error fetching schemes:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#e0eed8] to-[#f5f9f3] py-10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-green-700 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Live Agriculture Schemes 🌿
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Discover the latest government schemes for farmers and apply today!
        </motion.p>

        <Slider {...settings}>
          {schemes.map((scheme, index) => (
            <motion.div key={index} className="p-4" whileHover={{ scale: 1.05 }}>
              <div className="bg-white shadow-md rounded-lg p-6 w-[350px] mx-auto transition duration-300 hover:shadow-green-500/50 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {scheme.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{scheme.title}</h3>
                <p className="text-gray-600 mt-2">{scheme.description}</p>

                <div className="mt-4 border-t border-gray-300 pt-4">
                  <p className="font-semibold text-green-700">Eligibility:</p>
                  <p className="text-gray-600">{scheme.eligibility}</p>
                </div>

                <div className="mt-4 border-t border-gray-300 pt-4">
                  <p className="font-semibold text-green-700">Application Process:</p>
                  <p className="text-gray-600">{scheme.applicationProcess}</p>
                </div>

                <div className="mt-6">
                  <a
                    href={scheme.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg block text-center transition"
                  >
                    Apply Now →
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {scheme.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SchemeCarousel;
