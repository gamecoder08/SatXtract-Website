"use client";
import React, {useState} from "react";
import Calender from "./calender";
import UhiMap from "./UHIMap";
import ModelSelect from "./modelSelect";

const uhiDisplay = ({
}) => {
  const [uhiData, setUhiData] = useState(null);

  return (
    <div className="flex flex-row gap-5 justify-center ">
        <Calender setUhiData={setUhiData} />
      <figure className="aspect-16/9 max-w-[800px]">
        <div className="w-[800px]">
          <UhiMap uhiData={uhiData}/>
        </div>
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
