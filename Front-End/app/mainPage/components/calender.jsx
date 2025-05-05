"use client";
import React, {useState } from "react";
import axios from "axios";
import "pikaday/css/pikaday.css"; // Import CSS separately
import { DayPicker } from "react-day-picker";
import ErrorMessage from "./errorMessage";

const Calender = ({setUhiData, setUhiLoading, setUhiError, setUhiWaiting}) => {

  const [startdate, setstartDate] = useState();
  const [enddate, setendDate] = useState();
  const [showErrorAlert, setErrorShowAlert] = useState(false);

  const sendDateData = async (start, end) => {
    if(!start || !end) return;
    console.log("Start date:", start);
    console.log("End date:", end);

    setUhiLoading(true);
    setUhiError(false);
    setUhiWaiting(false);

    const startDateFormatted = start.toLocaleDateString("en-CA");
    const endDateFormatted = end.toLocaleDateString("en-CA");


    console.log("Formatted Start date:", startDateFormatted);
    console.log("Formatted End date:", endDateFormatted);
    
    try {
      const response = await axios.post("/api/sendDateData", {
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      });
      console.log("Date data sent successfully");

      // Log the data received from the backend
      console.log("Data received from backend:", response.data);
      setUhiData(response.data);
      setUhiLoading(false);
      setUhiWaiting(false);
      setUhiError(false);
    } catch (error) {
      console.error("Error sending date data:", error);
      setUhiError(true);
      setUhiLoading(false);
      setUhiWaiting(false);
      setErrorShowAlert(true); // Show error alert
      setTimeout(() => setErrorShowAlert(false), 3000); // Hide after 3 seconds
    }
  };

  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Months are zero-indexed
  const currentYear = today.getFullYear();

  return (
    <div className="flex flex-col gap-4 max-h-[150px]">
      <div className="flex flex-row gap-4">
          <div>
            <button popoverTarget="rdp-popover1" className="input input-border justify-center" style={{ anchorName: "--rdp", minWidth: "150px" }}>
              {startdate ? startdate.toLocaleDateString() : "Pick start date"}
            </button>
            <div popover="auto" id="rdp-popover1" className="dropdown" style={{ positionAnchor: "--rdp" }}>
              <DayPicker className="react-day-picker" mode="single" fixedWeeks captionLayout="dropdown" startMonth={new Date(2014, 12)} endMonth={new Date(currentYear, currentMonth-6)} selected={startdate} onSelect={setstartDate} />
            </div>
          </div>
          <div>
            <button popoverTarget="rdp-popover2" className="input input-border justify-center" style={{ anchorName: "--rdp", minWidth: "150px" }}>
              {enddate ? enddate.toLocaleDateString() : "Pick end date"}
            </button>
            <div popover="auto" id="rdp-popover2" className="dropdown" style={{ positionAnchor: "--rdp" }}>
              <DayPicker className="react-day-picker" mode="single" fixedWeeks captionLayout="dropdown" startMonth={new Date(2014, 12) } disabled={{ before: startdate }} endMonth={new Date(currentYear, currentMonth-1)} selected={enddate} onSelect={setendDate} />
            </div>
          </div>
      </div>
      <button
        className="mb-4 p-2 rounded border-2 border-gray-300 mt-2 hover:shadow-md tooltip tooltip-bottom tooltip-content tooltip-info"
        data-tip="Atleast a 6 month gap is desirable"
        onClick={() => sendDateData(startdate, enddate)}
      >
        View UHI
      </button>
      {showErrorAlert && (
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md ">
                <ErrorMessage
                  duration={5000}
                  onClose={() => setShowErrorAlert(false)} // ensures it unmounts
                />
              </div>
            )}
    </div>
  );
};

export default Calender;