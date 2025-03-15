import React from "react";
import MapDisplay from "./mapDisplay";

const mapContent = () => {
  return (
    <>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-box shadow-2xl w-[1050px] min-h-[600px] overflow-auto">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Live Map"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full">
            <MapDisplay />
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Upload Image"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full">
          Tab content 2
        </div>
      </div>
    </>
  );
};

export default mapContent;
