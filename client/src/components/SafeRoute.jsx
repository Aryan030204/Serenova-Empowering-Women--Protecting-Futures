import { Circle } from "lucide-react";
import { Link } from "react-router";
import Map from "./Map";
const SafeRoute = () => {
  return (
    <div className="flex flex-col p-10 my-[3rem] w-[31rem] h-fit gap-5 bg-slate-300 items-center">
      <Map/>
      <h1 className="font-bold text-2xl text-center">SAFE ROUTES HERE</h1>
      <div className="flex justify-between items-center w-full gap-4">
        
        <div className="flex w-full">
          <div className="flex gap-2 items-center w-full">
            <Circle size={15} color="green" />
            <p>
              Route 1 (<span>90%</span> safe)
            </p>
          </div>
          <Link to="/">
            <button className="bg-red-500 rounded-xl whitespace-nowrap p-[5px] text-[12px] text-white font-semibold">
              Report unsafe
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        
        <div className="flex w-full">
          <div className="flex gap-2 items-center w-full">
            <Circle size={15} color="orange" />
            <p>
              Route 2 (<span>75%</span> safe)
            </p>
          </div>
          <Link to="/">
            <button className="bg-red-500 rounded-xl whitespace-nowrap p-[5px] text-[12px] text-white font-semibold">
              Report unsafe
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center w-full gap-4">
        <div className="flex w-full">
          <div className="flex gap-2 items-center w-full">
            <Circle size={15} color="red" />
            <p>
              Route 1 (<span>50%</span> safe)
            </p>
          </div>
          <Link to="/">
            <button className="bg-red-500 rounded-xl whitespace-nowrap p-[5px] text-[12px] text-white font-semibold">
              Report unsafe
            </button>
          </Link>
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
