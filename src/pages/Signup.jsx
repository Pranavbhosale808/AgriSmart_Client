import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", data);
      
      // Show success message
      setSuccessMessage("Signup successful! Redirecting to login...");
      
      // Reset form
      reset();

      // Hide alert after 3 seconds and navigate to login
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, 3000);

    } catch (error) {
      alert(error.response?.data?.error || "Signup failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-20">
      <h2 className="text-xl font-bold text-center">Signup</h2>

      {/* Success Alert Banner */}
      {successMessage && (
        <div className="bg-green-500 text-white text-center py-2 px-4 rounded-md mt-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
        <input {...register("username", { required: true })} placeholder="Username" className="border p-2 rounded" />
        <input {...register("password", { required: true })} type="password" placeholder="Password" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
