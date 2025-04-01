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
import Visuals from "./Visuals";
import { dataSourceCount, generateAnimalDatasourceSummary } from "../Components/dataTransform";
import { useUser } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { useDash } from "../context/dashContext";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const {animalData, setAnimalData} = useDash();
  const [selectedDataset, setSelectedDataset] = useState("ALL");
  const [chartData, setChartData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("daily");
  const [dataCount, setDataCount] = useState();
  const [animalRadar, setAnimalRadar] = useState();
  const {user} = useUser();

  if(!user){
    return <Navigate to="/" />;
  }

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

    setSummary({totalDetections, ...result})
  }
  
  useEffect(()=>{
    if(!animalData) return;
    chartAndSummary(animalData);
    setDataCount(dataSourceCount(animalData));
    setAnimalRadar(generateAnimalDatasourceSummary(animalData));
    console.log(animalData.length);
    if(selectedDataset === "ALL")
      chartAndSummary(animalData)
    else{
      chartAndSummary(animalData.filter(data=> data.datasource === `datasource${selectedDataset.charAt(2)}`));
    }
  },[selectedDataset, animalData])

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
    <div className="min-h-screen bg-background px-4">
      <div className="container mx-auto">
        {/* <h1 className="text-4xl font-bold mb-4">Wildlife Analytics Dashboard</h1> */}
        
        {/* Navbar */}
        <div className="mb-2 flex space-x-4 border-b py-2 text-lg font-medium">
          {["ALL", "DS1", "DS2", "DS3", "DS4"].map((dataset) => (
            <button
              key={dataset}
              className={`px-4 ${selectedDataset === dataset ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
              onClick={() => setSelectedDataset(dataset)}
            >
              {dataset}
            </button>
          ))}
        <div className="px-4">
        <DropdownMenu>
        <DropdownMenuTrigger className="px-2 text-lg">
        Timeframe
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
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium flex">Total Detections <Activity className="ml-2 mt-1 h-4 w-4 text-muted-foreground" /></CardTitle>
              <div className="text-2xl font-bold">{summary.totalDetections}</div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium flex">Threats Detected <AlertTriangle className="ml-2 mt-0.5 h-4 w-4 text-destructive" /></CardTitle>
              <div className="text-2xl font-bold">{summary.threatCount}</div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium flex">Wildlife Sightings <Eye className="ml-2 mt-1 h-4 w-4 text-primary" /></CardTitle>
              <div className="text-2xl font-bold">{summary.animalCount}</div>
            </CardHeader>
          </Card>
        </div> 
        
      </div>
      <Visuals data={chartData} filter={selectedTimeframe} dataSources={dataCount} animalRadar={animalRadar}/>
    </div>
  );
}
