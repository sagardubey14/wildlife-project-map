import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Activity, AlertTriangle, Eye } from "lucide-react";

// import { AlertTestPanel } from "@/components/alert-test-panel";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState("ALL");
  
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  const detections = [
    { id: 1, type: "threat", description: "Poacher detected", timestamp: Date.now() - 1000000 },
    { id: 2, type: "animal", description: "Elephant spotted", timestamp: Date.now() - 500000 },
    { id: 3, type: "threat", description: "Fire detected", timestamp: Date.now() - 200000 },
    { id: 4, type: "animal", description: "Tiger spotted", timestamp: Date.now() - 300000 },
    { id: 5, type: "animal", description: "Deer spotted", timestamp: Date.now() - 700000 },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totalDetections = detections.length;
  const threatCount = detections.filter(d => d.type === 'threat').length;
  const animalCount = detections.filter(d => d.type === 'animal').length;

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
              <div className="text-2xl font-bold">{totalDetections}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threats Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{threatCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wildlife Sightings</CardTitle>
              <Eye className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{animalCount}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
