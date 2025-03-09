import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FileUploadComponent({msg}) {
  const [selection, setSelection] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  // Handle selection change
  const handleSelectionChange = (value) => {
    setSelection(value);
    setImageFile(null);
    setAudioFile(null);
  };

  // Handle file uploads
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "image" && file.type.startsWith("image/")) {
        setImageFile(file);
      } else if (type === "audio" && file.type.startsWith("audio/")) {
        setAudioFile(file);
      } else {
        alert(`Please upload a valid ${type} file!`);
      }
    }
  };

  return (
    <Card className="w-full max-w-md bg-background text-foreground border border-border shadow-md">
        <Label className="pl-5">{msg}</Label>
      <CardContent>
        <Label className="mb-2 block text-sm font-medium text-muted-foreground">Select an option:</Label>
        <RadioGroup onValueChange={handleSelectionChange} defaultValue="">
          <div className="flex gap-4">
            <Label className="flex items-center gap-2 text-foreground">
              <RadioGroupItem value="animal" checked={selection === "animal"} /> Animal
            </Label>
            <Label className="flex items-center gap-2 text-foreground">
              <RadioGroupItem value="gun" checked={selection === "gun"} /> Gun
            </Label>
            <Label className="flex items-center gap-2 text-foreground">
              <RadioGroupItem value="both" checked={selection === "both"} /> Both
            </Label>
          </div>
        </RadioGroup>

        <div className="mt-4 space-y-3">
          {(selection === "animal" || selection === "both" || selection === "gun") && (
            <div>
              <Label className="text-foreground">Upload Image:</Label>
              {!imageFile && <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} />}
              {imageFile && <p className="text-sm text-muted-foreground mt-1">📸 {imageFile.name}</p>}
            </div>
          )}

          {(selection === "gun" || selection === "both") && (
            <div>
              <Label className="text-foreground">Upload Audio:</Label>
              {!audioFile &&<Input type="file" accept="audio/*" onChange={(e) => handleFileUpload(e, "audio")} />}
              {audioFile && <p className="text-sm text-muted-foreground mt-1">🎵 {audioFile.name}</p>}
            </div>
          )}
        </div>

        <Button className="w-full mt-4">Submit</Button>
      </CardContent>
    </Card>
  );
}
