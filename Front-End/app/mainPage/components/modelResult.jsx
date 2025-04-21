'use client';
import React, { useState } from "react";
import ModelSelect from "./modelSelect";
import ResultContent from "./resultContent";

const ModelResult = ({ }) => {
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(true); // Controls the loading animation
  const [showResults, setShowResults] = useState(false); // Controls when to show results
  const [errorState, setErrorState] = useState(false); // State to track errors

  // // Handles the model selection process
  // const handleModelSelection = () => {
  //   setLoading(true); // Start loading animation

  //   setLoading(false); // Stop loading after a delay (simulate API call)
  // };

  return (
    <div className="flex flex-col gap-20 items-center justify-center">
      <div>
        <ModelSelect setLoading={setLoading} setWaiting={setWaiting} setShowResults={setShowResults} setErrorState={setErrorState}/>
      </div>
      <div className="mr-20">
        <ResultContent
          loading={loading}
          setLoading={setLoading}
          setWaiting={setWaiting}
          showResults={showResults}
          waiting={waiting}
          setShowResults={setShowResults}
          errorState={errorState}
          setErrorState={setErrorState}
        />
      </div>
    </div>
  );
};

export default ModelResult;
