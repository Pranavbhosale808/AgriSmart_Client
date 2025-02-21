import React from 'react';

const PredictionResult = ({ result, translation, image }) => {
 return (
   <div className="mt-6 flex justify-center">
     {result && (
       <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
         <h2 className="text-2xl font-bold text-blue-600">{result}</h2>
         <p className="text-gray-500 text-lg">{translation}</p>
         <img 
           src={image} 
           alt={result} 
           className="mt-4 w-40 h-40 object-cover rounded-lg mx-auto"
         />
       </div>
     )}
   </div>
 );
};

export default PredictionResult;
