import React, { useState } from "react";
import axios from "axios";
import SuccessMessage from "./successMessage";
import ErrorMessage from "./errorMessage";
import AlertMessage from "./alertMessage";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setErrorShowAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShowSuccessAlert(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorShowAlert(true);
    }
  };

  return (
    <>
      <fieldset className="fieldset flex flex-col gap-15 items-center justify-center">
        <div>
          <legend className="fieldset-legend">Pick a file</legend>
          <input
            type="file"
            className="file-input pr-10"
            onChange={handleFileChange}
          />
          <label className="fieldset-label">Max size 2MB</label>
        </div>
        <div>
          <button
            className="p-2 px-16 border-2 border-base-300 rounded mt-8 hover:shadow-md"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
      </fieldset>
      {showSuccessAlert && (
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md ">
                <SuccessMessage
                  duration={5000}
                  onClose={() => setShowSuccessAlert(false)} // ensures it unmounts
                />
              </div>
            )}
      {showErrorAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md ">
          <ErrorMessage
            duration={5000}
            onClose={() => setShowErrorAlert(false)} // ensures it unmounts
          />
        </div>
      )}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md ">
          <AlertMessage
            duration={5000}
            onClose={() => setShowAlert(false)} // ensures it unmounts
          />
        </div>
      )}
    </>
  );
};

export default UploadFile;
