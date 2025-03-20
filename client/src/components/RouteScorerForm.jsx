import React, { useState } from 'react'

const RouteScorerForm = () => {
    const [formData, setFormData] = useState({
        currentLat: "",
        currentLong: "",
        destination: "",
        destLat: "",
        destLong: "",
        lightIntensity: "",
        trafficDensity: "",
        crowdDensity: "",
        crimeRate: "",
        accidentRate: "",
      });
    
      const [suggestions, setSuggestions] = useState([]);
    
      // Get current location
      const getCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setFormData((prev) => ({
                ...prev,
                currentLat: position.coords.latitude.toFixed(6),
                currentLong: position.coords.longitude.toFixed(6),
              }));
            },
            (error) => alert("Error fetching location: " + error.message)
          );
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      };
    
      // Fetch location suggestions from OpenStreetMap
      const fetchLocationSuggestions = async (query) => {
        if (query.length < 3) {
          setSuggestions([]);
          return;
        }
    
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
          );
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      };
    
      // Handle destination selection
      const selectDestination = (place) => {
        setFormData((prev) => ({
          ...prev,
          destination: place.display_name,
          destLat: place.lat,
          destLong: place.lon,
        }));
        setSuggestions([]);
      };
    
      // Handle input changes
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
        if (e.target.name === "destination") {
          fetchLocationSuggestions(e.target.value);
        }
      };
    
      // Form submission
      const calculateSafetyScore = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        alert("Safety score calculation triggered!");
      };
    
      return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-center mb-4">Safety Score Calculator</h2>
    
          <form onSubmit={calculateSafetyScore} className="space-y-4">
            {/* Current Location */}
            <div>
              <label className="block font-semibold">Current Location:</label>
              <input
                type="text"
                value={`${formData.currentLat}, ${formData.currentLong}`}
                placeholder="Latitude, Longitude"
                className="w-full p-2 border rounded mt-1"
                readOnly
              />
              <div className="mt-2">
                <input type="radio" onClick={getCurrentLocation} id="auto-locate" />
                <label htmlFor="auto-locate" className="ml-2 text-sm">
                  Auto-fill my current location
                </label>
              </div>
            </div>
    
            {/* Destination */}
            <div className="relative">
              <label className="block font-semibold">Destination:</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter destination..."
                required
              />
              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow-md">
                  {suggestions.map((place, index) => (
                    <li
                      key={index}
                      onClick={() => selectDestination(place)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="text"
                  name="destLat"
                  value={formData.destLat}
                  className="w-full p-2 border rounded"
                  placeholder="Latitude"
                  readOnly
                />
                <input
                  type="text"
                  name="destLong"
                  value={formData.destLong}
                  className="w-full p-2 border rounded"
                  placeholder="Longitude"
                  readOnly
                />
              </div>
            </div>
    
            {/* Safety Parameters */}
            {[
              { label: "Light Intensity", name: "lightIntensity" },
              { label: "Traffic Density", name: "trafficDensity" },
              { label: "Crowd Density", name: "crowdDensity" },
              { label: "Crime Rate", name: "crimeRate" },
              { label: "Accident Rate", name: "accidentRate" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold">{field.label} (1-100):</label>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className="w-full p-2 border rounded mt-1"
                  required
                />
              </div>
            ))}
    
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Calculate Safety Score
            </button>
          </form>
        </div>
      );
}

export default RouteScorerForm
