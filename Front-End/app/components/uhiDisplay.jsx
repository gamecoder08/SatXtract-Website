"use client";
import React, {useState} from "react";
import Calender from "./calender";
import UhiMap from "./UHIMap";
import UhiSelector from "./uhiSelector";

const uhiDisplay = ({
}) => {
  const [uhiData, setUhiData] = useState(null);
  const [uhiLoading, setUhiLoading] = useState(false);
  const [uhiError, setUhiError] = useState(false);
  const [uhiWaiting, setUhiWaiting] = useState(true);
  const [selectedUhi, setSelectedUhi] = useState("Sentinel");

  return (
    <div className="flex flex-row gap-5 justify-center ">
      <div className="flex flex-col gap-10">
        <Calender setUhiData={setUhiData} setUhiLoading={setUhiLoading} setUhiError={setUhiError} setUhiWaiting={setUhiWaiting}/>
        {!uhiLoading && !uhiWaiting && !uhiError && (
          <UhiSelector selectedUhi={selectedUhi} setSelectedUhi={setSelectedUhi}/>
        )}
        </div>
      <figure className="aspect-16/9 max-w-[1000px]">
        <div className="w-[900px] h-[100%]">
          <UhiMap uhiData={uhiData} uhiLoading={uhiLoading} uhiError={uhiError} uhiWaiting={uhiWaiting} setUhiLoading={setUhiLoading} setUhiError={setUhiError} setUhiWaiting={setUhiWaiting} selectedUhi={selectedUhi}/>
        </div>
      </figure>
      {/* <select defaultValue="UHI Indices" className="select">
          <option disabled={true}>UHI Indices</option>
          <option>LST</option>
          <option>LSE</option>
          <option>NDVI</option>
        </select> */}
    </div>
  );
};

export default uhiDisplay;
