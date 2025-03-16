"use client";
import * as React from "react";
import { useState, useRef } from "react";
import { Map, MapRef, MapStyle } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const MAP_STYLE: MapStyle = {
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
  const mapRef = useRef<MapRef>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const searchLocation = async () => {
    if (!location) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      setCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });

      mapRef.current?.flyTo({
        center: [parseFloat(lon), parseFloat(lat)],
        zoom: 10,
        essential: true,
      });
    } else {
      alert("Location not found!");
    }
  };

  const getStaticMap = () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    const zoom = Math.round(mapRef.current.getZoom()); // Convert to integer
    const lat = center.lat.toFixed(6);
    const lon = center.lng.toFixed(6);

    const mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&z=${zoom}&l=sat&size=650,450`;

    window.open(mapUrl, "_blank"); // Open in new tab
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
        />
        <button
          className="ml-2 outline-1 shadow-2xs p-2 rounded"
          onClick={searchLocation}
        >
          Search
        </button>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="relative">
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: 77.412613,
            latitude: 23.259933,
            zoom: 3,
          }}
          minZoom={1}
          maxZoom={15}
          style={{ width: "100%", height: 500 }}
          mapStyle={MAP_STYLE}
        />
      </div>

      {/* Static Map Button */}
      <button
        className="mb-4 bg-blue-500 text-white p-2 rounded shadow"
        onClick={getStaticMap}
      >
        Download Static Map
      </button>
    </div>
  );
};

export default MapDisplay;
