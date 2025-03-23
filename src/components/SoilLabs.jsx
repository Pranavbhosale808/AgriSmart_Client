import React, { useState } from "react";
import config from "../config";

const statesWithDistricts = {
  Maharashtra: [
    "Akola", "Amravati", "AHMEDNAGAR","Bhandara", "BEED","Buldhana", "Chandrapur", "Chhatrapati Sambhajinagar","DHARASHIV","DHULE",
    "Gadchiroli", "Gondia", "HINGOLI","JALGAON","JALNA","KOLHAPUR","LATUR","MUMBAI SUBURBAN","NANDED","NANDURBAR","NASHIK","Nagpur", "PALGHAR","PARBHANI","PUNE","RAIGAD","RATNAGIRI","SANGLI","SATARA","SINDHUDURG","SOLAPUR","THANE","Wardha", "Washim", "Yavatmal",
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
        `${config.API_BASE_URL}/api/labs/?state=${state}&district=${district}`
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
      className={`flex flex-col items-center px-6 sm:px-12 lg:px-20 
        bg-gradient-to-b from-[#f5f9f3] to-[#e0eed8] 
        ${labs.length > 0 ? "h-[70vh]" : "h-[40vh]"}`}
    >
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#2F5233] mt-6">
        🌿 Locate Soil Testing Laboratory
      </h1>

      {/* Search Filters */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        {/* State Dropdown */}
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="p-3 border rounded-lg w-64 bg-[#e0eed8] text-[#2F5233] shadow-md focus:ring-2 focus:ring-green-500"
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
          className="p-3 border rounded-lg w-64 bg-[#e0eed8] text-[#2F5233] shadow-md focus:ring-2 focus:ring-green-500"
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
          className="bg-[#3B7A57] text-white px-6 py-3 rounded-lg hover:bg-[#2F5233] transition font-semibold shadow-md"
        >
          🔍 Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-blue-600 text-center mt-4">Fetching data...</p>}

      {/* Results Table */}
      {labs.length > 0 && (
        <div className="overflow-x-auto w-full max-w-5xl mt-6 mb-10">
          <table className="w-full border-collapse border border-[#2F5233] rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#3B7A57] text-white text-lg">
                <th className="p-3 border border-[#2F5233]">State</th>
                <th className="p-3 border border-[#2F5233]">District</th>
                <th className="p-3 border border-[#2F5233]">Lab Name</th>
                <th className="p-3 border border-[#2F5233]">Address</th>
                <th className="p-3 border border-[#2F5233]">Phone</th>
                <th className="p-3 border border-[#2F5233]">Email</th>
                <th className="p-3 border border-[#2F5233]">Location</th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab, index) => (
                <tr key={index} className="bg-[#f5f9f3] hover:bg-[#e0eed8] text-center border-t">
                  <td className="p-3 border border-[#2F5233]">{lab.State}</td>
                  <td className="p-3 border border-[#2F5233]">{lab.District}</td>
                  <td className="p-3 border border-[#2F5233]">{lab.Labname}</td>
                  <td className="p-3 border border-[#2F5233]">{lab.Address}</td>
                  <td className="p-3 border border-[#2F5233]">{lab.PhoneNumber}</td>
                  <td className="p-3 border border-[#2F5233] text-blue-600 underline">
                    <a href={`mailto:${lab.Email}`} target="_blank" rel="noopener noreferrer">
                      {lab.EmailAddress}
                    </a>
                  </td>
                  <td className="p-3 border border-[#2F5233] text-blue-600 underline">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lab.Location)}`}
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
  );
};

export default SoilLabs;
