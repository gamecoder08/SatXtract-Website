"use client";
<<<<<<< HEAD
<<<<<<< HEAD
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
    <div className="flex flex-col gap-2 pl-15">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1 px-20 outline-1">
=======
=======
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
import React from "react";

const modelSelect = () => {
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1 px-15 outline-1">
<<<<<<< HEAD
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
          Models
        </div>
        <ul
          tabIndex={0}
<<<<<<< HEAD
<<<<<<< HEAD
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl"
        >
          <li>
            <a onClick={() => handleModelSelect("ResNET34-25")}>
              ResNET34 - 25
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET34-50")}>
              ResNET34 - 50
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET34-75")}>
              ResNET34 - 75
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET34-100")}>
              ResNET34 - 100
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-25")}>
              ResNET50 - 25
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-50")}>
              ResNET50 - 50
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-75")}>
              ResNET50 - 75
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-100")}>
              ResNET50 - 100
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-25")}>
              ResNET101 - 25
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-50")}>
              ResNET101 - 50
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-75")}>
              ResNET101 - 75
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-100")}>
              ResNET101 - 100
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-50">
        {selectedModel && (
          <div className="flex flex-col items-center justify-center mt-5">
            <p className="mt-4">Selected Model: {selectedModel}</p>
            <button
              className="btn mt-4 py-2 px-10 border-2 border-gray-300 hover:shadow-md"
              onClick={() => {
                handleRunModel();
                fetchImages();
              }} // Trigger the run model function
            >
              Test Model
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSelect;
=======
=======
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-md"
        >
          <li>
            <a>ResNET34 - 25</a>
          </li>
          <li>
            <a>ResNET50 - 25</a>
          </li>
          <li>
            <a>ResNET34 - 50</a>
          </li>
          <li>
            <a>ResNET50 - 50</a>
          </li>
          <li>
            <a>ResNET34 - 100</a>
          </li>
          <li>
            <a>ResNET50 - 100</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default modelSelect;
<<<<<<< HEAD
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
