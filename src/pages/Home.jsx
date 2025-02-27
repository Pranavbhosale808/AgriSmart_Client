import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaLeaf } from "react-icons/fa"; // Leaf icon for UI
import plantImage from "../../public/assets/Back.png"; // Update with actual image path
import Footer from "../components/ Footer";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://127.0.0.1:8000/api/auth_status/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f9f3] to-[#e0eed8]">
      
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
            <Link 
              to="/get-started"
              className="mt-6 inline-block bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition"
            >
              Learn More
            </Link>
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

      {/* Features Section */}
      <div className="px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Need help choosing <span className="text-green-700">the right farming solution?</span>
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Card 1: Crop Recommendation */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <FaLeaf className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">1️⃣ Crop Recommendation</h3>
            <p className="text-gray-600 mt-2">
              🌿 Best crops for your land  
              Get AI-powered crop recommendations based on soil, climate, and nutrients.
            </p>
          </div>

          {/* Card 2: Soil Health Monitoring */}
          <div className="bg-green-700 text-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <FaLeaf className="text-white text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">2️⃣ Soil Health Monitoring</h3>
            <p className="mt-2">
              🌍 Better soil, better farming  
              Analyze and improve soil conditions for long-term sustainability.
            </p>
          </div>

          {/* Card 3: Fertilizer Suggestion */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <FaLeaf className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold">3️⃣ Fertilizer Suggestion</h3>
            <p className="text-gray-600 mt-2">
              🌾 Nutrient-rich soil for better yield  
              Find the perfect fertilizer mix tailored to your land’s requirements.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
