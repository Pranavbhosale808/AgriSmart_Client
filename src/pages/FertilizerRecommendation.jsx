import React, { useState } from "react";
import OrganicFertilizer from "../components/OrganicFertilizer";
import InorganicFertilizer from "../components/InorganicFertilizer";

const FertilizerRecommendation = () => {
  const [isOrganic, setIsOrganic] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#f5f9f3] to-[#e0eed8] p-8">
      <div className="flex items-center mt-10">
        <span className="mr-3 font-semibold text-lg">Inorganic</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isOrganic} 
            onChange={() => setIsOrganic(!isOrganic)}
          />
          <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 dark:peer-focus:ring-green-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
        </label>
        <span className="ml-3 font-semibold text-lg">Organic</span>
      </div>
      
      <div className="w-full mt-6">
        {isOrganic ? <OrganicFertilizer /> : <InorganicFertilizer />}
      </div>
    </div>
  );
};

export default FertilizerRecommendation;