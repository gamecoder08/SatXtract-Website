'use client';
import React, { useState } from "react";

const ModelSelect = ({ setLoading, setWaiting, setShowResults, setErrorState, scrollTargetRef }) => {
  const [selectedModel, setSelectedModel] = useState("");

  const handleModelSelect = async (model) => {
    setSelectedModel(model);
    setLoading(false); // Stop the loading animation
    setWaiting(true);

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
        setWaiting(true); // Stop the waiting animation
        setErrorState(false); // Reset error state
        setShowResults(false); // Hide results initially
      } else {
        console.error("Error sending model to backend:", await response.json());
        setLoading(false);
        setWaiting(false);
        setShowResults(false);
        setErrorState(true); // Set error state to true
      }
    } catch (error) {
      setLoading(false);
      setWaiting(false);
      setShowResults(false);
      setErrorState(true); // Set error state to true
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
      setWaiting(false);
      setLoading(true);
      setErrorState(false); // Reset error state
      console.log("Running model:", selectedModel);
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
        setErrorState(false); // Reset error state
        setShowResults(false); // Hide results initially
        // Fetch images after running the model
      } else {
        setLoading(false);
        setWaiting(false);
        setErrorState(true); // Set error state to true
        console.error("Error running model:", await response.json());
      }
    } catch (error) {
      setLoading(false);
      setWaiting(false);
      setErrorState(true); // Set error state to true
      console.error("Error running model:", error);
    }
  };

  return (
    <div className="flex flex-row items-start gap-40 " ref={scrollTargetRef}>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn py-5 px-15 outline-1">
          Models
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-b mt-2 rounded-r w-60 p-2 px-4 shadow-lg"
        >
          <li>
            <a onClick={() => handleModelSelect("ResNET34-25")}>
              Low Resolution Input
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET50-75")}>
              Medium Resolution Input
            </a>
          </li>
          <li>
            <a onClick={() => handleModelSelect("ResNET101-100")}>
              High Resolution Input (Recommeded for Live Map)
            </a>
          </li>
          <li>
            <div className="dropdown dropdown-right">
              <div tabIndex={0} className="flex flex-row">
              <p className="font-bold">Advanced Models :- </p>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-b rounded-box z-1 w-52 p-2 shadow-lg"
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
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          className="btn py-5 px-20 border-2 outline-1 border-base-300 hover:shadow-md"
          onClick={() => {
            handleRunModel();
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
