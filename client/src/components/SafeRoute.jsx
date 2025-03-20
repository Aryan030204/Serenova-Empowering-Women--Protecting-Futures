import { Circle } from "lucide-react";
import { Link } from "react-router";
import Map from "./Map";
import Map2 from "./Map2";
import Map3 from "./Map3";
import { predictSafetyScore } from "../utils/api";
import { useState } from "react";
const SafeRoute = () => {
  const fromLat = parseFloat(localStorage.getItem("fromLat"));
  const fromLong = parseFloat(localStorage.getItem("fromLong"));
  const toLat = parseFloat(localStorage.getItem("toLat"));
  const toLong = parseFloat(localStorage.getItem("toLong"));
  const [red, setRed] = useState("");
  const [orange, setOrange] = useState("");
  const [green, setGreen] = useState("");

  const getRedScore = async () => {
    const score = await predictSafetyScore(
      fromLat + 1,
      fromLong + 1,
      toLat,
      toLong
    );
    setRed(score);
  };
  const getOrangeScore = async () => {
    const score = await predictSafetyScore(
      fromLat + 2,
      fromLong + 2,
      toLat,
      toLong
    );
    setOrange(score);
  };

  const getGreenScore = async () => {
    const score = await predictSafetyScore(
      fromLat + 0.1,
      fromLong + 0.1,
      toLat,
      toLong
    );
    setGreen(score);
  };
  return (
    <div className="flex flex-col p-10 my-[3rem] w-[31rem] h-fit gap-5 bg-slate-300 items-center">
      <h1 className="font-bold text-2xl text-center">SAFE ROUTES HERE</h1>
      <div className="flex justify-between items-center w-full gap-4">
        <div className="flex w-full items-center">
          <div className="flex gap-2 items-center w-full">
            <Map />
            <Circle size={15} color="green" />
            <p>
              Route 1{" "}
              <span className="text-green-600 font-bold text-[12px]">{`(${Math.round(
                green
              )}%)`}</span>
            </p>
          </div>
          <button
            className="bg-red-500 rounded-xl whitespace-nowrap p-[5px] text-[12px] text-white font-semibold"
            onClick={getGreenScore}
          >
            Get safety Score
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        <div className="flex w-full items-center">
          <div className="flex gap-2 items-center w-full">
            <Map2 />
            <Circle size={15} color="orange" />
            <p>
              Route 2{" "}
              <span className="text-orange-500 text-[12px] font-bold">{`(${Math.round(
                orange
              )}%)`}</span>
            </p>
          </div>
          <button
            className="bg-red-500 rounded-xl whitespace-nowrap p-[5px] text-[12px] text-white font-semibold"
            onClick={getOrangeScore}
          >
            Get Safety Score
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        <div className="flex w-full items-center">
          <div className="flex gap-2 items-center w-full">
            <Map3 />
            <Circle size={15} color="red" />
            <p>
              Route 1{" "}
              <span className="text-red-600 font-bold text-[12px]">{`(${Math.floor(
                red
              )}%)`}</span>
            </p>
          </div>
          <button
            className="bg-red-500 rounded-xl whitespace-nowrap p-[5px] text-[12px] text-white font-semibold"
            onClick={getRedScore}
          >
            Get Safety Score
          </button>
        </div>
      </div>
      <h1 className="text-center relative top-5 text-sm">
        Want to know about how routes are scored ?{" "}
        <Link to={""} className="text-blue-500 underline">
          Know here
        </Link>
      </h1>
    </div>
  );
};

export default SafeRoute;
