import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
// import { useAuth } from "@/hooks/use-auth";

export default function MapPage() {
//   const { user } = useAuth();
    const user = 'admin';
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Static detections for now
  const detections = [
    {
      id: 1,
      type: "wildlife",
      description: "Elephant spotted near riverbank",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: "threat",
      description: "Gunshot detected in sector 3",
      timestamp: new Date().toISOString(),
    },
  ];

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
                    <p className="text-muted-foreground">
                      Map visualization will be implemented here
                    </p>
                  </div>

                  {user?.role === "admin" && (
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">Recent Detections</h2>
                      <div className="space-y-2">
                        {detections.map((detection) => (
                          <div
                            key={detection.id}
                            className={`p-4 rounded-lg flex justify-between ${
                              detection.type === "threat"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-muted"
                            }`}
                          >
                            <div>
                              <p className="font-medium">
                                {detection.type === "threat" && "⚠️ "}
                                {detection.type}
                              </p>
                              <p
                                className={`text-sm ${
                                  detection.type === "threat"
                                    ? "text-destructive/80"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {detection.description}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(detection.timestamp).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
