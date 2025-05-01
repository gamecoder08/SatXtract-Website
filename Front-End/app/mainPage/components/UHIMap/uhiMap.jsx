"use client";
import React from "react";

const UhiMap = ({ uhiData, uhiLoading, uhiError, uhiWaiting, setUhiLoading, setUhiWaiting, setUhiError }) => {
  const BASE_URL = "http://127.0.0.1:5000"; // Flask server base URL
  const timestamp = new Date().getTime(); // Add timestamp to force reload

  if (!uhiData || !uhiData.data || !uhiData.data.map_url && uhiWaiting) {
    return <div><div className="flex flex-col rounded-2xl items-center justify-center h-[500px]">
      <span className="loading loading-ring loading-xl"></span>
      <a>Waiting for date selection</a>
    </div></div>;
  }

  if (!uhiData || !uhiData.data || !uhiData.data.map_url && uhiLoading) {
    return <div><div className=" flex flex-col rounded-2xl items-center justify-center h-[500px]">
      <span className="loading loading-infinity loading-xl"></span>
    </div></div>;
  }

  if (!uhiData || !uhiData.data || !uhiData.data.map_url && uhiError) {
    return <div><div className="flex flex-col fetch-button items-center justify-center h-[500px] font-bold gap-5">
      Error Spotted. Please try again.
      <button className="btn border-2 outline p-5" onClick={resetProcess}>
        Reset
      </button>
    </div></div>;
  }

  const resetProcess = async () => {
    setUhiLoading(false); // Stop the loading animation
    setUhiWaiting(true);
    setUhiError(false); // Reset error state
  };

  const mapUrl = `${BASE_URL}${uhiData.data.map_url}?timestamp=${timestamp}`;
  console.log("Map URL:", mapUrl); // Debugging line

  return (
    <div className="w-[900px] h-[550px] relative">
      {!uhiWaiting && !uhiLoading && !uhiError && (
        <iframe
          src={mapUrl}
          title="UHI Map"
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
        />
      )}
      {/* Button to Reset states on Error*/}
      {/* {!uhiLoading && !uhiWaiting && uhiError && (
        <div className="flex flex-col fetch-button items-center justify-center h-[500px] font-bold gap-5">
          Error Spotted. Please try again.
          <button className="btn border-2 outline p-5" onClick={resetProcess}>
            Reset
          </button>
        </div>
      )} */}
    </div>
  );
};

export default UhiMap;
