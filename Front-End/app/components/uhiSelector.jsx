import React from 'react'

const uhiSelector = ({setSelectedUhi, selectedUhi}) => {

    const selectUhi = (event) => {
        setSelectedUhi(event.target.value); // Update the selected UHI index
    };

    return (
        <div>
            <select
                value={selectedUhi || "Pick a UHI Index:"}
                className="select"
                onChange={selectUhi} // Handle selection change
            >
                <option disabled>Pick a UHI Index:</option>
                <option value="Sentinel">Normal Map (Sentinel)</option>
                <option value="LST">Land Surface Temperature (LST)</option>
                <option value="NDVI">Normalized Difference Vegetation Index (NDVI)</option>
                <option value="LSE">Emissivity (LSE)</option>
            </select>
        </div>
    )
}

export default uhiSelector