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
<<<<<<< HEAD
<<<<<<< HEAD
      <fieldset className="fieldset flex flex-col md:flex-row items-start gap-60">
=======
      <fieldset className="fieldset flex flex-col md:flex-row items-start gap-30">
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
      <fieldset className="fieldset flex flex-col md:flex-row items-start gap-30">
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
        <div>
          <legend className="fieldset-legend">Pick a file</legend>
          <input
            type="file"
<<<<<<< HEAD
<<<<<<< HEAD
            className="file-input pr-10"
=======
            className="file-input"
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
            className="file-input"
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
            onChange={handleFileChange}
          />
          <label className="fieldset-label">Max size 2MB</label>
        </div>
        <div>
<<<<<<< HEAD
<<<<<<< HEAD
          <button className="p-2 px-16 border-2 border-gray-300 rounded mt-8 hover:shadow-md" onClick={handleFileUpload}>
=======
          <button className="p-2 px-8 border-2 border-gray-300 rounded mt-8 hover:shadow-md" onClick={handleFileUpload}>
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
=======
          <button className="p-2 px-8 border-2 border-gray-300 rounded mt-8 hover:shadow-md" onClick={handleFileUpload}>
>>>>>>> 24f670abfae010228c974a26388ef3823617a0a5
            Upload
          </button>
        </div>
      </fieldset>
    </>
  );
};

export default UploadFile;
