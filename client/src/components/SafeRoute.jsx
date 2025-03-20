import { Circle } from "lucide-react";
import { Link } from "react-router";
import { useCallback, useState } from "react";
import Map from "./Map";
import Map2 from "./Map2";
import Map3 from "./Map3";
import { predictSafetyScore } from "../utils/api";

const SafeRoute = () => {
  const fromLat = parseFloat(localStorage.getItem("fromLat"));
  const fromLong = parseFloat(localStorage.getItem("fromLong"));
  const toLat = parseFloat(localStorage.getItem("toLat"));
  const toLong = parseFloat(localStorage.getItem("toLong"));

  const [scores, setScores] = useState({ red: "", orange: "", green: "" });

  const getSafetyScore = useCallback(
    async (routeType, latOffset, longOffset) => {
      const score = await predictSafetyScore(
        fromLat + latOffset,
        fromLong + longOffset,
        toLat,
        toLong
      );
      setScores((prev) => ({ ...prev, [routeType]: score }));
    },
    [fromLat, fromLong, toLat, toLong]
  );

  return (
    <div className="flex flex-col p-10 my-[3rem] w-[31rem] h-fit gap-5 bg-slate-300 items-center">
      <h1 className="font-bold text-2xl text-center">SAFE ROUTES HERE</h1>
      {[{ comp: Map, color: "green", label: "Route 1", route: "green", lat: 0.1, long: 0.1 },
        { comp: Map2, color: "orange", label: "Route 2", route: "orange", lat: 2, long: 2 },
        { comp: Map3, color: "red", label: "Route 3", route: "red", lat: 1, long: 1 }].map(({ comp: MapComponent, color, label, route, lat, long }) => (
        <div key={route} className="flex justify-between items-center w-full gap-4">
          <div className="flex w-full items-center">
            <div className="flex gap-2 items-center w-full">
              <MapComponent />
              <Circle size={15} color={color} />
              <p>
                {label} {" "}
                <span className={`text-${color}-500 font-bold text-[12px]`}>{`(${Math.round(scores[route])}%)`}</span>
              </p>
            </div>
            <button
              className="bg-red-500 rounded-xl whitespace-nowrap p-[5px] text-[12px] text-white font-semibold"
              onClick={() => getSafetyScore(route, lat, long)}
            >
              Get Safety Score
            </button>
          </div>
        </div>
      ))}
      <h1 className="text-center relative top-5 text-sm">
        Want to know about how routes are scored ? {" "}
        <Link to={"/routescorer"} className="text-blue-500 underline">
          Know here
        </Link>
      </h1>
    </div>
  );
};

export default SafeRoute;
