'use client';
import React, { useState } from "react";
import ModelSelect from "./modelSelect";
import ResultContent from "./resultContent";

const ModelResult = ({ }) => {
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false); // Controls the loading animation
  const [showResults, setShowResults] = useState(false); // Controls when to show results

  // Handles the model selection process
  const handleModelSelection = () => {
    setLoading(true); // Start loading animation

    setLoading(false); // Stop loading after a delay (simulate API call)
  };

  const handleFetchImages = () => {
    setShowResults(true); // Show the results when "Compare" button is clicked
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-80 mt-35 ml-15">
      <div className="mt-25">
        <ModelSelect setLoading={setLoading} setWaiting={setWaiting} setShowResults={setShowResults}/>
      </div>
      <div className="mr-20">
        <ResultContent
          loading={loading}
          showResults={showResults}
          setShowResults={setShowResults}
        />
      </div>
    </div>
  );
};

export default ModelResult;
