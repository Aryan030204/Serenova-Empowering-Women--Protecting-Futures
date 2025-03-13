import { Circle } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
const SafeRoute = () => {
  const { fromLat, toLat, fromLong, toLong } = useSelector(
    (state) => state.route
  );
  return (
    <div className="flex flex-col p-10 my-[3rem] w-[31rem] h-fit gap-5 bg-slate-300 items-center">
      <h1 className="font-bold text-2xl text-center">SAFE ROUTES HERE</h1>
      <div className="flex justify-between items-center w-full gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3658.451509532986!2d75.06736934364392!3d23.51625770000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d28.395583799999997!2d77.28764559999999!4m5!1s0x3be7c631dcb145d9%3A0xed2e7c2011a11141!2sGhatkopar%20East%2C%20Mumbai%2C%20Maharashtra!3m2!1d19.078598799999998!2d72.91014559999999!5e0!3m2!1sen!2sin!4v1741844292035!5m2!1sen!2sin"
          width="170"
          height="170"
        ></iframe>
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3658.451509532986!2d75.06736934364392!3d23.51625770000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d28.395583799999997!2d77.28764559999999!4m5!1s0x3be7c631dcb145d9%3A0xed2e7c2011a11141!2sGhatkopar%20East%2C%20Mumbai%2C%20Maharashtra!3m2!1d19.078598799999998!2d72.91014559999999!5e0!3m2!1sen!2sin!4v1741844292035!5m2!1sen!2sin"
          width="170"
          height="170"
        ></iframe>
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3658.451509532986!2d75.06736934364392!3d23.51625770000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d28.395583799999997!2d77.28764559999999!4m5!1s0x3be7c631dcb145d9%3A0xed2e7c2011a11141!2sGhatkopar%20East%2C%20Mumbai%2C%20Maharashtra!3m2!1d19.078598799999998!2d72.91014559999999!5e0!3m2!1sen!2sin!4v1741844292035!5m2!1sen!2sin"
          width="170"
          height="170"
        ></iframe>
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
      <h1 className="text-center">
        Want to know about how routes are scored ?{" "}
        <Link to={""} className="text-blue-500 underline">
          Know more
        </Link>
      </h1>
    </div>
  );
};

export default SafeRoute;
