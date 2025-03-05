import { useState, useEffect } from 'react'
import './App.css'
import GunshotTrends from './Components/gunshotTrends/GunshotTrends'
import Gunshot from './Components/gunshotTrends/Gunshot'
import { transformCSVData, filterDataByTime } from "./Components/dataTransform";

function App() {
  const [chartData, setChartData] = useState(null);
  const [timeFilter, setTimeFilter] = useState("daily"); // Default: Daily

  useEffect(() => {
    fetch("/animal_data.csv")
      .then((response) => response.text())
      .then((csvData) => {
        // console.log(csvData);
        const transformedData = transformCSVData(csvData);
        setChartData(filterDataByTime(transformedData, timeFilter));
        console.log(chartData);
      });
  }, [timeFilter]); // Refetch when filter changes

  return (
    <>
      <p className="text-3xl font-bold underline">
        Click on the Vite and React logos to learn more
      </p>
      <h1>Wildlife Analytics</h1>

      <label>View Data:</label>
      <select onChange={(e) => setTimeFilter(e.target.value)} value={timeFilter}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      {chartData?
      <>
      <Gunshot data={chartData.gunshotsOverTime}/>
      <GunshotTrends />
      </>:
      <p>Loading data...</p>
      }
      
    </>
  )
}

export default App
