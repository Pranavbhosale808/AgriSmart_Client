import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import CropRecommendation from "./pages/CropRecommendation";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import CropYieldPrediction from "./pages/ CropYieldPrediction";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import MarketDataPage from "./pages/MarketDataPage"


function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/crop-recommendation"
          element={<ProtectedRoute><CropRecommendation /></ProtectedRoute>}
        />
        <Route
          path="/fertilizer-recommendation"
          element={<ProtectedRoute><FertilizerRecommendation /></ProtectedRoute>}
        />
        <Route
          path="/crop-yield-prediction"
          element={<ProtectedRoute><CropYieldPrediction /></ProtectedRoute>}
        />
        <Route
          path="/Profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route
          path="/market-data"
          element={<ProtectedRoute><MarketDataPage /></ProtectedRoute>}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
