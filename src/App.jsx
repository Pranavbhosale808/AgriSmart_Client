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
import SoilLabs from './pages/SoilLab'
import Footer from './components/ Footer'

function App() {
  return (
    <Router>
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
          path="/SoilLabs"
          element={<ProtectedRoute><SoilLabs /></ProtectedRoute>}
        />
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
