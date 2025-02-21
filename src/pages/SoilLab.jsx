import React, { useState } from "react";

const statesWithDistricts = {
  Maharashtra: [
    "Akola", "Amravati", "Bhandara", "Buldhana", "Chandrapur", 
    "Gadchiroli", "Gondia", "Nagpur", "Wardha", "Washim", "Yavatmal"
  ],
};

const SoilLabs = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!state || !district) {
      setError("Please select a state and district");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/labs/?state=${state}&district=${district}`
      );
      const data = await response.json();

      if (data.labs) {
        setLabs(data.labs);
      } else {
        setError("No labs found");
        setLabs([]);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative h-100 flex flex-col items-center px-6 sm:px-12 lg:px-20 bg-cover bg-center bg-[#f5f9f3] mt-18"
      style={{ backgroundImage: "url('/Bg.jpg')" }} 
    >
      {/* Dark overlay for better readability */}
      {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-20"></div> */}

      {/* Main Content */}
      <div className="relative w-full max-w-6xl p-8 bg-white bg-opacity-90 rounded-lg shadow-lg mt-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-6">
          📍 Locate Soil Testing Laboratory
        </h1>

        {/* Search Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {/* State Dropdown */}
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="p-3 border rounded-lg w-64 bg-gray-100 shadow-sm focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select State</option>
            {Object.keys(statesWithDistricts).map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* District Dropdown */}
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="p-3 border rounded-lg w-64 bg-gray-100 shadow-sm focus:ring-2 focus:ring-green-500"
            disabled={!state}
          >
            <option value="">Select District</option>
            {(statesWithDistricts[state] || []).map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
          >
            🔍 Search
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Loading Spinner */}
        {loading && <p className="text-blue-500 text-center">Fetching data...</p>}

        {/* Results Table */}
        {labs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-4 shadow-md">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="p-3 border">State</th>
                  <th className="p-3 border">District</th>
                  <th className="p-3 border">Lab Name</th>
                  <th className="p-3 border">Address</th>
                  <th className="p-3 border">Phone</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Location</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100 text-center border-t">
                    <td className="p-3 border">{lab.State}</td>
                    <td className="p-3 border">{lab.District}</td>
                    <td className="p-3 border">{lab.LabName}</td>
                    <td className="p-3 border">{lab.Address}</td>
                    <td className="p-3 border">{lab.PhoneNumber}</td>
                    <td className="p-3 border text-blue-600 underline">
                      <a href={`mailto:${lab.Email}`} target="_blank" rel="noopener noreferrer">
                        {lab.EmailAddress}
                      </a>
                    </td>
                    <td className="p-3 border text-blue-600 underline">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lab.Address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Map
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilLabs;