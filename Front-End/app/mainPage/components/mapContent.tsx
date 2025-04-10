"use client";
import React from "react";
import UploadFile from "./uploadFile";
import MapDisplay from "./LiveMap/";

const mapContent = () => {
  return (
    <>
      {/* name of each tab group should be unique */}
    <div className="tabs tabs-border w-[1600px] min-h-[712px] overflow-auto shadow-2xl">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Live Map"
        />
        <div className="tab-content tab-active bg-base-100 border-base-300 p-6 w-maplibregl-interactive rounded-2xl justify-between items-center">
          <MapDisplay />
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Upload Image"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 px-20 pt-67 pb-60 w-full rounded-2xl items-center justify-center">
          <UploadFile />
        </div>
      </div>
    </>
  );
};

export default mapContent;
