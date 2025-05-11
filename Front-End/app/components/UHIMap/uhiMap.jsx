"use client";
import React from "react";

const UhiMap = ({ uhiData, uhiLoading, uhiError, uhiWaiting, setUhiLoading, setUhiWaiting, setUhiError, selectedUhi }) => {
  const BASE_URL = "http://127.0.0.1:5000"; // Flask server base URL
  const timestamp = new Date().getTime(); // Add timestamp to force reload

  if ((!uhiData || !uhiData.data ) && uhiWaiting) {
    return <div><div className="flex flex-col rounded-2xl items-center justify-center h-[500px]">
      <span className="loading loading-ring loading-xl"></span>
      <a>Waiting for date selection</a>
    </div></div>;
  }

  else if ((!uhiData || !uhiData.data ) && uhiLoading) {
    return <div><div className=" flex flex-col rounded-2xl items-center justify-center h-[500px]">
      <span className="loading loading-infinity loading-xl"></span>
    </div></div>;
  }

  else if ((!uhiData || !uhiData.data ) && uhiError) {
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

  // const mapUrl = `${BASE_URL}${uhiData.data.map_url}?timestamp=${timestamp}`;
  const sentinelImageUrl = `${BASE_URL}${uhiData.data.sentinel_image_url}?timestamp=${timestamp}`;
  const ndviImageUrl = `${BASE_URL}${uhiData.data.ndvi_image_url}?timestamp=${timestamp}`;
  const lseImageUrl = `${BASE_URL}${uhiData.data.lse_image_url}?timestamp=${timestamp}`;
  const lstImageUrl = `${BASE_URL}${uhiData.data.lst_image_url}?timestamp=${timestamp}`;
  // console.log("Map URL:", mapUrl); // Debugging line
  console.log("Sentinel Image URL:", sentinelImageUrl); // Debugging line
  console.log("NDVI Image URL:", ndviImageUrl); // Debugging line
  console.log("LSE Image URL:", lseImageUrl); // Debugging line
  console.log("LST Image URL:", lstImageUrl); // Debugging line


  return (
    <div className="w-[900px] h-[550px] relative">
      {!uhiWaiting && !uhiLoading && !uhiError && selectedUhi === "Sentinel" && (
        <div className="flex flex-col items-center">
        <img src={sentinelImageUrl} alt="Sentinel Image" className="w-[900px] h-auto shadow-md rounded" />

        </div>
      )}
      {!uhiWaiting && !uhiLoading && !uhiError && selectedUhi === "NDVI" && (
        <img src={ndviImageUrl} alt="NDVI Image" className="w-[900px] h-auto shadow-md rounded" />
      )}
      {!uhiWaiting && !uhiLoading && !uhiError && selectedUhi === "LSE" && (
        <img src={lseImageUrl} alt="LSE Image" className="w-[900px] h-auto shadow-md rounded" />
      )}
      {!uhiWaiting && !uhiLoading && !uhiError && selectedUhi === "LST" && (
        <img src={lstImageUrl} alt="LST Image" className="w-[900px] h-auto shadow-md rounded" />
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
