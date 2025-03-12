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
import Map from "./pages/Map/Map";
import FileUploadComponent from "./pages/Map/FileUploadComponent";
import { UserProvider } from "./context/userContext";


export default function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/auth";

  return (
    <UserProvider>
    <ThemeProvider>
    {showNavbar && <Navbar />}
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
    </ThemeProvider>
    </UserProvider>
  );
}
