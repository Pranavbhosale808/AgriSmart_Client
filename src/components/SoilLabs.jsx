import React, { useState } from "react";
import config from "../config";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const statesWithDistricts = {
  Maharashtra: [
    "Akola", "Amravati", "AHMEDNAGAR", "Bhandara", "BEED", "Buldhana", "Chandrapur",
    "Chhatrapati Sambhajinagar", "DHARASHIV", "DHULE", "Gadchiroli", "Gondia",
    "HINGOLI", "JALGAON", "JALNA", "KOLHAPUR", "LATUR", "MUMBAI SUBURBAN",
    "NANDED", "NANDURBAR", "NASHIK", "Nagpur", "PALGHAR", "PARBHANI", "PUNE",
    "RAIGAD", "RATNAGIRI", "SANGLI", "SATARA", "SINDHUDURG", "SOLAPUR", "THANE",
    "Wardha", "Washim", "Yavatmal",
  ],
};

const SoilLabs = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullscreen, setFullscreen] = useState(false);

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

  const downloadExcel = () => {
    if (labs.length === 0) {
      alert("No data available to download!");
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(labs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Soil Labs");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
    saveAs(data, "Soil_Labs_Report.xlsx");
    alert("Excel Report Downloaded Successfully!");
  };

  return (
    <>
      <div className="flex flex-col items-center px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-[#f5f9f3] to-[#e0eed8] min-h-screen">
        <h1 className="text-4xl font-bold text-center text-[#2F5233] mt-6">
          🌿 Locate Soil Testing Laboratory
        </h1>

        {/* State & District Selection */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="p-3 border rounded-lg w-64 bg-[#e0eed8] text-[#2F5233] shadow-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select State</option>
            {Object.keys(statesWithDistricts).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="p-3 border rounded-lg w-64 bg-[#e0eed8] text-[#2F5233] shadow-md focus:ring-2 focus:ring-green-500"
            disabled={!state}
          >
            <option value="">Select District</option>
            {(statesWithDistricts[state] || []).map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="bg-[#3B7A57] text-white px-6 py-3 rounded-lg hover:bg-[#2F5233] transition font-semibold shadow-md"
          >
            🔍 Search
          </button>
        </div>

        {/* Error & Loading Messages */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {loading && <p className="text-blue-600 text-center mt-4">Fetching data...</p>}

        {/* Table */}
        {labs.length > 0 && (
          <div className="w-full max-w-6xl mt-6 mb-10">
            <div className="flex justify-end gap-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={downloadExcel}>
                📥 Download PDF
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setFullscreen(!fullscreen)}
              >
                {fullscreen ? "↩ Exit Fullscreen" : "🔍 Fullscreen"}
              </button>
            </div>

            <div className={`overflow-auto ${fullscreen ? "fixed inset-0 bg-white z-50 p-4" : "mt-4"}`}>
              {fullscreen && (
                <button className="absolute top-4 right-4 text-xl" onClick={() => setFullscreen(false)}>✖</button>
              )}
              <table className="w-full border-collapse border border-[#2F5233] rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-[#3B7A57] text-white text-lg">
                    {["State", "District", "Lab Name", "Address", "Phone", "Email", "Location"].map((header) => (
                      <th key={header} className="p-3 border border-[#2F5233]">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {labs.map((lab, index) => (
                    <tr key={index} className="bg-[#f5f9f3] hover:bg-[#e0eed8] text-center border-t">
                      {Object.values(lab).map((value, i) => (
                        <td key={i} className="p-3 border border-[#2F5233]">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SoilLabs;
