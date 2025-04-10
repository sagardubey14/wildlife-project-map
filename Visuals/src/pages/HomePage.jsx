// import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimalProfile } from "./AnimalProfile";

const animalProfiles = [
  {
    name: "African Elephant",
    species: "Loxodonta africana",
    status: "Vulnerable",
    description:
      "The largest living land animal, known for their intelligence and complex social structures.",
    imageUrl: "/images/home1.webp",
  },
  {
    name: "Bengal Tiger",
    species: "Panthera tigris tigris",
    status: "Endangered",
    description:
      "One of the largest wild cats native to the Indian subcontinent.",
    imageUrl: "/images/home2.webp",
  },
  {
    name: "Mountain Gorilla",
    species: "Gorilla beringei beringei",
    status: "Endangered",
    description:
      "These gentle giants share 98% of their DNA with humans and live in mountainous forests.",
    imageUrl: "/images/home3.webp",
  },
];

export default function HomePage() {
  // const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Wildlife Watch</h1>
          <p className="text-muted-foreground text-lg">
            Protecting wildlife through innovative technology and conservation efforts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardContent className="p-6">
              <img
                src="/images/home4.webp"
                alt="Wildlife monitoring"
                className="w-full h-48 object-cover rounded-lg mb-4"
               loading="lazy"
              />
              <h2 className="text-xl font-semibold mb-2">Wildlife Monitoring</h2>
              <p className="text-muted-foreground mb-4">
                Advanced ML-powered detection system for tracking wildlife movement
              </p>
              <Link to="/map">
                <Button className="w-full">View Map</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <img
                src="/images/home5.webp"
                alt="Conservation efforts"
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
              />
              <h2 className="text-xl font-semibold mb-2">Conservation Efforts</h2>
              <p className="text-muted-foreground mb-4">
                Dedicated to preserving natural habitats and protecting endangered species
              </p>
              <Link to="/work">
                <Button className="w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <img
                src="/images/home6.webp"
                alt="Research initiatives"
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
              />
              <h2 className="text-xl font-semibold mb-2">Research Initiatives</h2>
              <p className="text-muted-foreground mb-4">
                Cutting-edge research to understand and protect wildlife populations
              </p>
              <Link to="/about">
                <Button className="w-full">About Us</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Wildlife</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animalProfiles.map((animal) => (
              <AnimalProfile key={animal.name} {...animal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
