"use client";
import React, { useState, useRef } from "react";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";

const MAP_STYLE = {
  version: 8,
  sources: {
    esriSatellite: {
      type: "raster",
      tiles: [
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "&copy; Esri, Maxar, Earthstar Geographics",
    },
  },
  layers: [
    {
      id: "esriSatellite",
      type: "raster",
      source: "esriSatellite",
    },
  ],
};

const MapDisplay = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);

  const searchLocation = async () => {
    if (!location) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      setCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });

      mapRef.current?.flyTo({
        center: [parseFloat(lon), parseFloat(lat)],
        zoom: 13,
        essential: true,
      });
    } else {
      alert("Location not found!");
    }
  };

  const handleDownloadScreenshot = async () => {
    const res = await fetch("/api/screenshot");
    const data = await res.json();
  
    if (data.url) {
      const link = document.createElement("a");
      link.href = data.url;
      link.download = "map-screenshot.png";
      link.click();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  const getStaticMap = () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    const zoom = Math.round(mapRef.current.getZoom());
    const lat = center.lat.toFixed(6);
    const lon = center.lng.toFixed(6);

    const mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&z=${zoom}&l=sat&size=650,450`;

    window.open(mapUrl, "_blank");
  };

  const sendLocationData = async () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    const zoom = Math.round(mapRef.current.getZoom());
    const lat = center.lat.toFixed(6);
    const lon = center.lng.toFixed(6);

    setTimeout(async () => {
      try {
        await axios.post("/api/sendMapData", { lat, lon, zoom });
        console.log("Data sent successfully");
      } catch (error) {
        console.error(error);
        console.log("Error sending data");
      }
    }, 3000);
  };

  return (
    <div>
      {/* Search Box */}
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter location name..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 outline-1 shadow-2xs p-2 rounded"
          onClick={searchLocation}
        >
          Search
        </button>
      </div>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="flex flex-col md:flex-row items-start relative gap-30 rounded-md"
      >
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: 77.412613,
            latitude: 23.259933,
            zoom: 3,
          }}
          minZoom={1}
          maxZoom={15}
          style={{ width: "70%", height: 500 }}
          mapStyle={MAP_STYLE}
          dragPan={true}
        />
        <div className="flex flex-col items-start justify-start gap-10">
          {/* Static Map Button */}
          <button
            className="rounded border-2 border-base-300 outline hover:shadow-lg p-3 px-21 mt-20"
            onClick={() => {
              getStaticMap();
              sendLocationData();
              handleDownloadScreenshot();
            }}
          >
            View Map
          </button>
          <p className="textarea border-base-300 w-[250px] text-md">
            {coords
              ? `Longitude: ${coords.lon} Latitude: ${coords.lat}`
              : "Coordinates..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapDisplay;
