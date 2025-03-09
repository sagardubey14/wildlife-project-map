import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, Activity, AlertTriangle, Eye } from "lucide-react";
import * as d3 from 'd3';
import Visuals from "./Visuals";
import { dataSourceCount, generateAnimalDatasourceSummary } from "../Components/dataTransform";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [csvData, setCsvData] = useState();
  const [selectedDataset, setSelectedDataset] = useState("ALL");
  const [chartData, setChartData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("daily");
  const [dataCount, setDataCount] = useState();
  const [animalRadar, setAnimalRadar] = useState();

  const [summary, setSummary] = useState({
    totalDetections:0,
    threatCount:0,
    animalCount:0
  })

  const reducer = (acc, current)=>{
    if (current.gunshot === "Yes") {
      acc.threatCount += 1;
    }
    if (current.animal !== "No") {
      acc.animalCount += 1;
    }
    return acc;
  }

  function chartAndSummary(data){

    setChartData(data);
    
    const totalDetections = data.length;
    const initialValue = {
      threatCount: 0,
      animalCount: 0
    };
    const result = data.reduce(reducer, initialValue);
    // console.log(result);
    
    setSummary({totalDetections, ...result})
  }

  function logMemoryUsage() {
    if (performance.memory) {
      console.log("Memory Used: " + performance.memory.usedJSHeapSize / (1024 * 1024) + " MB");
      console.log("Total Memory: " + performance.memory.totalJSHeapSize / (1024 * 1024) + " MB");
      console.log("Memory Limit: " + performance.memory.jsHeapSizeLimit / (1024 * 1024) + " MB");
    } else {
      console.log("Memory API not supported in this browser.");
    }
  }
  useEffect(() => {
    const cachedData = localStorage.getItem('animalData');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setCsvData(parsedData);
      chartAndSummary(parsedData);
      setDataCount(dataSourceCount(parsedData));
      setAnimalRadar(generateAnimalDatasourceSummary(parsedData));
    } else {
      d3.csv("/animal_data.csv")
        .then((data) => {
          localStorage.setItem('animalData', JSON.stringify(data)); // Cache data
          console.log(data[0]);
          setCsvData(data);
          chartAndSummary(data);
          setDataCount(dataSourceCount(data));
          setAnimalRadar(generateAnimalDatasourceSummary(data));
        })
        .catch((error) => console.error("Error fetching CSV:", error));
    }
    logMemoryUsage();
    return () => {
      localStorage.removeItem('animalData');
    };
  }, []);
  
  useEffect(()=>{
    if(!csvData) return;
    if(selectedDataset === "ALL")
      chartAndSummary(csvData)
    else{
      chartAndSummary(csvData.filter(data=> data.datasource === `datasource${selectedDataset.charAt(2)}`));
    }
  },[selectedDataset])

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Wildlife Analytics Dashboard</h1>
        
        {/* Navbar */}
        <div className="mb-6 flex space-x-4 border-b pb-2 text-lg font-medium">
          {["ALL", "DS1", "DS2", "DS3", "DS4"].map((dataset) => (
            <button
              key={dataset}
              className={`px-4 py-2 ${selectedDataset === dataset ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
              onClick={() => setSelectedDataset(dataset)}
            >
              {dataset}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Detections</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalDetections}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.threatCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wildlife Sightings</CardTitle>
              <Eye className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.animalCount}</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
        <label htmlFor="timeframe" className="text-lg font-medium text-gray-700">Select Timeframe:</label>
        <DropdownMenu>
        <DropdownMenuTrigger className="p-2 mx-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Open
        </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Time Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>setSelectedTimeframe('daily')}>Daily</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setSelectedTimeframe('weekly')}>Weekly</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setSelectedTimeframe('monthly')}>Monthly</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>alert("The data is not sufficient")}>Yearly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div> 
      </div>
      <Visuals data={chartData} filter={selectedTimeframe} dataSources={dataCount} animalRadar={animalRadar}/>
    </div>
  );
}
