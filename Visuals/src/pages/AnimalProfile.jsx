import { Card, CardContent } from "@/components/ui/card";

export function AnimalProfile({ name, species, status, description, imageUrl }) {
  return (
    <Card className="overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" loading="lazy"/>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          <span className="font-medium">Species:</span> {species}
        </p>
        <div className="mb-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              status === "Endangered"
                ? "bg-destructive/10 text-destructive"
                : status === "Vulnerable"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
