import React, { useEffect, useState } from "react";

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
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Fetch the farmer's name from localStorage
    const storedName = localStorage.getItem("farmerName") || "Farmer";
    setFarmerName(storedName);

    // Cycle through greetings smoothly
    let index = 0;
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        index = (index + 1) % greetings.length;
        setCurrentGreeting(greetings[index]);
        setFade(false);
      }, 500);
    }, 2500); // Change greeting every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-green-100 text-center">
      {/* Animated Greeting and Name on One Line */}
      <h1 className={`text-3xl mt-50 font-bold transition-opacity duration-500 flex gap-2 ${fade ? "opacity-0" : "opacity-100"}`}>
        {currentGreeting.text}, <span className="text-blue-700">{farmerName}!</span>
      </h1>
    </div>
  );
};

export default Profile;
