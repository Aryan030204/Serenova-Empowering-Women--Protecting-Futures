import { useEffect, useState } from "react";

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
      className={`w-full h-full bg-red-200 rounded-2xl rounded-br-none shadow-xl drop-shadow-lg outline-double outline-2 transition-all duration-300 ease-in-out 
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
    </div>
  );
};

export default ChatWindow;
