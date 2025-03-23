import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import plantImage from "../../public/assets/Back.png";
import config from "../config";
import SoilLabs from "../components/SoilLabs";
import SchemeCarousel from "../components/SchemeCarousel"
    
const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const response = await axios.get(`${config.API_BASE_URL}/api/auth_status/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

 

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9f3] to-[#e0eed8] pt-5 md:pt-20">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-8 py-12 gap-8">
        {/* Left: Text */}
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Proper greening & <br /> smart solutions
          </h1>
          <p className="text-gray-600 mt-4">
            Optimize farming practices with AI-driven insights. Get real-time crop recommendations, fertilizer suggestions, and soil health analysis to boost productivity.
          </p>

          {/* Conditional Rendering: Show Login & Signup if not logged in, else show Learn More */}
          {!isAuthenticated ? (
            <div className="mt-6 flex space-x-4">
              <Link 
                to="/signup"
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
              <Link 
                to="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>
          ) : (
            <button 
              className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Learnmore
            </button>
            
          )}
        </div>

        {/* Right: Plant Image with Glow Animation */}
        <div className="relative mt-8 md:mt-0">
          <img 
            src={plantImage} 
            alt="Green Plant" 
            className="w-72 md:w-170 transition duration-500 hover:shadow-lg hover:shadow-green-300"
          />
          <div className="absolute inset-0 bg-green-500 opacity-10 blur-lg rounded-full transition duration-500 hover:opacity-20"></div>
        </div>
      </div>

<SchemeCarousel />
<SoilLabs/>
  </div>
    
  );
};

export default HomePage;
