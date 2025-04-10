import React, { useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
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
      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <>
      <fieldset className="fieldset flex flex-col md:flex-row items-start gap-30">
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
            className="p-2 px-16 border-2 border-gray-300 rounded mt-8 hover:shadow-md"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
      </fieldset>
    </>
  );
};

export default UploadFile;
