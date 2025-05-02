"use client";
import React from "react";
import UploadFile from "./uploadFile";
import MapDisplay from "./LiveMap/";

const mapContent = () => {
  return (
    <>
      {/* name of each tab group should be unique */}
    <div className="tabs tabs-border bg-base-100 w-[1300px] min-h-[650px] rounded-2xl overflow-auto shadow-2xl">
        <input
          type="radio"
          name="my_tabs_6"
          className="tab w-[650px]"
          aria-label="Live Map"
        />
        <div className="tab-content tab-active bg-base-100 mx-2 p-6 w-maplibregl-interactive rounded-2xl justify-between items-center">
          <MapDisplay />
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab w-[650px]"
          aria-label="Upload Image"
          defaultChecked
        />
        <div className="tab-content bg-base-100 mx-2 py-48 full rounded-2xl items-center justify-center">
          <UploadFile />
        </div>
      </div>
    </>
  );
};

export default mapContent;
