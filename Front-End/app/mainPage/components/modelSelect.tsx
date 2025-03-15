"use client";
import React from "react";

const modelSelect = () => {
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1 px-15 outline-1">
          Models
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-md"
        >
          <li>
            <a>ResNET34 - 25</a>
          </li>
          <li>
            <a>ResNET50 - 25</a>
          </li>
          <li>
            <a>ResNET34 - 50</a>
          </li>
          <li>
            <a>ResNET50 - 50</a>
          </li>
          <li>
            <a>ResNET34 - 100</a>
          </li>
          <li>
            <a>ResNET50 - 100</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default modelSelect;
