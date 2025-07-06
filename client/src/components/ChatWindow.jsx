import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";

const ChatWindow = ({ setIsOpen }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div
      className={`flex flex-col justify-between w-full h-full bg-red-200 rounded-2xl rounded-br-none shadow-xl drop-shadow-lg outline-double outline-1 transition-all duration-300 ease-in-out 
      ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
    >
      {/* Close button */}
      <div className="flex justify-end p-2">
        <button className="font-bold hover:underline" onClick={handleClose}>
          <h1 className="text-white text-md bg-black p-1 w-[2rem] h-[2rem] rounded-full">
            X
          </h1>
        </button>
      </div>

      {/* Chat content here */}
      <div className="flex justify-between w-full p-2 h-[3.3rem]">
        <input type="text" className="w-full bg-white h-full rounded-lg p-1" name="" id="" />
        <div className="flex justify-center items-center bg-black w-[2rem] ml-1 h-full rounded-xl">
          <button>
            <IoMdSend color="white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
