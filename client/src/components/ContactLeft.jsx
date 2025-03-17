/* eslint-disable react/no-unescaped-entities */
import React from "react";
import rightArrow from "../assets/rightArrow.png";

const ContactLeft = () => {
  return (
    <div className="flex flex-col w-1/2 gap-[2rem]">
      <div className="flex flex-col gap-[4rem]">
        <div className="w-full">
          <h1 className="text-3xl mb-3 font-semibold text-purple-700">CONTACT</h1>
          <p className="font-bold text-5xl mb-2">
            REACH OUT AND <br /> <span className="text-purple-800">CONNECT</span>
          </p>
          <p className="font-semibold text-xl">Let's collaborate to make your journeys safer and smarter!</p>
        </div>
        <div className="w-full">
          <h1 className="font-bold text-xl">
            Don't hesitate—discover how we <br /> can enhance your travel safety
            and efficiency:
          </h1>
          <ul className="flex flex-col mt-[2rem] gap-4 text-lg font-semibold">
            <li className="flex items-center gap-[1rem]">
              <img src={rightArrow} />
              <p>Schedule a call or demo</p>
            </li>
            <li className="flex items-center gap-[1rem]">
              <img src={rightArrow} />
              <p>Learn more about careers</p>
            </li>
            <li className="flex items-center gap-[1rem]">
              <img src={rightArrow} />
              <p>Ask general questions</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactLeft;
