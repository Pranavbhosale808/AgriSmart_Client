import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found!");
          return;
        }

        const response = await axios.get(`${config.API_BASE_URL}/api/auth_status/`, {
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/login/`, data);
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("farmerName", response.data.username);
      setIsAuthenticated(true);

      // Show success toast
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/"), 2000);
      
    } catch (error) {
      // Show error toast
      toast.error("Invalid credentials! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-20 text-center">
      <h2 className="text-xl font-bold">Login</h2>

      {loading ? (
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
          <input {...register("username", { required: true })} placeholder="Username" className="border p-2 rounded" />
          <input {...register("password", { required: true })} type="password" placeholder="Password" className="border p-2 rounded" />
          <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-700">
            Login
          </button>
        </form>
      )}

      <p className="mt-4">
        Do not have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
