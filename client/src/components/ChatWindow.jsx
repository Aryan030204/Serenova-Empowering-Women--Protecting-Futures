import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import bot_avatar from "../assets/bot_avatar.png";
import axios from "axios";
import { SERVER_URL } from "../utils/config";

const ChatWindow = ({ setIsOpen }) => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchConversation = async () => {
    try {
      const res = await axios.get(
        SERVER_URL + `/${user._id}/chat/conversation/get`
      );
      setMessages(res.data.data[0].messages);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMsg = async (text) => {
    try {
      await axios.post(SERVER_URL + "/chat/message/send", {
        userId: user._id,
        text: text,
      });
      setMsg("");
      fetchConversation();
    } catch (err) {
      console.log(err);
    }
  };

  // Scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchConversation();
  }, []);

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

      {/* Messages */}
      <div className="h-[24rem] overflow-y-auto p-2 flex flex-col gap-2">
        {messages.map((i, j) =>
          i.sender === "bot" ? (
            <div key={j} className="flex items-start gap-2">
              <img src={bot_avatar} className="w-[2.5rem]" />
              <div className="bg-purple-600 text-white p-2 rounded-xl rounded-tl-none max-w-[80%] break-words">
                <h1>{i.text}</h1>
              </div>
            </div>
          ) : (
            <div key={j} className="flex justify-end items-start">
              <div className="bg-gray-700 text-white p-2 rounded-xl rounded-br-none max-w-[80%] break-words">
                <h1>{i.text}</h1>
              </div>
            </div>
          )
        )}
        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Chat input */}
      <div className="flex justify-between w-full p-2 h-[3.3rem]">
        <input
          type="text"
          className="w-full bg-white h-full rounded-lg p-1"
          value={msg}
          onChange={(i) => setMsg(i.target.value)}
        />
        <div className="flex justify-center items-center bg-black w-[2rem] ml-1 h-full rounded-xl">
          <button onClick={() => sendMsg(msg)}>
            <IoMdSend color="white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
