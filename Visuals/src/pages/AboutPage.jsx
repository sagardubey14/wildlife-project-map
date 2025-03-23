import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About Wildlife Watch</h1>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                Wildlife Watch is dedicated to protecting wildlife through innovative technology 
                and conservation efforts. We combine cutting-edge ML models with on-ground 
                monitoring to create a comprehensive wildlife protection system.
              </p>
              <img
                src="/images/about1.webp"
                alt="Wildlife"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Technology</h2>
              <p className="text-muted-foreground mb-4">
                Our system uses advanced ML models to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Detect and track wildlife movement</li>
                <li>Identify potential threats through image analysis</li>
                <li>Monitor audio for suspicious activities</li>
                <li>Provide real-time alerts to authorities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Conservation Impact</h2>
              <p className="text-muted-foreground mb-4">
                By combining technology with traditional conservation methods, we've created
                a more effective system for protecting wildlife and their habitats.
              </p>
              <img
                src="/images/about2.webp"
                alt="Conservation"
                className="w-full h-64 object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
