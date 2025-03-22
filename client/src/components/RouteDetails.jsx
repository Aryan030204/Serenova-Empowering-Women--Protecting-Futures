import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setFromLat,
  setToLat,
  setFromLong,
  setToLong,
} from "../utils/routeSlice";
import { OPENWEATHER_API_KEY, SERVER_URL } from "../utils/config";
import { useSelector } from "react-redux";

const RouteDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState("");
  const [saved, setSaved] = useState(false);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = Number(position.coords.latitude.toFixed(4));
        const lon = Number(position.coords.longitude.toFixed(4));
        setLocation(`${lat}, ${lon}`);

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          if (response.data.address) {
            setSelectedCountry(response.data.address.country || "");
            setSelectedState(response.data.address.state || "");
          }
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };
  useEffect(() => {
    getLocation();
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryNames = response.data
          .map((country) => country.name.common)
          .sort();
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: selectedCountry,
        })
        .then((response) => {
          setStates(response.data.data.states || []);
        })
        .catch((error) => console.error("Error fetching states:", error));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  const fetchLocationSuggestions = useCallback(
    (() => {
      let timer;
      return (query) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          if (query.length > 2) {
            setLoading(true);
            try {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
              );
              setSuggestions(response.data);
            } catch (error) {
              console.error("Error fetching location suggestions:", error);
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

  const handleSelectDestination = async (place) => {
    setDestination(place.display_name);
    setSuggestions([]);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place.display_name}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordinates(`${lat}, ${lon}`);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRoute = async () => {
    if (!location || !coordinates) {
      console.error("Missing location data");
      return;
    }

    try {
      const [lat, lon] = location.split(",").map(Number);
      const [destLat, destLon] = coordinates.split(",").map(Number);

      const currentNameRes = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      );
      const destNameRes = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${destLat}&lon=${destLon}&appid=${OPENWEATHER_API_KEY}`
      );

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
      console.log("route saved");

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 4000);
    } catch (err) {
      console.error("Error saving route:", err);
    }
  };
  return (
    <div className="flex flex-col p-10 my-[3rem] h-[45.3rem] gap-2 bg-slate-300 w-[31rem]">
      <h1 className="font-bold text-2xl text-center">SAFE ROUTE PLANNER</h1>

      <div className="flex flex-col w-full h-1/3 text-center">
        <div className="flex flex-col gap-2 mt-[2rem]">
          <h1 className="text-start font-semibold text-xl">
            ENTER CURRENT LOCATION
          </h1>
          <input
            type="text"
            placeholder="Area"
            className="currname text-center p-1 dest"
          />

          <div className="flex gap-2">
            <input
              type="checkbox"
              onChange={async (e) => {
                if (e.target.checked) {
                  getLocation();
                  document.querySelector(".dest").value = location;
                } else {
                  document.querySelector(".dest").value = "";
                  setSelectedCountry("");
                  setSelectedState("");
                }
              }}
            />
            <label htmlFor="l">Detect location</label>
          </div>

          <div className="flex justify-evenly items-center gap-[2rem]">
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
      </div>

      {/* Destination Input with Autocomplete */}
      <div className="flex flex-col h-1/3 w-full text-center relative">
        <div className="flex flex-col gap-2 mt-[2rem]">
          <h1 className="text-start font-semibold text-xl">
            ENTER DESTINATION
          </h1>
          <input
            type="text"
            placeholder="Search for a place..."
            className="destname text-center p-1 border border-gray-400 rounded-md"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              fetchLocationSuggestions(e.target.value);
            }}
          />

          {/* Coordinates Field (Auto-filled) */}
          <input
            type="text"
            className="text-center p-1 border border-gray-400 rounded-md"
            placeholder="Coordinates"
            value={coordinates}
            readOnly
          />

          {/* Loading Spinner */}
          {loading && <div className="text-gray-500 text-sm">Loading...</div>}

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute top-[92px] left-0 w-full bg-white border border-gray-400 rounded-md mt-2 max-h-[100px] overflow-y-auto shadow-lg z-10">
              {suggestions.map((place, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-300"
                  onClick={() => handleSelectDestination(place)}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex gap-[1rem] relative top-10 items-center flex-col text-center">
        <button
          className="text-white w-[9rem] h-[3rem] text-xl p-2 font-bold bg-green-500"
          onClick={() => {
            dispatch(setFromLat(location.split(",")[0]));
            dispatch(setFromLong(location.split(",")[1]));
            dispatch(setToLat(coordinates.split(",")[0]));
            dispatch(setToLong(coordinates.split(",")[1]));
            setTimeout(() => {
              document.querySelector(".saveRoute").style.display = "block";
            }, 2000);
          }}
        >
          GET ROUTE
        </button>
        <button
          className="hidden text-white p-2 items-center font-semibold bg-blue-500 rounded-xl text-[18px] saveRoute"
          onClick={handleSaveRoute}
        >
          Save Route
        </button>
        <h1 className="text-green-600 font-semibold underline">
          {saved ? "route saved successfully" : ""}
        </h1>
      </div>
    </div>
  );
};

export default RouteDetails;
