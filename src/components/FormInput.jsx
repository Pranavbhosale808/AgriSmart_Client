import React from "react";

const FormInput = ({ label, name, register, error, type = "text", ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label} {rest.required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        step={type === "number" ? "any" : undefined} // Allows float values for number inputs
        {...register(name, { 
          required: rest.required, 
          valueAsNumber: type === "number" // Ensures numeric values are correctly parsed
        })}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  );
};

export default FormInput;
    