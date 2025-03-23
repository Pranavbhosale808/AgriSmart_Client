import React, { useState } from "react";

const MarketDataPage = () => {
  const [formData, setFormData] = useState({
    state: "Maharashtra",
    district: "Nagpur",
    commodity: "Jowar(Sorghum)",
    arrival_date: "2024-03-01",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setData([]);
    const commodity = localStorage.getItem("selectedCrop");

      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "/"); // DD/MM/YYYY format
    

    const { state, district} = formData;
    const apiUrl = `http://127.0.0.1:8000/api/market-price/?state=${state}&district=${district}&commodity=${commodity}`;
    console.log("URL: ",apiUrl);
    console.log("Crop:",commodity);
    console.log("District:",district);
    console.log("Arrival_date:",formattedDate);
    
    

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok && result.records) {
        setData(result.records);
      } else {
        setError("No data found or API error.");
      }
    } catch (err) {
      setError("Error fetching data.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Market Data Search</h2>

      {/* Input Fields */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="District"
          className="p-2 border rounded"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={fetchData}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>

      {/* Loading State */}
      {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Data Table */}
      {data.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border p-2">State</th>
                <th className="border p-2">District</th>
                <th className="border p-2">Market</th>
                <th className="border p-2">Commodity</th>
                <th className="border p-2">Min Price</th>
                <th className="border p-2">Max Price</th>
                <th className="border p-2">Modal Price</th>
                <th className="border p-2">Arrival Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.State || "N/A"}</td>
                  <td className="border p-2">{item.District || "N/A"}</td>
                  <td className="border p-2">{item.Market || "N/A"}</td>
                  <td className="border p-2">{item.Commodity || "N/A"}</td>
                  <td className="border p-2">{item.Min_Price || "N/A"}</td>
                  <td className="border p-2">{item.Max_Price || "N/A"}</td>
                  <td className="border p-2">{item.Modal_Price || "N/A"}</td>
                  <td className="border p-2">{item.Arrival_Date || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Data Message */}
      {data.length === 0 && !loading && !error && (
        <p className="text-center text-gray-600 mt-4">No data available.</p>
      )}
    </div>
  );
};

export default MarketDataPage;
