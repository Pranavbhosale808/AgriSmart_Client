import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CardFlip from "react-card-flip";
import { BsFillBookmarksFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";
import { useNavigate } from "react-router-dom";

const FlipCard = ({ crop, translation, image, soilType, conditions, formData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [marketPrice, setMarketPrice] = useState(null); // Store market price
  const farmerName = localStorage.getItem("farmerName") || "Unknown Farmer";
  const [State , setState] = useState(false);
  const[District,setDistrict] = useState(false);
  const[ArrivalDate,setArrivalDate] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  

   // Function to get today's date in DD/MM/YYYY format
   const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-GB").replace(/\//g, "/");
  };

  // Auto-detect location using a free API
  const fetchLocation = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/user-location/`); 
      const data = await response.json();
      setState(data.region); // e.g., Maharashtra
      setDistrict(data.city); // e.g., Buldhana
      setArrivalDate(getCurrentDate()); // Today's date
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);


  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const saveFavourite = async (e) => {
    e.stopPropagation();
    const favouriteData = {
      farmerName,
      crop_name: crop,
      crop_translation: translation,
      user_entered_values: {
        soilType,
        conditions,
        ...formData,
      },
      market_price: marketPrice,
    };

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/favourite/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favouriteData),
      });

      if (response.ok) {
        toast.success("Crop saved successfully!", { position: "top-right" });
      } else {
        toast.error("Failed to save crop!", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Something went wrong!", { position: "top-right" });
    }
  };

  const fetchMarketRate = async (crop) => {
    try {
        // Fetch location using Geolocation API
        const fetchLocation = async () => {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    console.error("Geolocation is not supported by this browser.");
                    return resolve({ state: "Maharashtra", district: "Buldhana" }); // Fallback values
                }

                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log("Latitude:", latitude, "Longitude:", longitude);

                        try {
                            // Fetch location details using OpenStreetMap's Nominatim API (Free)
                            const response = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                            );
                            const data = await response.json();
                            
                            const state = data.address.state || "Maharashtra";
                            const district = data.address.county || "Buldhana"; // County is often the district

                            resolve({ state, district });
                        } catch (error) {
                            console.error("Error fetching location data:", error);
                            resolve({ state: "Maharashtra", district: "Buldhana" }); // Fallback values
                        }
                    },
                    (error) => {
                        console.error("Error getting geolocation:", error);
                        resolve({ state: "Maharashtra", district: "Buldhana" }); // Fallback if user denies location
                    }
                );
            });
        };

        // Get user location data
        const { state, district } = await fetchLocation();
        console.log("State:", state, "District:", district);

        // Get today's date in DD/MM/YYYY format
        const getCurrentDate = () => {
            const today = new Date();
            return `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1)
                .toString().padStart(2, "0")}/${today.getFullYear()}`;
        };
        const arrival_date = getCurrentDate();

        // Construct API URL
        const apiUrl = `${config.API_BASE_URL}/api/market-price/?state=${state}&district=${district}&commodity=${crop}&arrival_date=${arrival_date}`;

        // Fetch market data
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        // Handle response
        if (response.ok) {
            const data = await response.json();
            toast.success("Market data fetched successfully!", { position: "top-right" });
            return data; // Return data for further use
        } else {
            toast.error("Failed to fetch market data!", { position: "top-right" });
            throw new Error("Failed to fetch market data");
        }
    } catch (error) {
        console.error("Error fetching market data:", error);
        toast.error("Something went wrong!", { position: "top-right" });
    }
};

const handleMarketRateClick = () => {
  localStorage.setItem("selectedCrop", crop); // Save crop name to localStorage
  navigate("/market-data");
};

  return (
    <motion.div
      className="relative w-72 h-96 cursor-pointer"
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      whileTap={!isMobile ? { scale: 0.95 } : {}}
      onMouseEnter={!isMobile ? () => setIsFlipped(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsFlipped(false) : undefined}
      onClick={isMobile ? () => setIsFlipped(!isFlipped) : undefined}
    >
      <CardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front Side */}
        <div
          className="relative w-72 h-96 bg-cover bg-center rounded-xl shadow-lg overflow-hidden"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end p-4 text-white rounded-xl">
            <h2 className="text-2xl font-bold">{crop}</h2>
            <p className="text-sm opacity-80 italic">{translation}</p>
          </div>
        </div>

        {/* Back Side */}
        <div className="w-72 h-96 bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg flex flex-col justify-center items-center p-6 text-center border border-green-300">
          <h2 className="text-xl font-bold text-green-800">
            🌾 {crop} ({translation}) Details
          </h2>
          <p className="text-gray-700 mt-3">
            <span className="font-semibold">Soil Type:</span> {soilType}
          </p>
         
          <motion.button
        onClick={handleMarketRateClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-700 transition-all"
      >
        <BsFillBookmarksFill className="text-lg" /> Check Market Rate
      </motion.button>

          <motion.button
            onClick={saveFavourite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-green-700 transition-all"
          >
            <BsFillBookmarksFill className="text-lg" /> Save
          </motion.button>
        </div>
      </CardFlip>
    </motion.div>
  );
};

export default FlipCard;
