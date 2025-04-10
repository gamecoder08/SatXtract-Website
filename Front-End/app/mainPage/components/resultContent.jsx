import React from "react";
import UhiDisplay from "./uhiDisplay";
import ResultDisplay from "./resultDisplay";

const resultContent = ({
  loading,
  showResults,
  setShowResults,
}) => {
  return (
    <>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-box shadow-2xl w-[1050px] min-h-[600px] overflow-auto">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="UHI - Indices"
        />
        <div className="tab-content tab-disabled bg-base-100 border-base-300 p-6">
            <UhiDisplay />
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Model Result"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full">
          <ResultDisplay 
          loading={loading} 
          showResults={showResults}
          setShowResults={setShowResults}
          />
        </div>
      </div>
    </>
  );
};

export default resultContent;