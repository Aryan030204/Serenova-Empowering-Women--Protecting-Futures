import { PhoneCall } from "lucide-react";

const Help = () => {
  const copyNumber = (num) => {
    navigator.clipboard.writeText(num);
  };
  return (
    <div className="flex flex-col gap-[2rem] my-[2rem]">
      <h1 className="text-center text-3xl font-bold">
        📞 EMERGENCY/HELPLINE NUMBERS 📞
      </h1>
      <div className="flex justify-evenly items-start p-[2rem]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 border p-4">
            <div className="flex gap-2 items-center">
              <PhoneCall size={20} />
              <h1 className="text-xl font-semibold women">
                Women Helpline: 1091
              </h1>
            </div>
            <div>
              <button
                className="bg-purple-500 rounded-[5px] p-[5px] text-center text-white font-bold copyWomen"
                onClick={copyNumber(1091)}
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 border p-4">
            <div className="flex gap-2 items-center">
              <PhoneCall size={20} />
              <h1 className="text-xl font-semibold">Child Helpline: 1098</h1>
            </div>
            <div>
              <button className="bg-purple-500 rounded-[5px] p-[5px] text-center text-white font-bold" onClick={copyNumber(1098)}>
                Copy
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 border p-4">
            <div className="flex gap-2 items-center">
              <PhoneCall size={20} />
              <h1 className="text-xl font-semibold">Police: 100</h1>
            </div>
            <div>
              <button className="bg-purple-500 rounded-[5px] p-[5px] text-center text-white font-bold" onClick={copyNumber(100)}>
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 border p-4">
            <div className="flex gap-2 items-center">
              <PhoneCall size={20} />
              <h1 className="text-xl font-semibold">Fire: 101</h1>
            </div>
            <div>
              <button className="bg-purple-500 rounded-[5px] p-[5px] text-center text-white font-bold" onClick={copyNumber(101)}>
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 border p-4">
            <div className="flex gap-2 items-center">
              <PhoneCall size={20} />
              <h1 className="text-xl font-semibold">Ambulance: 102</h1>
            </div>
            <div>
              <button className="bg-purple-500 rounded-[5px] p-[5px] text-center text-white font-bold" onClick={copyNumber(102)}>
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
