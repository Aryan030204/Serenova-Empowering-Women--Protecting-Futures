import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import { Link } from "react-router";
import gsap from "gsap";
import { useEffect } from "react";

const HeroBanner = () => {
  useEffect(() => {
    gsap.fromTo(
      ".hero2",
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      ".hero1",
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="flex bg-purple-400 lg:w-full lg:h-[40vh] md:h-[17rem]">
      <div className="flex flex-col w-[60%]">
        <div className="w-full">
          <h1 className="text-white font-bold lg:text-7xl ml-[2rem] my-2 md:text-3xl md:mt-[1rem] drop-shadow-[0px_0px_1px_black] headerr">
            <span className="text-red-500">THEY</span> BUILT CAGES, <br /> SHE
            GREW <span className="text-blue-600">WINGS...</span>
          </h1>
        </div>
        <div className="w-full">
          <p className="text-white relative font-bold lg:ml-[2.5rem] lg:mt-4 md:text-sm md:ml-[2rem] drop-shadow-[0px_0px_1px_black]">
            Protection at your fingertips, <br /> because every woman deserves
            to feel secure!
          </p>
        </div>
        <div className="w-fit bg-white font-semibold p-2 shadow-lg relative lg:left-[2.5rem] top-3 border-none rounded-3xl cursor-pointer md:left-[1.8rem] hover:text-white hover:bg-black">
          <Link to="/login" className="md:text-sm">
            <button>JOIN NOW</button>
          </Link>
        </div>
      </div>
      <div className="flex w-[40%] gap-2">
        <img
          src={hero2}
          className="relative lg:top-[12.5rem] lg:left-[7rem] w-[32rem] h-[13rem] md:left-[-4rem] md:top-[5.5rem] hero2"
        />
        <img
          src={hero1}
          className="relative lg:bottom-[4.5rem] lg:h-[32rem] md:h-[22rem] lg:right-[1rem] md:bottom-[3rem] md:right-[8.5rem] hero1"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
