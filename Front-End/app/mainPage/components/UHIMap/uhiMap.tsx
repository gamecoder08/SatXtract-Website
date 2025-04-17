"use client";
import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { Map, MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { StyleSpecification } from "maplibre-gl";

interface UhiMapProps {
  uhiData: {
    lse_map: string;
    lst_map: string;
    ndvi_map: string;
    normal_map: string;
  } | null; // Allow null for initial state
}

const UhiMap: React.FC<UhiMapProps> = ({ uhiData }) => {
  const mapRef = useRef<MapRef>(null);
  const [mapStyle, setMapStyle] = useState<StyleSpecification | null>(null);
  console.log(uhiData?.lse_map,uhiData?.lst_map,uhiData?.ndvi_map,uhiData?.normal_map)

  useEffect(() => {
    if (uhiData) {
      // Dynamically update the map style with URLs from uhiData
      const updatedMapStyle: StyleSpecification = {
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
          lseOverlay: {
            type: "raster",
            tiles: [uhiData.lse_map],
            tileSize: 256,
          },
          lstOverlay: {
            type: "raster",
            tiles: [uhiData.lst_map],
            tileSize: 256,
          },
          ndviOverlay: {
            type: "raster",
            tiles: [uhiData.ndvi_map],
            tileSize: 256,
          },
          normalOverlay: {
            type: "raster",
            tiles: [uhiData.normal_map],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "esriSatellite",
            type: "raster",
            source: "esriSatellite",
          },
          {
            id: "lseOverlayLayer",
            type: "raster",
            source: "lseOverlay",
            paint: {
              "raster-opacity": 0.6, // Adjust transparency
            },
          },
          {
            id: "lstOverlayLayer",
            type: "raster",
            source: "lstOverlay",
            paint: {
              "raster-opacity": 0.6,
            },
          },
          {
            id: "ndviOverlayLayer",
            type: "raster",
            source: "ndviOverlay",
            paint: {
              "raster-opacity": 0.6,
            },
          },
          {
            id: "normalOverlayLayer",
            type: "raster",
            source: "normalOverlay",
            paint: {
              "raster-opacity": 0.6,
            },
          },
        ],
      };

      setMapStyle(updatedMapStyle);
    }
  }, [uhiData]);

  return (
    <div>
      {mapStyle ? (
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
          mapStyle={mapStyle}
        />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default UhiMap;