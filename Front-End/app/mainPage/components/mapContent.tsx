"use client";
import React from "react";
import UploadFile from "./uploadFile";
import MapDisplay from "./LiveMap/";

const mapContent = () => {
  return (
    <>
      {/* name of each tab group should be unique */}
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="tabs tabs-border w-[1600px] min-h-[712px] overflow-auto shadow-2xl">
=======
      <div className="tabs tabs-box shadow-2xl w-[1050px] min-h-[712px] overflow-auto">
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
      <div className="tabs tabs-box shadow-2xl w-[1050px] min-h-[712px] overflow-auto">
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Live Map"
        />
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="tab-content tab-active bg-base-100 border-base-300 p-6 w-maplibregl-interactive rounded-2xl justify-between items-center">
=======
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full p-7 justify-between items-center">
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full p-7 justify-between items-center">
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
          <MapDisplay />
        </div>

        <input
          type="radio"
          name="my_tabs_6"
          className="tab"
          aria-label="Upload Image"
          defaultChecked
        />
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="tab-content bg-base-100 border-base-300 px-20 pt-67 pb-60 w-full rounded-2xl items-center justify-center">
=======
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full items-center justify-center">
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
        <div className="tab-content bg-base-100 border-base-300 p-6 w-full items-center justify-center">
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
          <UploadFile />
        </div>
      </div>
    </>
  );
};

export default mapContent;
