"use client";
import React, { useState } from "react";
import fetchImages from "../components/resultDisplay";

const ModelSelect = ({
  setLoading,
  setWaiting,
  setShowResults,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setWaiting: React.Dispatch<React.SetStateAction<boolean>>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedModel, setSelectedModel] = useState<string>("");

  const handleModelSelect = async (model: string) => {
    setSelectedModel(model);

    try {
      // Send the selected model to the internal API route
      const response = await fetch("/api/sendModelData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Model sent successfully:", data);
        setLoading(false); // Stop the loading animation
        setWaiting(false); // Stop the waiting animation
      } else {
        console.error("Error sending model to backend:", await response.json());
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending model to backend:", error);
    }
  };

  const handleRunModel = async () => {
    if (!selectedModel) {
      alert("Please select a model first!");
      return;
    }

    try {
      // Send a command to the backend to run the selected model
      setLoading(true);
      setWaiting(false);
      setShowResults(false);
      const response = await fetch("/api/runModel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: selectedModel }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Model run successfully:", data);
        setLoading(false);
        setWaiting(false);
      } else {
        setLoading(false);
        console.error("Error running model:", await response.json());
      }
    } catch (error) {
      setLoading(false);
      console.error("Error running model:", error);
    }
  };

  return (
    <div className="flex flex-row items-start gap-40">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn py-6 px-15 outline-1">
          Models
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-b rounded-r w-52 p-2"
        >
          <li>
            <a onClick={() => handleModelSelect("ResNET34-25")}>
              ResNet34 - 25
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET34-50")}>
              ResNet34 - 50
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET34-75")}>
              ResNet34 - 75
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET34-100")}>
              ResNet34 - 100
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-25")}>
              ResNet50 - 25
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-50")}>
              ResNet50 - 50
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-75")}>
              ResNet50 - 75
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-100")}>
              ResNet50 - 100
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-25")}>
              ResNet101 - 25
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-50")}>
              ResNet101 - 50
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-75")}>
              ResNet101 - 75
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-100")}>
              ResNet101 - 100
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          className="btn py-5 px-20 border-2 outline-1 border-base-300 hover:shadow-md"
          onClick={() => {
            handleRunModel();
            fetchImages();
          }} // Trigger the run model function
        >
          Test Model
        </button>
        {selectedModel && (
          <p className="mt-4">Selected Model: {selectedModel}</p>
        )}
      </div>
    </div>
  );
};

export default ModelSelect;
