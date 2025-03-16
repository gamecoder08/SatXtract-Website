import React from "react";

const uploadFile = () => {
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pick a file</legend>
        <input type="file" className="file-input" />
        <label className="fieldset-label">Max size 2MB</label>
      </fieldset>
    </>
  );
};

export default uploadFile;
