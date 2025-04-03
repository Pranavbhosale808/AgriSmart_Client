import React, { useState } from "react";
import FertilizerCard from "../components/FertilizerCard";
import config from "../config";

const OrganicFertilizer = () => {
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");
  const [weather, setWeather] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const soilTypes = ["Red Soil", "Alluvial Soil", "Laterite Soil", "Black Soil", "Sandy Soil"];
  const cropTypes = ["Maize", "Groundnut", "Jowar", "Sugarcane", "Bajra", "Wheat", "Grapes", "Tur", "Moong", "Urad", "Cotton", "Rice", "Banana", "Soybean", "Pomegranate"];
  const weatherConditions = ["Humid", "Hot and Dry", "Tropical", "Moderate", "Cold and Dry"];

  const fetchFertilizerRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${config.API_BASE_URL}/api/organic_fertilizer?soil=${soil}&crop=${crop}&weather=${weather}&ph=${ph}&rainfall=${rainfall}`
      );
      const data = await response.json();
      console.log("Recommendation: ", data.recommended_fertilizers);

      const jsonResponse = await fetch("fertilizer.json");
      const fertilizersData = await jsonResponse.json();

      const matchedFertilizers = fertilizersData.filter((fertilizer) =>
        data.recommended_fertilizers.includes(fertilizer.fertilizer_name)
      );
      console.log("Fertilizer: ", matchedFertilizers);

      setRecommendations(matchedFertilizers);
    } catch (error) {
      console.error("Error fetching fertilizer recommendations:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-r from-green-300 to-green-100 text-black p-10">
      <h2 className="text-5xl font-bold mb-10 text-black text-center w-full">Get Fertilizer Recommendations 🌱</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
        <select
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
          className="p-4 border border-black bg-white rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black w-full"
        >
          <option value="" disabled>Select Soil Type</option>
          {soilTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="p-4 border border-black bg-white rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black w-full"
        >
          <option value="" disabled>Select Crop Type</option>
          {cropTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          className="p-4 border border-black bg-white rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black w-full"
        >
          <option value="" disabled>Select Weather Condition</option>
          {weatherConditions.map((condition) => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Soil pH"
          value={ph}
          onChange={(e) => setPh(e.target.value)}
          className="p-4 border border-black bg-white rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black w-full"
        />

        <input
          type="number"
          placeholder="Rainfall (mm)"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          className="p-4 border border-black bg-white rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black w-full"
        />
      </div>

      <button
        onClick={fetchFertilizerRecommendations}
        className="mt-8 bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-800 transition-all w-full max-w-xs"
      >
        Get Recommendations
      </button>

      {loading && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-700"></div>
          <p className="mt-4 text-lg font-semibold">Fetching recommendations...</p>
        </div>
      )}

      {!loading && recommendations.length > 0 && (
        <div>
          <FertilizerCard recommendations={recommendations} />
        </div>
      )}
    </div>
  );
};

export default OrganicFertilizer;
