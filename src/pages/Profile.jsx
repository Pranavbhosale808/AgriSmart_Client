  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Trash2 } from "lucide-react";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

  const greetings = [
    { lang: "Hindi", text: "स्वागत है" },
    { lang: "Marathi", text: "स्वागत आहे" },
    { lang: "Bengali", text: "স্বাগতম" },
    { lang: "Gujarati", text: "સ્વાગત છે" },
    { lang: "Tamil", text: "வரவேற்கிறோம்" },
    { lang: "Telugu", text: "స్వాగతం" },
    { lang: "Kannada", text: "ಸ್ವಾಗತ" },
    { lang: "Malayalam", text: "സ്വാഗതം" },
    { lang: "Punjabi", text: "ਸੁਆਗਤ ਹੈ" },
    { lang: "Urdu", text: "خوش آمدید" },
  ];

  const Profile = () => {
    const [farmerName, setFarmerName] = useState("Farmer");
    const [favoriteCrops, setFavoriteCrops] = useState([]);
    const [activeTab, setActiveTab] = useState("crop");
    const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
    const [fade, setFade] = useState(false);

    useEffect(() => {
      const storedName = localStorage.getItem("farmerName") || "Farmer";
      setFarmerName(storedName);

      let index = 0;
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          index = (index + 1) % greetings.length;
          setCurrentGreeting(greetings[index]);
          setFade(false);
        }, 500);
      }, 2500);

      const fetchFavorites = async () => {
        
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/get_favourite/${storedName}/`);
          console.log(response.data);
          
          setFavoriteCrops(response.data);
        } catch (error) {
          console.error("Error fetching crops:", error);
        }
      };

      fetchFavorites();
      return () => clearInterval(interval);
    }, []);

    const handleDelete = async (cropName, createdDate) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/delete_favourite/${farmerName}/${cropName}/${createdDate}/`
        );

        if (response.status === 200) {
          setFavoriteCrops((prevCrops) => prevCrops.filter((crop) => crop.crop_name !== cropName || crop.created_at !== createdDate));
          toast.success(`${cropName} removed from favorites!`, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error) {
        console.error("Error deleting crop:", error.response?.data || error.message);
        toast.error("Failed to delete crop. Try again.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };

    // Helper function to format created_at date
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString(); // You can adjust the format as needed
    };

    const renderUserEnteredValues = (values) => {
      if (!values || typeof values !== "object") return "No data";
      return (
        <table className="min-w-full border rounded-md text-sm">
          <tbody>
            {Object.entries(values).map(([key, value], idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2 font-semibold text-gray-700">{key}</td>
                <td className="px-4 py-2 text-gray-600">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };

    return (
      <div className="flex flex-col items-start justify-start min-h-screen bg-green-100 p-6 text-left">
        <h1 className={`text-2xl mt-15 font-bold transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
          {currentGreeting.text}, <span className="text-blue-700">{farmerName}!</span>
        </h1>

        <div className="flex space-x-4 mt-6 border-b-2 pb-2">
          <button
            className={`px-4 py-2 text-lg font-semibold ${activeTab === "crop" ? "text-green-600 border-b-4 border-green-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("crop")}
          >
            🌱 Crops
          </button>
          <button
            className={`px-4 py-2 text-lg font-semibold ${activeTab === "fertilizer" ? "text-green-600 border-b-4 border-green-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("fertilizer")}
          >
            🌾 Fertilizers
          </button>
        </div>

        {activeTab === "crop" && (
          <div className="mt-6 w-full overflow-x-auto">
            {favoriteCrops.length > 0 ? (
              <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
                <thead className="bg-green-500 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Serial No</th>
                    <th className="px-6 py-3 text-left">Crop Name (Translation)</th>
                    <th className="px-6 py-3 text-left">Created Time</th>
                    <th className="px-6 py-3 text-left">User Entered Value</th>
                    <th className="px-6 py-3 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {favoriteCrops.map((crop, index) => (
                    <tr key={index} className="hover:bg-green-100 transition-colors">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{crop.crop_name} ({crop.crop_translation})</td>
                      <td className="px-6 py-4">{formatDate(crop.created_at)}</td>
                      <td className="px-6 py-4">
                      {renderUserEnteredValues(crop.user_entered_values)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(crop.crop_name, crop.created_at)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 mt-4">No favorite crops saved yet.</p>
            )}
          </div>
        )}

        <ToastContainer />
      </div>
    );
  };

  export default Profile;
