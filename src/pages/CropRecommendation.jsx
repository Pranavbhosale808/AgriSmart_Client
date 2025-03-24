  import React, { useState, useRef, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { motion } from "framer-motion";
  import Lottie from "lottie-react";
  import farmingAnimation from "../assets/farming.json";
  import FormInput from "../components/FormInput";
  import FlipCard from "../components/FlipCard";
  import config from "../config";


  const CropRecommendation = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const resultRef = useRef(null);

    // Function to get user's location and fetch weather data
    const getWeatherData = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.OPEN_WEATHER_API}&units=metric`
        );
        const data = await response.json();
        
        if (response.ok) {
          setValue("temperature", data.main.temp.toFixed(2));
          setValue("humidity", data.main.humidity.toFixed(2));

          // Simulating rainfall data since OpenWeather does not always provide it
          const rainfall = data.rain ? data.rain["1h"] || 0 : 0;
          setValue("rainfall", rainfall.toFixed(2));

          console.log("Weather Data:", {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            rainfall,
          });
        } else {
          setLocationError("Unable to fetch weather data.");
        }
      } catch (error) {
        setLocationError("Error fetching weather data.");
      }
    };

    // Get user location
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getWeatherData(position.coords.latitude, position.coords.longitude);
          },
          () => {
            setLocationError("Location access denied. Enter values manually.");
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
      }
    }, [setValue]);

    const onSubmit = async (formData) => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const modifiedData = {
          N: formData.n,
          P: formData.p,
          K: formData.k,
          temperature: parseFloat(formData.temperature).toFixed(2),
          humidity: parseFloat(formData.humidity).toFixed(2),
          ph: parseFloat(formData.ph).toFixed(2),
          rainfall: parseFloat(formData.rainfall).toFixed(2),
        };

        localStorage.setItem("cropData", JSON.stringify(modifiedData));

        console.log("Modified Data:", modifiedData);

        const queryParams = new URLSearchParams(modifiedData).toString();
        const response = await fetch(`${config.API_BASE_URL}/api/crop?${queryParams}`);  

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();
        setResult({ crops: data.recommendations, userValues: modifiedData });

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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-extrabold text-green-800 text-center mb-8"
        >
          🌾 Farmer's Crop Recommendation
        </motion.h1>

        {locationError && (
          <motion.p className="text-red-600 text-sm font-semibold mb-4">
            ⚠ {locationError}
          </motion.p>
        )}

        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center p-8 gap-8 bg-white shadow-lg rounded-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <Lottie animationData={farmingAnimation} className="w-80 h-80 md:w-[350px] md:h-[350px] drop-shadow-xl" />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["N (Nitrogen)", "P (Phosphorus)", "K (Potassium)", "Temperature(°C) (8-43) ", "Humidity (%) (14 - 99)", "pH Level (3.5 - 10)", "Rainfall (mm) (20- 298)"].map((label, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>


                  <FormInput label={label} name={label.toLowerCase().split(" ")[0]} type="number" register={register} required error={errors[label.toLowerCase().split(" ")[0]]} />

                  
                </motion.div>
              ))}
            </div>

            <motion.div className="flex justify-center mt-6" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-green-700 transition-all">
                {loading ? "Loading..." : "Get Recommendation"}
              </button>
            </motion.div>
          </motion.form>
        </div>

        {result && (
          <motion.div ref={resultRef} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-10 w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-6">
              🌱 Recommended Crops
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {result.crops.map((crop, index) => (
                <FlipCard key={index} crop={crop.crop} translation={crop.translation} image={crop.image} soilType={crop.soil_type} conditions={crop.conditions} />
              ))}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-red-600 font-semibold mt-4">
            ❌ {error}
          </motion.div>
        )}
      </div>
    );
  };

  export default CropRecommendation;
