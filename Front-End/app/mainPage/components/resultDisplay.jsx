"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import model from "./modelSelect";

const ResultDisplay = ({
  loading,
  showResults,
  setShowResults,
}) => {
  const [images, setImages] = useState({
    initial_image: "",
    predicted_image: "",
  });
  const [error, setError] = useState(false); // State to track errors

  // Function to fetch images
  async function fetchImages() {
    console.log("fetchImages function called"); // Debugging log

    try {
      const response = await fetch("/api/getResults", {
        method: "GET",
      });

      if (!response.ok) {
        console.log("Failed to fetch images");
        setError(true); // Set error state to true
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
      setError(false);
      setShowResults(true); // Show the results
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  return (
    <div>
      {/* Loading Animation */}
      {loading && (
        <div className="loading-animation py-50 rounded-2xl pl-120">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      )}

      {/* Button to Fetch Images */}
      {!loading && !showResults && (
        <div className="fetch-button">
          <button className="border-2 rounded-2xl p-2" onClick={fetchImages}>
            Fetch Results
          </button>
        </div>
      )}

      {/* Results Display */}
      {showResults && (
        <>
          <figure className="diff aspect-16/9" tabIndex={0}>
            <div className="diff-item-1" role="img">
              {images.initial_image ? (
                <Image
                  src={images.initial_image}
                  alt="Initial Image"
                  width={500} // Replace with appropriate width
                  height={500} // Replace with appropriate height
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
                  height={500} // Replace with appropriate height
                />
              ) : (
                <p></p>
              )}
              {images.predicted_image ? (
                <Image
                  src={images.predicted_image}
                  alt="Predicted Image"
                  width={500} // Replace with appropriate width
                  height={500}
                  style={{ opacity: 0.5 }} // Replace with appropriate height
                />
              ) : (
                <p></p>
              )}
            </div>
            <div className="diff-resizer"></div>
          </figure>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};

export default ResultDisplay;
