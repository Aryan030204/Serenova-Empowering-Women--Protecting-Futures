import { useState } from "react";

const EmergencyNums = ({ nums }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyNumber = (num, index) => {
    navigator.clipboard.writeText(num);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-2 gap-4 justify-center items-center">
      {nums.map((i, index) => (
        <div
          key={index}
          className="flex flex-col p-4 h-fit justify-start items-center bg-purple-300 rounded-2xl"
        >
          <h1 className="font-bold text-xl">{i[0]}</h1>
          <h2 className="text-red-500 font-semibold">{i[1]}</h2>
          <button
            className="bg-red-500 text-white p-[6px] text-sm rounded-lg font-semibold mt-2"
            onClick={() => copyNumber(i[1], index)}
          >
            {copiedIndex === index ? "Copied" : "Copy"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default EmergencyNums;
