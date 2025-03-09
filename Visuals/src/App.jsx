import { BrowserRouter as Router, Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Auth from './pages/Auth';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import MapPage from './pages/MapPage';
import DashboardPage from './pages/Dashboard';

export default function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/auth";

  return (
    <ThemeProvider>
    {showNavbar && <Navbar />}
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
    </ThemeProvider>
  );
}


// const [chartData, setChartData] = useState(null);
  // const [timeFilter, setTimeFilter] = useState("daily"); // Default: Daily

  // useEffect(() => {
  //   fetch("/animal_data.csv")
  //     .then((response) => response.text())
  //     .then((csvData) => {
  //       // console.log(csvData);
  //       const transformedData = transformCSVData(csvData);
  //       setChartData(filterDataByTime(transformedData, timeFilter));
  //       console.log(chartData);
  //     });
  // }, [timeFilter]); // Refetch when filter changes