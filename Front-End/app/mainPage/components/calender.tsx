"use client"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css"; // Ensure you have Pikaday CSS imported

export default function App() {
  const startDatepicker = useRef(null);
  const endDatepicker = useRef(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
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
      minDate: new Date(2015, 0, 1), // January 1, 2015
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

  interface DateData {
    startDate: string;
    endDate: string;
  }

  const sendDateData = async (start: Date | null, end: Date | null): Promise<void> => {
    if (!start || !end) return;

    // Adjust dates to local timezone
    const startDateFormatted = start.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
    const endDateFormatted = end.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD

    try {
      await axios.post("/api/sendDateData", {
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      } as DateData);
      console.log("Date data sent successfully");
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
}