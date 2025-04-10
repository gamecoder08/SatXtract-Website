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
      <div className="tabs tabs-border shadow-2xl rounded-2xl bg-base-100 w-[1300px] min-h-[650px] overflow-auto">
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
        <div className="tab-content bg-base-100 items-center justify-center p-6 w-[1300px] max-h-[620px]">
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