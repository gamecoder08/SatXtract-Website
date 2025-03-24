"use client";
import React from "react";
import UploadFile from "./uploadFile";
import MapDisplay from "./LiveMap/";

const mapContent = () => {
  return (
    <>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-box shadow-2xl w-[1050px] min-h-[712px] overflow-auto">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Live Map"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full p-7 justify-between items-center">
          <MapDisplay />
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Upload Image"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full items-center justify-center">
          <UploadFile />
        </div>
      </div>
    </>
  );
};

export default mapContent;
