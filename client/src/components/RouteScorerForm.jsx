import axios from "axios";
import { useState, useEffect } from "react";
import { PYTHON_APP_URL } from "../utils/config";

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

  const [safetyScore, setSafetyScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ----------------- Location Handling -----------------
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }

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
  };

  // ----------------- Location Suggestions -----------------
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (formData.destination.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formData.destination}`
        );
        const data = await res.json();
        setSuggestions(data.slice(0, 5)); // limit to top 5
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounce);
  }, [formData.destination]);

  const selectDestination = (place) => {
    setFormData((prev) => ({
      ...prev,
      destination: place.display_name,
      destLat: place.lat,
      destLong: place.lon,
    }));
    setSuggestions([]);
  };

  // ----------------- Input Change Handler -----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ----------------- Form Submission -----------------
  const calculateSafetyScore = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(PYTHON_APP_URL + "/predict", {
        lat1: formData.currentLat,
        lon1: formData.currentLong,
        lat2: formData.destLat,
        lon2: formData.destLong,
        light_intensity: formData.lightIntensity,
        traffic_density: formData.trafficDensity,
        crowd_density: formData.crowdDensity,
        crime_rate: formData.crimeRate,
        accident_rate: formData.accidentRate,
      });

      setSafetyScore(res.data.safety_score);
    } catch (err) {
      console.error("Error predicting safety score:", err);
      alert("Error predicting safety score. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------- Component JSX -----------------
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-200 rounded-lg shadow-lg mt-6 border-2 border-purple-500">
      <h2 className="text-2xl font-bold text-center mb-4">Safety Score Calculator</h2>

      <form onSubmit={calculateSafetyScore} className="space-y-4">
        {/* Current Location */}
        <div>
          <label className="block font-semibold">Current Location:</label>
          <input
            type="text"
            value={`${formData.currentLat || "--"}, ${formData.currentLong || "--"}`}
            className="w-full p-2 border rounded mt-1"
            readOnly
          />
          <div className="mt-2">
            <input type="checkbox" id="auto-locate" onClick={getCurrentLocation} />
            <label htmlFor="auto-locate" className="ml-2 text-sm">
              Auto-fill my current location
            </label>
          </div>
        </div>

        {/* Destination Search */}
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

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow-md max-h-40 overflow-y-auto">
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
        ].map((param) => (
          <div key={param.name}>
            <label className="block font-semibold">{param.label} (1-100):</label>
            <input
              type="number"
              name={param.name}
              value={formData[param.name]}
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
          disabled={isLoading}
          className={`w-full bg-purple-600 text-white p-2 rounded font-semibold transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        >
          {isLoading ? "Calculating..." : "Calculate Safety Score"}
        </button>

        {safetyScore !== null && (
          <h1 className="text-green-600 font-bold text-xl text-center">
            Safety Score: {Math.round(safetyScore)}%
          </h1>
        )}
      </form>
    </div>
  );
};

export default RouteScorerForm;
