"use client";
import React from "react";
import Calender from "./calender";
import UhiImages from "./uhiImages";

const uhiDisplay = () => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-10">
      <figure className="diff aspect-16/9" tabIndex={0}>
        <div className="diff-item-1" role="img">
          <UhiImages />
        </div>
        <div className="diff-item-2" role="img" tabIndex={0}>
          <img
            alt="daisy"
            src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp"
          />
        </div>
        <div className="diff-resizer"></div>
      </figure>
      <div className="flex flex-col gap-6">
        <select defaultValue="UHI Indices" className="select">
          <option disabled={true}>UHI Indices</option>
          <option>LST</option>
          <option>LSE</option>
          <option>NDVI</option>
        </select>
        <Calender />
      </div>
    </div>
  );
};

export default uhiDisplay;
