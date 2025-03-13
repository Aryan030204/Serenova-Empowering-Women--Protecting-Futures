import guide1 from "../assets/guide1.png";
import guide2 from "../assets/guide2.png";
import CustomButton from "./CustomButton";
const WhatToDo = () => {
  return (
    <>
      <div className="flex flex-col gap-[1rem] w-full items-center font-handwriting bg-purple-400 p-6">
        <div className="flex items-center justify-center text-center">
          <h1 className="lg:text-6xl md:text-4xl text-red-500">What you can do...</h1>
        </div>
        <div className="flex items-center justify-evenly gap-[2rem]">
          <div className="flex justify-start items-center relative">
            <img
              src={guide1}
              alt="guide1"
              className="absolute z-1 lg:right-[30rem] lg:top-[-5rem] lg:w-[29rem] lg:h-[25rem] md:right-[9rem] md:top-[-1rem] md:w-[19rem] md:h-[20rem]"
            />
            <div className="flex flex-col gap-[1rem] font-sans text-center relative z-2 lg:right-[15rem] md:right-2">
              <div className="flex gap-[3rem] items-center">
                <div className="flex flex-col border-none p-[1rem] bg-red-200 md:text-sm">
                  <h1 className="font-bold lg:text-lg">Choose Safe routes</h1>
                  <p>
                    Stick to well-lit, busy <br /> streets, <br /> and avoid
                    isolated <br /> shortcuts
                  </p>
                </div>
                <div className="flex flex-col border-none p-[1rem] bg-red-200 md:text-sm">
                  <h1 className="font-bold lg:text-lg">Choose Safe routes</h1>
                  <p>
                    Stick to well-lit, busy <br /> streets, <br /> and avoid
                    isolated <br /> shortcuts
                  </p>
                </div>
              </div>
              <div className="flex gap-[3rem] items-center">
                <div className="flex flex-col border-none p-[1rem] bg-red-200 md:text-sm">
                  <h1 className="font-bold lg:text-lg">Choose Safe routes</h1>
                  <p>
                    Stick to well-lit, busy <br /> streets, <br /> and avoid
                    isolated <br /> shortcuts
                  </p>
                </div>
                <div className="flex flex-col border-none p-[1rem] bg-red-200 md:text-sm">
                  <h1 className="font-bold lg:text-lg">Choose Safe routes</h1>
                  <p>
                    Stick to well-lit, busy <br /> streets, <br /> and avoid
                    isolated <br /> shortcuts
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center font-mono font-extrabold lg:text-6xl md:text-4xl relative lg:right-[10%] md:right-3">
            <h1>OR</h1>
          </div>
          <div className="flex justify-center items-center gap-[2rem] font-sans font-bold">
            <div className="flex h-full items-center justify-center relative lg:left-[9rem]">
              <CustomButton title={"Download Our App"} color={"red"} />
            </div>

            <img
              src={guide2}
              alt="guide2"
              className="md:hidden lg:block absolute lg:right-[1rem] lg:bottom-[-45.2rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatToDo;
