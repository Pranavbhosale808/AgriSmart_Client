import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../components/FormInput';
import PredictionResult from '../components/PredictionResult';
import useApi from '../hooks/useApi';

const cropOptions = [
  { value: "Rice", label: "Rice (चावल)" },
  { value: "Maize", label: "Maize (मक्का)" },
  { value: "Jute", label: "Jute (जूट)" },
  { value: "Cotton", label: "Cotton (कपास)" },
  { value: "Coconut", label: "Coconut (नारियल)" },
  { value: "Papaya", label: "Papaya (पपीता)" },
  { value: "Orange", label: "Orange (संतरा)" },
  { value: "Apple", label: "Apple (सेब)" },
  { value: "Muskmelon", label: "Muskmelon (खरबूजा)" },
  { value: "Watermelon", label: "Watermelon (तरबूज)" },
  { value: "Grapes", label: "Grapes (अंगूर)" },
  { value: "Soyachuncks", label: "Soyachuncks (सोयाबीन)" },
  { value: "Banana", label: "Banana (केला)" },
  { value: "Pomegranate", label: "Pomegranate (अनार)" },
  { value: "Lentil", label: "Lentil (दाल)" },
  { value: "Blackgram", label: "Blackgram (उड़द)" },
  { value: "Mungbean", label: "Mungbean (मूंग)" },
  { value: "Mothbeans", label: "Mothbeans (मुठ)" },
  { value: "Pigeonpeas", label: "Pigeonpeas (अरहर)" },
  { value: "Kidneybeans", label: "Kidneybeans (राजमा)" },
  { value: "Chickpea", label: "Chickpea (चने)" },
  { value: "Coffee", label: "Coffee (कॉफी)" },
];

const fertilizerOptions = [
  { value: "10-26-26", label: "10-26-26" },
  { value: "14-35-14", label: "14-35-14" },
  { value: "17-17-17", label: "17-17-17" },
  { value: "20-20", label: "20-20" },
  { value: "28-28", label: "28-28" },
  { value: "DAP", label: "DAP" },
  { value: "Urea", label: "Urea" },
];

const CropYieldPrediction = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data, error, loading, fetchData } = useApi('https://agrismart-server.onrender.com/api/crop-yield');
  const [result, setResult] = useState('');

  const onSubmit = async (formData) => {
    await fetchData(formData);
  };

  useEffect(() => {
    if (data) {
      setResult(data.yield);
    }
  }, [data]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Crop Yield Prediction</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput label="Area (hectares)" name="area" type="number" register={register} required error={errors.area} />

        {/* Crop Item Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropItem">
            Crop Item <span className="text-red-500">*</span>
          </label>
          <select 
            id="cropItem"
            {...register("cropItem", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.cropItem ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a Crop</option>
            {cropOptions.map((crop) => (
              <option key={crop.value} value={crop.value}>{crop.label}</option>
            ))}
          </select>
          {errors.cropItem && <p className="text-red-500 text-xs italic">This field is required.</p>}
        </div>

        <FormInput label="Average Rainfall (mm/year)" name="rainfall" type="number" register={register} required error={errors.rainfall} />
        
        {/* Pesticide Usage Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pesticideUsage">
            Pesticide Usage <span className="text-red-500">*</span>
          </label>
          <select 
            id="pesticideUsage"
            {...register("pesticideUsage", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.pesticideUsage ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a Fertilizer</option>
            {fertilizerOptions.map((fertilizer) => (
              <option key={fertilizer.value} value={fertilizer.value}>{fertilizer.label}</option>
            ))}
          </select>
          {errors.pesticideUsage && <p className="text-red-500 text-xs italic">This field is required.</p>}
        </div>

        <FormInput label="Average Temperature (°C)" name="averageTemperature" type="number" register={register} required error={errors.averageTemperature} />

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300" disabled={loading}>
            {loading ? "Loading..." : "Get Prediction"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-2">Error fetching data</p>}
      <PredictionResult result={result} />
    </div>
  );
};

export default CropYieldPrediction;
