import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${config.API_BASE_URL}/api/signup/`, data);

      // Show success toast notification
      toast.success("Signup successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
      });

      // Reset form
      reset();

      // Redirect after 3 seconds
      setTimeout(() => navigate("/login"), 3000);
      
    } catch (error) {
      // Show error toast notification
      toast.error(error.response?.data?.error || "Signup failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-20">
      <h2 className="text-xl font-bold text-center">Signup</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
        <input {...register("username", { required: true })} placeholder="Username" className="border p-2 rounded" />
        <input {...register("password", { required: true })} type="password" placeholder="Password" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition">
          Signup
        </button>
      </form>

      <p className="mt-4">
        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
      </p>
    </div>
  );
};

export default Signup;
