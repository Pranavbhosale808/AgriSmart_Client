// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} Crop & Fertilizer Recommendation System sponsered by Durex</p>
    </footer>
  );
};

export default Footer;