import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://agrismart-server.onrender.com/api/login/", data);
      
      // Save JWT Token
      localStorage.setItem("token", response.data.access);

      // Save Farmer's Name from Backend Response 
      localStorage.setItem("farmerName", response.data.username);

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-20">
      <h2 className="text-xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register("username", { required: true })} placeholder="Username" className="border p-2 rounded" />
        <input {...register("password", { required: true })} type="password" placeholder="Password" className="border p-2 rounded" />
        <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
};

export default Login;
