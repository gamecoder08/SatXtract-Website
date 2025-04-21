"use client";
import React, {useState} from "react";
import Calender from "./calender";
import UhiMap from "./UHIMap";
import RealMap from "./RealMap/";
import ModelSelect from "./modelSelect";

const uhiDisplay = ({
}) => {
  const [uhiData, setUhiData] = useState(null);

  return (
    <div className="flex flex-row gap-5 justify-center ">
        <Calender setUhiData={setUhiData} />
      <figure className="diff aspect-16/9 max-w-[600px]" tabIndex={0}>
        <div className="diff-item-1" role="img">
          <RealMap />
        </div>
        <div className="diff-item-2" role="img" tabIndex={0}>
          <UhiMap uhiData={uhiData}/>
        </div>
        <div className="diff-resizer"></div>
      </figure>
      <select defaultValue="UHI Indices" className="select">
          <option disabled={true}>UHI Indices</option>
          <option>LST</option>
          <option>LSE</option>
          <option>NDVI</option>
        </select>
    </div>
  );
};

export default uhiDisplay;
