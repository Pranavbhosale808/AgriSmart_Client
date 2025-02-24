import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import farmingAnimation from "../assets/farming.json";
import FormInput from "../components/FormInput";

const CropRecommendation = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef(null); // Reference for auto-scroll

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://agrismart-server.onrender.com/api/crop?${new URLSearchParams(formData)}`);
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);

      // Auto-scroll to result after prediction
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
      
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5f9f3] to-[#e0eed8] p-6 pt-28">
      {/* Top Heading (Ensures Navbar Doesn't Overlap) */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="text-3xl md:text-4xl font-extrabold text-green-800 text-center mb-8"
      >
        🌾 Farmer's Crop Recommendation
      </motion.h1>

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center p-8 gap-8 bg-white shadow-lg rounded-lg">
        
        {/* Left: Farming Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <Lottie animationData={farmingAnimation} className="w-80 h-80 md:w-[350px] md:h-[350px] drop-shadow-xl" />
        </motion.div>

        {/* Right: Input Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["N (Nitrogen)", "P (Phosphorus)", "K (Potassium)", "Temperature (°C)", "Humidity (%)", "pH Level", "Rainfall (mm)"].map((label, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
                <FormInput label={label} name={label.toLowerCase().split(" ")[0]} type="number" register={register} required error={errors[label.toLowerCase().split(" ")[0]]} />
              </motion.div>
            ))}
          </div>

          {/* Submit Button */}
          <motion.div 
            className="flex justify-center mt-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 transition-all">
              {loading ? "Loading..." : "Get Recommendation"}
            </button>
          </motion.div>
        </motion.form>
      </div>

      {/* Result Table Below Form */}
      {result && (
        <motion.div
          ref={resultRef} // Auto-scroll reference
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl"
        >
          <h2 className="text-lg font-bold text-center mb-4">🌾 Recommended Crop</h2>
          <table className="w-full border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-green-200 text-gray-900">
                <th className="border p-3">Image</th>
                <th className="border p-3">Crop</th>
                <th className="border p-3">Soil Type</th>
                <th className="border p-3">Best Growing Conditions</th>
              </tr>
            </thead>
            <tbody>
              <motion.tr 
                className="text-center bg-white hover:bg-gray-100 transition"
                whileHover={{ scale: 1.02 }}
              >
                <td className="border p-3">
                  <img src={result.image} alt={result.crop} className="w-20 h-20 object-cover rounded-md shadow-md mx-auto" />
                </td>
                <td className="border p-3 font-bold text-green-700">
                  {result.crop} <span className="text-gray-500">({result.translation})</span>
                </td>
                <td className="border p-3">{result.soil_type}</td>
                <td className="border p-3">{result.conditions}</td>
              </motion.tr>
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default CropRecommendation;
