import React from "react";
import UhiDisplay from "./uhiDisplay";
import ResultDisplay from "./resultDisplay";

const resultContent = ({
  loading,
  setLoading,
  setWaiting,
  waiting,
  showResults,
  setShowResults,
  errorState,
  setErrorState,
}) => {
  return (
    <>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-border shadow-2xl rounded-2xl bg-base-100 w-[1300px] min-h-[650px] overflow-auto">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab w-[650px]"
          aria-label="UHI - Indices"
        />
        <div className="tab-content bg-base-100">
            <UhiDisplay />
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab w-[650px]"
          aria-label="Model Result"
          defaultChecked
        />
        <div className="tab-content bg-base-100 items-center justify-center p-6 w-[1300px] max-h-[620px]">
          <ResultDisplay 
          loading={loading}
          setLoading={setLoading}
          setWaiting={setWaiting}
          errorState={errorState}
          setErrorState={setErrorState}
          waiting={waiting} 
          showResults={showResults}
          setShowResults={setShowResults}
          />
        </div>
      </div>
    </>
  );
};

export default resultContent;