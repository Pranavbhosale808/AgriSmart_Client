import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import farmingAnimation from "../assets/Fertlizer.json";
import { ClipLoader } from "react-spinners"; // Importing the new loader
import FormInput from "../components/FormInput";
import config from "../config";

const soilOptions = [
  { value: 0, label: "Loamy (दोमट मिट्टी)" },
  { value: 1, label: "Red (लाल मिट्टी)" },
  { value: 2, label: "Clayey (चिकनी मिट्टी)" },
  { value: 3, label: "Sandy (बालू मिट्टी)" },
  { value: 4, label: "Black (काली मिट्टी)" },
];

const cropOptions = [
  { value: 0, label: "Rice (चावल)" },
  { value: 1, label: "Maize (मक्का)" },
  { value: 2, label: "Jute (जूट)" },
  { value: 3, label: "Cotton (कपास)" },
  { value: 4, label: "Coconut (नारियल)" },
];

const InorganicFertilizer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    const requestData = {
      soil_type: parseInt(formData.soilType),
      crop_type: parseInt(formData.cropType),
      temperature: formData.temperature,
      humidity: formData.humidity,
      moisture: formData.moisture,
      nitrogen: formData.nitrogen,
      phosphorous: formData.phosphorous,
      potassium: formData.potassium,
      land_area: formData.landArea,
    };

    const queryString = new URLSearchParams(requestData).toString();

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/fertilizer?${queryString}`);
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">🌱 Fertilizer Recommendation</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <motion.form 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            onSubmit={handleSubmit(onSubmit)} 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-lg shadow-lg bg-white w-full"
          >
            <FormInput label="Temperature (°C)" name="temperature" type="number" register={register} required error={errors.temperature} />
            <FormInput label="Humidity (%)" name="humidity" type="number" register={register} required error={errors.humidity} />
            <FormInput label="Moisture (%)" name="moisture" type="number" register={register} required error={errors.moisture} />
            <FormInput label="Nitrogen" name="nitrogen" type="number" register={register} required error={errors.nitrogen} />
            <FormInput label="Phosphorous" name="phosphorous" type="number" register={register} required error={errors.phosphorous} />
            <FormInput label="Potassium" name="potassium" type="number" register={register} required error={errors.potassium} />
            <FormInput label="Land Area (hectares)" name="landArea" type="number" register={register} required error={errors.landArea} />
            
            <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Soil Type <span className="text-red-500">*</span></label>
          <select {...register("soilType", { required: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none">
            <option value="">Select Soil Type</option>
            {soilOptions.map((soil) => (
              <option key={soil.value} value={soil.value}>{soil.label}</option>
            ))}
          </select>
        </div>


            <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Crop Type <span className="text-red-500">*</span></label>
          <select {...register("cropType", { required: true })} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none">
            <option value="">Select Crop Type</option>
            {cropOptions.map((crop) => (
              <option key={crop.value} value={crop.value}>{crop.label}</option>
            ))}
          </select>
        </div>

            <div className="col-span-1 md:col-span-2 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 transition-all"
              >
                {loading ? "Loading..." : "Get Recommendation"}
              </motion.button>
            </div>
          </motion.form>
          
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex justify-center">
            <Lottie animationData={farmingAnimation} className="w-64 h-64 md:w-80 md:h-80" />
          </motion.div>
        </div>

        {loading && (
          <div className="flex justify-center mt-6">
            <ClipLoader color="#36D7B7" size={50} />
          </div>
        )}

        {result && !loading && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-center mb-4">🌾 Recommended Fertilizer</h2>
            <table className="w-full border-collapse border border-gray-300 text-gray-700">
              <thead>
                <tr className="bg-green-200 text-gray-900">
                  <th className="border p-3">Name</th>
                  <th className="border p-3">NPK Ratio</th>
                  <th className="border p-3">Land Area</th>
                  <th className="border p-3">Recommended Quantity (kg)</th>
                  <th className="border p-3">Buy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center bg-white hover:bg-gray-100 transition">
                  <td className="border p-3">{result.fertilizer}</td>
                  <td className="border p-3">{result.npk_ratio}</td>
                  <td className="border p-3">{result.land_area}</td>
                  <td className="border p-3">{result.recommended_quantity_kg} kg</td>
                  <td className="border p-3">
                    <a href={result.buy_link} target="_blank" rel="noopener noreferrer">
                      <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Buy Now
                      </button>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InorganicFertilizer;
