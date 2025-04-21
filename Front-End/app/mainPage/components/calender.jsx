"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "pikaday/css/pikaday.css"; // Import CSS separately

// Dynamically import Pikaday with SSR disabled
const Pikaday = dynamic(() => import("pikaday"), { ssr: false });

const Calender = ({}) => {
  const startDatepicker = useRef(null);
  const endDatepicker = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (!Pikaday) return;

    const today = new Date();
    const startPicker = new Pikaday({
      field: startDatepicker.current,
      minDate: new Date(2015, 0, 1), // January 1, 2015
      maxDate: today,
      onSelect: function (date) {
        console.log("Start date selected:", date);
        setStartDate(date);
        endPicker.setMinDate(date);
      },
    });

    const endPicker = new Pikaday({
      field: endDatepicker.current,
      minDate: new Date(2015, 0, 1),
      maxDate: today,
      onSelect: function (date) {
        console.log("End date selected:", date);
        setEndDate(date);
        startPicker.setMaxDate(date);
      },
    });

    return () => {
      startPicker.destroy();
      endPicker.destroy();
    };
  }, [startDate, endDate]);

  const sendDateData = async (start, end) => {
    if(!start || !end) return;
    const startDateFormatted = start.toLocaleDateString("en-CA");
    const endDateFormatted = end.toLocaleDateString("en-CA");

    try {
      const response = await axios.post("/api/sendDateData", {
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      });
      console.log("Date data sent successfully");

      // Log the data received from the backend
      console.log("Data received from backend:", response.data);
      setUhiData(response.data);
    } catch (error) {
      console.error("Error sending date data:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
      <input
        type="text"
        className="input pika-single"
        placeholder="Start date"
        ref={startDatepicker}
      />
      <input
        type="text"
        className="input pika-single"
        placeholder="End date"
        ref={endDatepicker}
      />
      </div>
      <button
        className="mb-4 p-2 rounded border-2 border-gray-300 mt-2 hover:shadow-md"
        onClick={() => sendDateData(startDate, endDate)}
      >
        View UHI
      </button>
    </div>
  );
};

export default Calender;