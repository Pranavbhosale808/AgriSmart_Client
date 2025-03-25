import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaChartLine, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { GiPlantSeed, GiFarmTractor } from "react-icons/gi";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("farmerName");
    localStorage.removeItem("token");
    setIsAuthenticated(false);    
    navigate("/");
  };

  const closeDropdown = () => setShowDropdown(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-transparent transition-all duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo on Left */}
        <h1 className="text-green-600 text-2xl font-extrabold tracking-wide">AgriSmart</h1>

        {/* Desktop Navigation on Right */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <Link 
            to="/" 
            className={`relative group transition ${location.pathname === "/" ? "text-black font-bold" : "text-gray-800 hover:text-black"}`}>
            Home
            <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-black transition-transform transform scale-x-0 group-hover:scale-x-100 ${location.pathname === "/" ? "scale-x-100" : ""}`}></span>
          </Link>


            <>
              <Link to="/crop-recommendation" className="text-gray-800 hover:text-green-700 transition">
                <GiPlantSeed className="inline-block mr-2" /> Crop
              </Link>
              <Link to="/fertilizer-recommendation" className="text-gray-800 hover:text-green-700  transition">
                <GiFarmTractor className="inline-block mr-2" /> Fertilizer
              </Link>
              {/* <Link to="/crop-yield-prediction" className="text-gray-800 hover:text-green-700  transition">
                <FaChartLine className="inline-block mr-2" /> Yield
              </Link> */}
            </>
        

          {/* Profile Dropdown */}
          {isAuthenticated && (
            <div className="relative">
              <FaUserCircle
                className="text-gray-800 text-2xl cursor-pointer hover:text-green-700  transition-all duration-300"
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-lg">
                  <Link to="/profile" onClick={closeDropdown} className="block px-4 py-2 text-black hover:bg-gray-200">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-black text-2xl">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md p-6 space-y-4 text-center">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-black text-lg">
            Home
          </Link>

            <>
              <Link to="/crop-recommendation" onClick={() => setMobileMenuOpen(false)} className="block text-black text-lg">
                <GiPlantSeed className="inline-block mr-2" /> Crop
              </Link>
              <Link to="/fertilizer-recommendation" onClick={() => setMobileMenuOpen(false)} className="block text-black text-lg">
                <GiFarmTractor className="inline-block mr-2" /> Fertilizer
              </Link>
              <Link to="/crop-yield-prediction" onClick={() => setMobileMenuOpen(false)} className="block text-black text-lg">
                <FaChartLine className="inline-block mr-2" /> Yield
              </Link>
            </>
          

          {/* Profile & Logout in Mobile Menu */}
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block text-black text-lg">
                Profile
              </Link>
              <button onClick={handleLogout} className="block text-red-600 text-lg">
                Logout
              </button>
            </>
          ) : (
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block bg-green-500 text-white text-lg px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
