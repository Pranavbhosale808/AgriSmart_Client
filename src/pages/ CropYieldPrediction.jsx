import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../config";

const CropYieldPrediction = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [prediction, setPrediction] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const state_mapping = {
    'Andhra Pradesh': 0, 'Arunachal Pradesh': 1, 'Assam': 2, 'Bihar': 3, 'Chhattisgarh': 4, 'Delhi': 5,
    'Goa': 6, 'Gujarat': 7, 'Haryana': 8, 'Himachal Pradesh': 9, 'Jammu and Kashmir': 10, 'Jharkhand': 11,
    'Karnataka': 12, 'Kerala': 13, 'Madhya Pradesh': 14, 'Maharashtra': 15, 'Manipur': 16, 'Meghalaya': 17,
    'Mizoram': 18, 'Nagaland': 19, 'Odisha': 20, 'Puducherry': 21, 'Punjab': 22, 'Sikkim': 23, 'Tamil Nadu': 24,
    'Telangana': 25, 'Tripura': 26, 'Uttar Pradesh': 27, 'Uttarakhand': 28, 'West Bengal': 29
  };

  const season_mapping = {
    'Autumn': 0, 'Kharif': 1, 'Rabi': 2, 'Summer': 3, 'Whole Year': 4, 'Winter': 5
  };

  const crop_mapping = {
    'Arecanut': 0, 'Arhar/Tur': 1, 'Bajra': 2, 'Banana': 3, 'Barley': 4, 'Black pepper': 5, 'Cardamom': 6, 
    'Cashewnut': 7, 'Castor seed': 8, 'Coconut': 9, 'Coriander': 10, 'Cotton(lint)': 11, 'Cowpea(Lobia)': 12,
    'Dry chillies': 13, 'Garlic': 14, 'Ginger': 15, 'Gram': 16, 'Groundnut': 17, 'Guar seed': 18, 'Horse-gram': 19,
    'Jowar': 20, 'Jute': 21, 'Khesari': 22, 'Linseed': 23, 'Maize': 24, 'Masoor': 25, 'Mesta': 26, 'Moong(Green Gram)': 27,
    'Moth': 28, 'Niger seed': 29, 'Oilseeds total': 30, 'Onion': 31, 'Other Rabi pulses': 32, 'Other Cereals': 33, 
    'Other Kharif pulses': 34, 'Other Summer Pulses': 35, 'Peas & beans (Pulses)': 36, 'Potato': 37, 'Ragi': 38,
    'Rapeseed &Mustard': 39, 'Rice': 40, 'Safflower': 41, 'Sannhamp': 42, 'Sesamum': 43, 'Small millets': 44, 
    'Soyabean': 45, 'Sugarcane': 46, 'Sunflower': 47, 'Sweet potato': 48, 'Tapioca': 49, 'Tobacco': 50, 
    'Turmeric': 51, 'Urad': 52, 'Wheat': 53, 'other oilseeds': 54
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      setErrorMessage("");
      setPrediction(null);

      // Create a new data object with text values for state, season, and crop
      const modifiedData = {
        ...data,
        // Convert state, season, and crop indices back to their text values
        state: Object.keys(state_mapping).find(key => state_mapping[key] === parseInt(data.state)),
        season: Object.keys(season_mapping).find(key => season_mapping[key] === parseInt(data.season)),
        crop: Object.keys(crop_mapping).find(key => crop_mapping[key] === parseInt(data.crop))
      };

      const response = await axios.get(`${config.API_BASE_URL}/api/crop-yield/`, {
        params: modifiedData
      });

      setPrediction(response.data.predicted_yield);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to fetch prediction.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Crop Yield Prediction</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">State</label>
              <select 
                {...register("state", { required: "State is required" })}
                className="w-full border p-2 rounded-md"
              >
                {Object.keys(state_mapping).map(state => (
                  <option key={state} value={state_mapping[state]}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Season</label>
              <select 
                {...register("season", { required: "Season is required" })}
                className="w-full border p-2 rounded-md"
              >
                {Object.keys(season_mapping).map(season => (
                  <option key={season} value={season_mapping[season]}>{season}</option>
                ))}
              </select>
              {errors.season && <p className="text-red-500 text-sm">{errors.season.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Crop</label>
              <select 
                {...register("crop", { required: "Crop is required" })}
                className="w-full border p-2 rounded-md"
              >
                {Object.keys(crop_mapping).map(crop => (
                  <option key={crop} value={crop_mapping[crop]}>{crop}</option>
                ))}
              </select>
              {errors.crop && <p className="text-red-500 text-sm">{errors.crop.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Crop Year</label>
              <input 
                type="number" 
                {...register("crop_year", { required: "Crop Year is required" })}
                className="w-full border p-2 rounded-md"
              />
              {errors.crop_year && <p className="text-red-500 text-sm">{errors.crop_year.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Area (in hectares)</label>
              <input 
                type="number" 
                {...register("area", { required: "Area is required" })}
                className="w-full border p-2 rounded-md"
              />
              {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Production (in tons)</label>
              <input 
                type="number" 
                {...register("production", { required: "Production is required" })}
                className="w-full border p-2 rounded-md"
              />
              {errors.production && <p className="text-red-500 text-sm">{errors.production.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Annual Rainfall (mm)</label>
              <input 
                type="number" 
                {...register("annual_rainfall", { required: "Annual Rainfall is required" })}
                className="w-full border p-2 rounded-md"
              />
              {errors.annual_rainfall && <p className="text-red-500 text-sm">{errors.annual_rainfall.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Fertilizer (kg/ha)</label>
              <input 
                type="number" 
                {...register("fertilizer", { required: "Fertilizer is required" })}
                className="w-full border p-2 rounded-md"
              />
              {errors.fertilizer && <p className="text-red-500 text-sm">{errors.fertilizer.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Pesticide (kg/ha)</label>
              <input 
                type="number" 
                {...register("pesticide", { required: "Pesticide is required" })}
                className="w-full border p-2 rounded-md"
              />
              {errors.pesticide && <p className="text-red-500 text-sm">{errors.pesticide.message}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Predict Yield
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-red-500 text-center">{errorMessage}</p>}
        {prediction !== null && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 font-semibold rounded-lg text-center">
            Predicted Yield: {prediction.toFixed(2)} tons
          </div>
        )}
      </div>
    </div>
  );
};

export default CropYieldPrediction;