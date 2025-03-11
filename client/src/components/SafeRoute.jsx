import { Circle } from "lucide-react";
import { Link } from "react-router";
const SafeRoute = () => {
  return (
    <div className="flex flex-col p-10 my-[3rem] w-[31rem] h-[40rem] gap-5 bg-slate-300 items-center">
      <h1 className="font-bold text-2xl text-center">SAFE ROUTES HERE</h1>
      <div className="flex items-center flex-col gap-[2rem] justify-center w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d112304.91549228161!2d77.3193728!3d28.4033024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1741675462156!5m2!1sen!2sin"
          width="350"
          height="350"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <div className="flex flex-col gap-2 w-[70%]">
          <div className="flex justify-between w-full">
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
          <div className="flex justify-between w-full">
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
          <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center w-full">
              <Circle size={15} color="red" />
              <p>
                Route 3 (<span>50%</span> safe)
              </p>
            </div>
            <Link to="/">
              <button className="bg-red-500 rounded-xl whitespace-nowrap p-[5px] text-[12px] text-white font-semibold">
                Report unsafe
              </button>
            </Link>
          </div>
        </div>
        <h1 className="text-sm">
          Want to know how safe routes are identified? <Link to={""} className="text-blue-700 underline">Know here</Link>
        </h1>
      </div>
    </div>
  );
};

export default SafeRoute;
