import { Card, CardContent } from "@/components/ui/card";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Our Work</h1>

          <div className="grid gap-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Wildlife Detection</h2>
                <img
                  src="https://images.unsplash.com/photo-1700048614554-a20ac206a49e"
                  alt="Wildlife detection"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground">
                  Our ML models analyze images and audio from various sensors placed
                  throughout protected areas to track wildlife movement and detect
                  potential threats.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Threat Prevention</h2>
                <img
                  src="https://images.unsplash.com/photo-1542296803-f4937a45e46b"
                  alt="Conservation"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground">
                  Advanced audio and image processing helps detect potential threats
                  like gunshots or unauthorized human activity, allowing for rapid
                  response from authorities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
                <img
                  src="https://images.unsplash.com/photo-1669812857594-466cab3b6eda"
                  alt="Data collection"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground">
                  Our network of sensors provides valuable data for research and
                  conservation efforts, helping us better understand and protect
                  wildlife populations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
