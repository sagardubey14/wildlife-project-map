import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Map from "./Map/Map";

export default function MapPage() {
  const user = "admin";
  const [isLoading, setIsLoading] = useState(true);

  const position = [19.22882507715023, 72.93651580810548];
  const zoomLevel = 13;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            {user?.role === "admin" ? "Admin Map" : "Wildlife Map"}
          </h1>

          <Card>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="h-[600px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
                    <Map position={position} zoomLevel={zoomLevel} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
