"use client";
import React, {useState} from "react";
import Calender from "./calender";
import UhiMap from "./UHIMap";

const uhiDisplay = ({
}) => {
  const [uhiData, setUhiData] = useState(null);
  const [uhiLoading, setUhiLoading] = useState(false);
  const [uhiError, setUhiError] = useState(false);
  const [uhiWaiting, setUhiWaiting] = useState(true);

  return (
    <div className="flex flex-row gap-5 justify-center ">
        <Calender setUhiData={setUhiData} setUhiLoading={setUhiLoading} setUhiError={setUhiError} setUhiWaiting={setUhiWaiting}/>
      <figure className="aspect-16/9 max-w-[1000px]">
        <div className="w-[900px] h-[100%]">
          <UhiMap uhiData={uhiData} uhiLoading={uhiLoading} uhiError={uhiError} uhiWaiting={uhiWaiting} setUhiLoading={setUhiLoading} setUhiError={setUhiError} setUhiWaiting={setUhiWaiting}/>
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
