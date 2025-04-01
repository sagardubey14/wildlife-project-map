import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "../../context/userContext";
import { Loader2 } from "lucide-react";
import { useDash } from "../../context/dashContext";

export default function FileUploadComponent({
  status,
  clickedMark,
  locations,
  socketInstance,
  setStatus,
}) {
  const [selection, setSelection] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [done, setDone] = useState(false);
  const { user } = useUser();
  const {animalData, setAnimalData} = useDash();
  
  const handleSelectionChange = (value) => {
    setSelection(value);
    setImageFile(null);
    setAudioFile(null);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    socketInstance.emit('stop_interval');
    const formData = new FormData();

    if (selection === "animal") {
      formData.append("image", imageFile);
    } else if (selection === "gun" || selection === "both") {
      formData.append("audio", audioFile);
      formData.append("image", imageFile);
    }

    try {
      const newStatus = {
        ...status,
        [clickedMark]: {
          ...status[clickedMark],
          loading: true,
        },
      };

      setStatus(newStatus);

      formData.append("type", selection);
      formData.append("source", clickedMark);

      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      let msg = "";

      if (data.animal !== "No" && data.gunshot === "Yes") {
        msg = `${data.animal} seen at ${data.time}\nGunshot detected`;
      } else if (data.animal !== "No" && data.gunshot === "No") {
        msg = `${data.animal} seen at ${data.time}`;
      } else if (data.animal === "No" && data.gunshot === "Yes") {
        msg = "Gunshot detected";
      } else {
        msg = "on stand by";
      }

      const afterReqStatus = {
        ...status,
        [clickedMark]: {
          msg,
          type:
            data.gunshot === "Yes"
              ? "red"
              : data.animal !== "No"
              ? "green"
              : "blue",
          loading: false,
        },
      };
      setStatus(afterReqStatus);
      setDone(true);
      if (response.ok) {
        console.log("File uploaded successfully", data);
        console.log(modifyData(data));
        setAnimalData(animal=>[...animal,modifyData(data) ])
      } else {
        console.error("Error uploading file:", data);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      const newStatus = {
        ...status,
        [clickedMark]: {
          ...status[clickedMark],
          loading: false,
        },
      };
      setStatus(newStatus);
    } finally {
      setAudioFile(null);
      setImageFile(null);
      socketInstance.emit('start_interval');
    }
  };

  function modifyData(data) {
    return {
      date: formatDate(data.date),
      time: data.time,
      datasource: "datasource" + data.datasource,
      animal: data.animal,
      gunshot: data.gunshot,
      week: data.week.toString(),
    };
  }

  function formatDate(date) {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  }

  return (
    <Card className="w-full max-w-md bg-background text-foreground border border-border shadow-md">
      <Label className=" whitespace-pre-line flex items-center justify-center min-w-[180px]">
        {status[clickedMark].msg}
      </Label>
      {status[clickedMark].loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        user &&
        !done && (
          <CardContent>
            <Label className="mb-2 block text-sm font-medium text-muted-foreground">
              Select an option:
            </Label>
            <RadioGroup onValueChange={handleSelectionChange} defaultValue="">
              <div className="flex gap-4">
                <Label className="flex items-center gap-2 text-foreground">
                  <RadioGroupItem
                    value="animal"
                    checked={selection === "animal"}
                  />{" "}
                  Animal
                </Label>
                <Label className="flex items-center gap-2 text-foreground">
                  <RadioGroupItem value="gun" checked={selection === "gun"} />{" "}
                  Gun
                </Label>
                <Label className="flex items-center gap-2 text-foreground">
                  <RadioGroupItem value="both" checked={selection === "both"} />{" "}
                  Both
                </Label>
              </div>
            </RadioGroup>

            <div className="mt-4 space-y-3">
              {(selection === "animal" ||
                selection === "both" ||
                selection === "gun") && (
                <div>
                  <Label className="text-foreground">Upload Image:</Label>
                  {!imageFile && (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "image")}
                    />
                  )}
                  {imageFile && (
                    <p className="text-sm text-muted-foreground mt-1 flex justify-between">
                      📸 {imageFile.name}{" "}
                      {
                        <button
                          className="ml-auto"
                          onClick={() => setImageFile(null)}
                        >
                          X
                        </button>
                      }{" "}
                    </p>
                  )}
                </div>
              )}

              {(selection === "gun" || selection === "both") && (
                <div>
                  <Label className="text-foreground">Upload Audio:</Label>
                  {!audioFile && (
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleFileUpload(e, "audio")}
                    />
                  )}
                  {audioFile && (
                    <p className="text-sm text-muted-foreground mt-1 flex justify-between">
                      🎵 {audioFile.name}{" "}
                      {
                        <button
                          className="ml-auto"
                          onClick={() => setAudioFile(null)}
                        >
                          X
                        </button>
                      }{" "}
                    </p>
                  )}
                </div>
              )}
            </div>
            <Button className="w-full mt-4" onClick={handleSubmit}>
              Submit
            </Button>
          </CardContent>
        )
      )}
    </Card>
  );
}
