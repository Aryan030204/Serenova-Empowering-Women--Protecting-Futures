/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setFromLat,
  setToLat,
  setFromLong,
  setToLong,
  setTransportMode,
} from "../utils/routeSlice";
import { OPENWEATHER_API_KEY, SERVER_URL } from "../utils/config";

const RouteDetails = () => {
  const dispatch = useDispatch();
  // const SERVER_URL = import.meta.env.SERVER_URL;
  const user = useSelector((state) => state.user);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [mode, setMode] = useState("driving");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [coordinates, setCoordinates] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [saved, setSaved] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [saveBtnVisible, setSaveBtnVisible] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // Fetch current geolocation
  const detectLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lon = Number(pos.coords.longitude.toFixed(4));
        const loc = `${lat}, ${lon}`;
        setLocation(loc);

        try {
          const { data } = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const { country, state } = data?.address || {};
          setSelectedCountry(country || "");
          setSelectedState(state || "");
        } catch (err) {
          console.error("Failed to fetch location address:", err);
        }
      },
      (err) => console.error("Geolocation error:", err)
    );
  };

  // Load countries on mount
  useEffect(() => {
    detectLocation();
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const countryNames = res.data.map((c) => c.name.common).sort();
        setCountries(countryNames);
      })
      .catch((err) => console.error("Failed to fetch countries:", err));
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: selectedCountry,
        })
        .then((res) => setStates(res.data.data.states || []))
        .catch((err) => console.error("Failed to fetch states:", err));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  // Debounced suggestion fetcher
  const fetchLocationSuggestions = useCallback(
    (() => {
      let debounceTimer;
      return (query) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          if (query.length > 2) {
            setLoading(true);
            try {
              const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
              );
              setSuggestions(data);
            } catch (err) {
              console.error("Suggestion fetch failed:", err);
            } finally {
              setLoading(false);
            }
          } else {
            setSuggestions([]);
          }
        }, 300);
      };
    })(),
    []
  );

  const handleDestinationSelect = async (place) => {
    setDestination(place.display_name);
    setSuggestions([]);
    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place.display_name}`
      );
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates(`${lat}, ${lon}`);
      }
    } catch (err) {
      console.error("Failed to get destination coordinates:", err);
    }
  };

  const handleSaveRoute = async () => {
    if (!location || !coordinates) return console.error("Missing data");

    try {
      const [lat, lon] = location.split(",").map(Number);
      const [destLat, destLon] = coordinates.split(",").map(Number);

      const [currentNameRes, destNameRes] = await Promise.all([
        axios.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
        ),
        axios.get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${destLat}&lon=${destLon}&appid=${OPENWEATHER_API_KEY}`
        ),
      ]);

      await axios.post(
        `${SERVER_URL}/route/save`,
        {
          userId: user.user._id,
          currentLocation: [lat, lon],
          destinationLocation: [destLat, destLon],
          currentLocationName: currentNameRes?.data?.[0]?.name || "Unknown",
          destinationLocationName: destNameRes?.data?.[0]?.name || "Unknown",
        },
        { withCredentials: true }
      );

      setSaved(true);
      setAlreadySaved(false);
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      setAlreadySaved(true);
      setTimeout(() => setAlreadySaved(false), 4000);
      console.error("Route save failed:", err);
    }
  };

  const handleGetRoute = () => {
    const [fromLat, fromLong] = location.split(",");
    const [toLat, toLong] = coordinates.split(",");
    dispatch(setFromLat(fromLat));
    dispatch(setFromLong(fromLong));
    dispatch(setToLat(toLat));
    dispatch(setToLong(toLong));
    dispatch(setTransportMode(mode));
    setTimeout(() => setSaveBtnVisible(true), 2000);
  };

  return (
    <div className="flex flex-col p-10 my-12 h-[45.3rem] gap-2 bg-slate-300 w-[31rem]">
      <h1 className="font-bold text-2xl text-center">SAFE ROUTE PLANNER</h1>

      {/* Current Location */}
      <div className="flex flex-col w-full h-1/3 text-center mt-8 gap-4">
        <h1 className="text-start font-semibold text-xl">
          Enter Current location
        </h1>

        <input
          type="text"
          placeholder="Area"
          className="text-center p-1 dest"
          value={useCurrentLocation ? location : ""}
          onChange={(e) => setLocation(e.target.value)}
          readOnly={useCurrentLocation}
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={useCurrentLocation}
            onChange={(e) => {
              setUseCurrentLocation(e.target.checked);
              if (e.target.checked) detectLocation();
              else {
                setLocation("");
                setSelectedCountry("");
                setSelectedState("");
              }
            }}
          />
          Detect location
        </label>

        <div className="flex gap-4 justify-center">
          <select
            className="text-center p-1 w-[10rem]"
            onChange={(e) => setSelectedCountry(e.target.value)}
            value={selectedCountry}
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            className="text-center p-1 w-[10rem]"
            onChange={(e) => setSelectedState(e.target.value)}
            value={selectedState}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Destination Input */}
      <div className="flex flex-col h-1/3 w-full mt-4 relative">
        <h1 className="text-start font-semibold text-xl mb-2">
          Enter Destination
        </h1>

        <input
          type="text"
          placeholder="Search for a place..."
          className="text-center p-1 border border-gray-400 rounded-md"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            fetchLocationSuggestions(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Coordinates"
          className="text-center p-1 border border-gray-400 rounded-md mt-2"
          value={coordinates}
          readOnly
        />

        {loading && <p className="text-gray-500 text-sm mt-1">Loading...</p>}

        {suggestions.length > 0 && (
          <ul className="absolute top-[7.5rem] w-full bg-white border border-gray-400 rounded-md max-h-[100px] overflow-y-auto shadow-lg z-10">
            {suggestions.map((place, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleDestinationSelect(place)}
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* mode of transport */}
      <div className="flex flex-col h-1/3 w-full mt-4 relative">
        <label className="text-xl font-semibold">Mode of transport</label>
        <ul className="flex items-center gap-4 my-3 w-full">
          <li>
            <input
              type="radio"
              name="transport"
              value="driving"
              checked={mode === "driving"}
              onChange={(e) => setMode(e.target.value)}
            />
            <label className="text-lg ml-2">Car</label>
          </li>
          <li>
            <input
              type="radio"
              name="transport"
              value="cycling"
              checked={mode === "cycling"}
              onChange={(e) => setMode(e.target.value)}
            />
            <label className="text-lg ml-2">Cycling</label>
          </li>
          <li>
            <input
              type="radio"
              name="transport"
              value="foot"
              checked={mode === "foot"}
              onChange={(e) => setMode(e.target.value)}
            />
            <label className="text-lg ml-2">Foot</label>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-3 mt-10">
        <button
          className="text-white w-[9rem] h-[3rem] text-xl p-2 font-bold bg-green-500 rounded"
          onClick={handleGetRoute}
        >
          GET ROUTE
        </button>

        {saveBtnVisible && (
          <button
            className="text-white p-2 font-semibold bg-blue-500 rounded-xl text-[18px]"
            onClick={handleSaveRoute}
          >
            Save Route
          </button>
        )}

        <h1 className="text-green-600 font-semibold underline">
          {saved && "Route saved successfully"}
          {alreadySaved && "Route already saved!"}
        </h1>
      </div>
    </div>
  );
};

export default RouteDetails;
