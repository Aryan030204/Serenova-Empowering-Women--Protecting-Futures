import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const RouteDetails = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [allowLocation, setAllowLocation] = useState(false);
  const [location, setLocation] = useState("");
  console.log(location);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords.latitude + " " + position.coords.longitude);
    });
    setAllowLocation(true);
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

  return (
    <div className="flex flex-col p-10 my-[3rem] h-[40rem] gap-2 bg-slate-300 w-[31rem]">
      <h1 className="font-bold text-2xl text-center">SAFE ROUTE PLANNER</h1>
      <div className="flex flex-col w-full h-1/3 text-center">
        <div className="flex flex-col gap-2 mt-[2rem]">
          <h1 className="text-start font-semibold text-xl">
            ENTER CURRENT LOCATION
          </h1>
          <div className="flex flex-col gap-[1rem]">
            <input type="text" placeholder="Area" className="text-center p-1 dest" />
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={(e) => {
                  if(e.target.checked){
                    document.querySelector(".dest").value = location;
                  }else {
                    document.querySelector(".dest").value = "";
                  }
                }}
              />
              <label htmlFor="l">detect location</label>
            </div>
            <div className="flex justify-evenly items-center gap-[2rem] ">
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
      </div>
      <div className="flex flex-col h-1/3 w-full text-center">
        <div className="flex flex-col gap-2 mt-[2rem]">
          <h1 className="text-start font-semibold text-xl">
            ENTER DESTINATION
          </h1>
          <div className="flex flex-col mt-[1rem] gap-2">
            <input type="text" placeholder="Area" className="text-center p-1" />
          </div>
        </div>
      </div>
      <div className="flex gap-[1rem] items-center flex-col text-center ">
        <button className="text-white w-[9rem] h-[3rem] text-xl p-2 font-bold bg-green-500">
          <Link to={""}>GET ROUTE</Link>
        </button>
        <Link to="">
          <button className="text-white p-2 items-center font-semibold bg-red-500 rounded-xl text-[13px]">
            <Link to={""}>QUICK HELP</Link>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RouteDetails;
