import React, { ChangeEvent } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import "./LoadAlert.css";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { MapObject } from "../data/SectionObject";

type Props = {
  title: string;
  message: string;
  close: () => void;
  isOpen: () => boolean;
};

const LoadAlert: React.FC<Props> = ({ title, message, close, isOpen }) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [JSONString, setJSONString] = useState<string>("{}");
  const dispatch = useDispatch();

  function ReadFile(newFile: File | null | undefined) {
    if (newFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const JSONData: JSON = JSON.parse(e.target?.result as string);
          let FormatData: any = new Map(Object.entries(JSONData));
          if (expectedFormat(FormatData)) {
            setFile(newFile);
            setJSONString(JSON.stringify(JSONData));
            alert("File loaded successfully!");
          } else {
            throw new Error("JSON is of incorrect format!");
          }
        } catch (error) {
          alert("Error parsing JSON: " + error);
        }
      }
      reader.readAsText(newFile);
    }
  }

  // Verify format of JSON object imported
  function expectedFormat(data: any): data is MapObject {
    for (const [key, value] of data) {
      if (
        typeof key !== "string" ||
        (key !== "NW" &&
          key !== "SW" &&
          key !== "SE" &&
          key !== "NE" &&
          key !== "APIRefresh") ||
        (typeof value !== "object" && typeof value !== "string")
      ) {
        console.log(typeof key, typeof value);
        return false;
      }
    }
    return true;
  }

  function ProcessDropFile(e: React.DragEvent) {
    // Prevent default behavior
    e.preventDefault();
    if (e.dataTransfer.items) {
      // Make list of items itiratable
      Array.from(e.dataTransfer.items).forEach((item) => {
        // Check if item is a file and is of type JSON then convert it to a file
        if (item.kind === "file" && item.type === "application/json") {
          const newFile: File | null | undefined = item.getAsFile();
          ReadFile(newFile);
        }
      });
    }
  }

  const LoadFile = (value: ChangeEvent<HTMLDivElement>) => {
    if (value.target) {
      const newFile:
        | File
        | null
        | undefined = (value.target as HTMLInputElement).files?.item(0);
      ReadFile(newFile);
    }
  };

  const HandleSubmit = () => {
    if (file !== null) {
      let JSONObj: MapObject = new Map(Object.entries(JSON.parse(JSONString)));
      dispatch({
        type: `APIRefresh/${JSONObj.get("APIRefresh")}`,
        payload: JSONObj.get("APIRefresh"),
      });
      localStorage.setItem("boardObject", JSONString);
      window.location.reload();
    } else {
      alert("File not loaded!");
    }
  };

  return (
    <Dialog
      open={isOpen()}
      onClose={() => close()}
      PaperProps={{
        sx: {
          backgroundColor: "var(--background)",
          color: "var(--header)",
          padding: "2em",
          fontFamily: "Open Sans",
        },
      }}
    >
      <h2>{title}</h2>
      {message}
      <div className="uploadGroupStyles" onDrop={(e) => ProcessDropFile(e)} onDragOver={(e) => e.preventDefault()}>
        <div className="uploadButton" >
          <Button
            style={{ width: "100%", height: "100%" }}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {!file ? (
              <FileUploadIcon style={{ color: "rgba(255, 255, 255, 0.2)" }} />
            ) : null}
            <p>{file?.name}</p>
          </Button>
          <input
            id="fileInput"
            type="file"
            accept=".json"
            onChange={(value) => LoadFile(value)}
          />
        </div>
        <div className="buttonContainer">
          <Button onClick={() => HandleSubmit()}>SUBMIT</Button>
          <Button onClick={close}>CANCEL</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default LoadAlert;
