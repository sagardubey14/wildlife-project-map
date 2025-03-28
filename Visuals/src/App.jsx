import { BrowserRouter as Router, Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Auth from './pages/Auth';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import MapPage from './pages/MapPage';
import DashboardPage from './pages/Dashboard';
import 'leaflet/dist/leaflet.css';
import { UserProvider } from "./context/userContext";
import ForReview from "./pages/ForReview";
import { DashProvider } from "./context/dashContext";


export default function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/auth" && location.pathname !== "/review" ;

  return (
    <UserProvider>
    <ThemeProvider>
    <DashProvider>
    {showNavbar && <Navbar />}
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/review" element={<ForReview />} />
    </Routes>
    </DashProvider>
    </ThemeProvider>
    </UserProvider>
  );
}
