import React from "react";
import { FaSeedling, FaFlask, FaCloudSun, FaChartLine, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    title: "Crop Recommendation",
    icon: <FaSeedling className="text-green-700 text-6xl" />,
    description: "AI-driven recommendations based on soil and weather conditions.",
  },
  {
    title: "Fertilizer Guidance",
    icon: <FaFlask className="text-green-700 text-6xl" />,
    description: "Suggests the best organic and chemical fertilizers for your crops.",
  },
  {
    title: "Soil Health Test Labs",
    icon: <FaTools className="text-green-700 text-6xl" />,
    description: "Locate Nearest Soil Testing Labs.",
  },
];  

const Service = () => {
  return (
    <div className=" bg-gradient-to-br from-[#e0eed8] to-[#f5f9f3] py-12 px-6 md:px-16">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-black text-center mb-10 font-serif"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Services
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-2xl font-semibold text-black font-mono">{service.title}</h2>
            <p className="text-gray-700 mt-2 font-sans">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;