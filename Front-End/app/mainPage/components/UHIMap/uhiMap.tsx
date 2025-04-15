"use client";
import * as React from "react";
import { useRef } from "react";
import { Map, MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { StyleSpecification } from "maplibre-gl";

const MAP_STYLE: StyleSpecification = {
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

const UhiMap = () => {
  const mapRef = useRef<MapRef>(null);

  return (
    <div>
      {/* Map Container */}
        <>
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
  // 👇 Disables all built-in UI elements
  attributionControl={false}
  dragRotate={false}
  touchZoomRotate={false}
/>
        </>
      </div>
  );
};

export default UhiMap;
