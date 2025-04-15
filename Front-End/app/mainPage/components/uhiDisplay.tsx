"use client";
import React from "react";
import Calender from "./calender";
import UhiMap from "./UHIMap";
import RealMap from "./RealMap/";

const uhiDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-row gap-20">
        <select defaultValue="UHI Indices" className="select">
          <option disabled={true}>UHI Indices</option>
          <option>LST</option>
          <option>LSE</option>
          <option>NDVI</option>
        </select>
        <Calender />
      </div>
      <figure className="diff aspect-16/9 max-w-[600px]" tabIndex={0}>
        <div className="diff-item-1" role="img">
          <RealMap />
        </div>
        <div className="diff-item-2" role="img" tabIndex={0}>
          <UhiMap />
        </div>
        <div className="diff-resizer"></div>
      </figure>
    </div>
  );
};

export default uhiDisplay;
