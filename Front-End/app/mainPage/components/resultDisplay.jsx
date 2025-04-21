"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ResultDisplay = ({
  loading,
  setLoading,
  setWaiting,
  waiting,
  showResults,
  setShowResults,
  errorState,
  setErrorState,
}) => {
  const [images, setImages] = useState({
    initial_image: "",
    predicted_image: "",
  });

  // Function to fetch images
  async function fetchImages() {
    console.log("fetchImages function called"); // Debugging log

    try {
      const response = await fetch("/api/getResults", {
        method: "GET",
      });

      if (!response.ok) {
        console.log("Failed to fetch images");
        setErrorState(true); // Set error state to true
      }

      const data = await response.json();
      console.log("Response from internal API:", data);

      // Update the state with the image paths
      const baseUrl = "http://127.0.0.1:5000";
      const timestamp = new Date().getTime()
      // const initialImageUrl = data.initial_image
      //   ? `${baseUrl}${data.initial_image.replace("..", "")}`
      //   : "";
      // const predictedImageUrl = data.predicted_image
      //   ? `${baseUrl}${data.predicted_image.replace("..", "")}`
      //   : "";
      const initialImageUrl = data.initial_image
        ? `${baseUrl}${data.initial_image.replace("..", "")}?timestamp=${timestamp}`
        : "";
      const predictedImageUrl = data.predicted_image
        ? `${baseUrl}${data.predicted_image.replace("..", "")}?timestamp=${timestamp}`
        : "";

      setImages({
        initial_image: initialImageUrl,
        predicted_image: predictedImageUrl,
      });
      setErrorState(false);
      setLoading(false);
      setWaiting(false);
      setShowResults(true);
    } catch (error) {
      setErrorState(true); // Set error state to true
      setLoading(false);
      setWaiting(false); // Stop the waiting animation
      console.error("Error fetching images:", error);
    }
  }

  const resetProcess = async () => {
    setLoading(false); // Stop the loading animation
    setWaiting(true);
    setShowResults(false); // Reset show results state
    setErrorState(false); // Reset error state
  };

  return (
    <div className="items-center justify-center w-[1300px] max-h-[620px]">
      {waiting && !loading && !showResults &&(
        <div className="flex flex-col rounded-2xl items-center justify-center h-[500px]">
        <span className="loading loading-ring loading-xl"></span>
        <a>Waiting for model to run</a>
      </div>
      )}
      {/* Loading Animation */}
      {loading && !waiting && !showResults &&(
        <div className=" flex flex-col rounded-2xl items-center justify-center h-[500px]">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )}

      {/* Button to Fetch Images */}
      {!loading && !showResults && !waiting && !errorState && (
        <div className="flex flex-col fetch-button items-center justify-center h-[500px]">
          <button className="btn border-2 outline p-5 px-10" onClick={fetchImages}>
            Fetch Results
          </button>
        </div>
      )}

      {/* Button to Fetch Images */}
      {!loading && !showResults && !waiting && errorState && (
        <div className="flex flex-col fetch-button items-center justify-center h-[500px] font-bold gap-5">
          Error Spotted. Please try again.
          <button className="btn border-2 outline p-5" onClick={resetProcess}>
            Reset
          </button>
        </div>
      )}

      {/* Results Display */}
      {showResults && !waiting && !loading && !errorState && (
        <div className="flex flex-row gap-8 items-center justify-center">
          <figure className="diff aspect-16/9 max-w-[1000px] " tabIndex={0}>
            <div className="diff-item-1" role="img">
              {images.initial_image ? (
                <Image
                  src={images.initial_image}
                  alt="Initial Image"
                  width={500} // Replace with appropriate width
                  height={400} // Replace with appropriate height
                />
              ) : (
                <p></p>
              )}
            </div>
            <div className="diff-item-2" role="img" tabIndex={0}>
              {images.initial_image ? (
                <Image
                  src={images.initial_image}
                  alt="Initial Image"
                  width={500} // Replace with appropriate width
                  height={400} // Replace with appropriate height
                />
              ) : (
                <p></p>
              )}
              {images.predicted_image ? (
                <Image
                  src={images.predicted_image}
                  alt="Predicted Image"
                  width={500} // Replace with appropriate width
                  height={400}
                  style={{ opacity: 0.5 }} // Replace with appropriate height
                />
              ) : (
                <p></p>
              )}
            </div>
            <div className="diff-resizer"></div>
          </figure>
          <div className="flex flex-col gap-10 rounded-md px-4 py-2 text-center">
            <div className="flex flex-row gap-3">
              <p className="text-sm font-semibold border w-6 h-6 bg-[#FFFFFF] text-gray-700"></p>
              <p className="text-sm font-semibold">Not Classified</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="text-sm font-semibold border w-6 h-6 bg-[#FF0000] text-gray-700"></p>
              <p className="text-sm font-semibold">Buildings</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="text-sm font-semibold border w-6 h-6 bg-[#0000FF] text-gray-700"></p>
              <p className="text-sm font-semibold">Water</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="text-sm font-semibold border w-6 h-6 bg-[#00FF00] text-gray-700"></p>
              <p className="text-sm font-semibold">Greenery</p>
            </div>
            <div className="flex flex-row gap-3">
              <p className="text-sm font-semibold border w-6 h-6 bg-[#808080] text-gray-700"></p>
              <p className="text-sm font-semibold">Roads</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
