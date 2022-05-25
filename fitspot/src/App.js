// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import About from "./pages/About/About"
import Exercise from "./pages/Exercise/Exercsie"
import GymsParks from "./pages/GymsParks/GymsParks"
import Weather from "./pages/Weather/Weather"
import WeightTracker from "./pages/WeightTracker/WeightTracker"


// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/Homepage"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>

          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/weather" element={<PrivateRoute><Weather /></PrivateRoute>} />
        <Route path="/exercise" element={<PrivateRoute><Exercise /></PrivateRoute>} />
        <Route path="/weighttracker" element={<PrivateRoute><WeightTracker /></PrivateRoute>} />
        <Route path="/gymsparks" element={<PrivateRoute><GymsParks /></PrivateRoute>} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
