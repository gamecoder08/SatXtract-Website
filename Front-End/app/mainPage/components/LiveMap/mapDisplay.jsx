"use client";
import React, { useState, useRef, useEffect } from "react";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import SuccessMessage from "../successMessage";
import ErrorMessage from "../errorMessage";

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
  const [coords, setCoords] = useState({ lat: 23.259933, lon: 77.412613 });
  const [mapCorners, setMapCorners] = useState(null);
  const [zoom, setZoom] = useState(3);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setErrorShowAlert] = useState(false);

  const handleZoomChange = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      setZoom(Math.round(currentZoom)); // Update zoom state
      getVisibleCorners(); // Get visible corners when zoom changes
    }
  };

  const handleCenterChange = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      setCoords({ lat: center.lat.toFixed(6), lon: center.lng.toFixed(6) }); // Update center coordinates
      getVisibleCorners(); // Get visible corners when center changes
    }
  };

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
        zoom: 11,
        essential: true,
      });
      setZoom(11);
      getVisibleCorners(); // Get visible corners after flying to the location
    } else {
      alert("Location not found!");
    }
  };

  const getVisibleCorners = () => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();

    const ne = bounds.getNorthEast(); // Top-right corner
    const sw = bounds.getSouthWest(); // Bottom-left corner

    const nw = { lat: ne.lat, lon: sw.lng }; // Top-left corner
    const se = { lat: sw.lat, lon: ne.lng }; // Bottom-right corner

    console.log("Top-Left (NW):", nw);
    console.log("Top-Right (NE):", ne);
    console.log("Bottom-Left (SW):", sw);
    console.log("Bottom-Right (SE):", se);

    const newMapCorners = [
      [nw.lon, nw.lat], // Top-left corner
      [sw.lng, sw.lat], // Bottom-left corner
      [se.lon, se.lat], // Bottom-right corner
      [ne.lng, ne.lat], // Top-right corner
    ];

    console.log("Map Corners:", newMapCorners);
    setMapCorners(newMapCorners);
  };

  // UseEffect to update visible corners when zoom or center changes
  useEffect(() => {
    getVisibleCorners();
  }, [zoom, coords]);

  const sendLocationData = async () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    const zoom = Math.round(mapRef.current.getZoom());
    const lat = center.lat.toFixed(6);
    const lon = center.lng.toFixed(6);
    console.log("Sending Map Corners:", mapCorners);

    setTimeout(async () => {
      try {
        await axios.post("/api/sendMapData", { lat, lon, zoom, mapCorners });
        console.log("Data sent successfully");
        setShowSuccessAlert(true); // Show success alert
        setTimeout(() => setShowSuccessAlert(false), 3000); // Hide after 3 seconds
        console.log("Map Corners:", mapCorners);
        console.log("Center Coordinates:", { lat, lon });
        console.log("Zoom Level:", zoom);
        console.log("Zoom Level:", typeof zoom);


      } catch (error) {
        console.error(error);
        console.log("Error sending data");
        setErrorShowAlert(true); // Show error alert
        setTimeout(() => setShowErrorAlert(false), 3000); // Hide after 3 seconds
      }
    }, 1000);
  };


  return (
    <div>
      {/* Search Box */}
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter location name..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchLocation()}
        />
        <button
          className="ml-2 outline-1 shadow-2xs p-2 px-3 rounded hover:shadow-lg"
          onClick={searchLocation}
        >
          Search
        </button>
      </div>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="flex flex-col md:flex-row items-start relative gap-20 rounded-md"
      >
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: coords.lon,
            latitude: coords.lat,
            zoom: zoom,
          }}
          minZoom={1}
          maxZoom={15}
          style={{ width: "100%", height: 500 }}
          mapStyle={MAP_STYLE}
          dragPan={true}
          onZoomEnd={handleZoomChange}
          onMoveEnd={handleCenterChange}
        />
        <div className="flex flex-col items-start justify-start gap-10 mt-20 mr-4">
          <div className="flex flex-row gap-6 textarea border-base-300 w-[280px] text-md">
            <p>
              {coords
                ? `Longitude: ${coords.lon} Latitude: ${coords.lat}`
                : "Coordinates..."}
            </p>
            <p>Zoom Level: {zoom}</p>
          </div>
          {/* Static Map Button */}
          <button
            className="rounded border-2 border-base-300 outline hover:shadow-lg p-3 px-23 tooltip tooltip-info tooltip-bottom" data-tip="Zoom between 8 and 12 is recommended"
            onClick={sendLocationData}
          >
            View Map
          </button>
        </div>
        {showSuccessAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md ">
          <SuccessMessage
            duration={5000}
            onClose={() => setShowSuccessAlert(false)} // ensures it unmounts
          />
        </div>
      )}
      {showErrorAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md ">
          <ErrorMessage
            duration={5000}
            onClose={() => setShowErrorAlert(false)} // ensures it unmounts
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default MapDisplay;
