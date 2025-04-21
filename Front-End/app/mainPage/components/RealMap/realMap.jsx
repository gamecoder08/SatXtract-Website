"use client";
import React, { useRef } from "react";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

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

const RealMap = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  return (
    <div ref={mapContainerRef}>
      {/* Map Container */}
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
        dragPan={true}
      />
    </div>
  );
};

export default RealMap;
