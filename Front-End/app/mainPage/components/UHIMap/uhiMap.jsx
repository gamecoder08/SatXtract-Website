"use client";
import React from "react";

const UhiMap = ({ uhiData }) => {
  const BASE_URL = "http://127.0.0.1:5000"; // Flask server base URL
  const timestamp = new Date().getTime(); // Add timestamp to force reload

  if (!uhiData || !uhiData.data || !uhiData.data.map_url) {
    console.error("Invalid uhiData format.");
    return <div>Map data not available.</div>;
  }

  const mapUrl = `${BASE_URL}${uhiData.data.map_url}?timestamp=${timestamp}`;
  console.log("Map URL:", mapUrl); // Debugging line

  return (
    <div className="w-[800px] h-[500px] relative">
      <iframe
        src={mapUrl}
        title="UHI Map"
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default UhiMap;
