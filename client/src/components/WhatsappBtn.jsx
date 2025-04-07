import whatsapp from "../assets/whatsapp.png";
import { Link } from "react-router";

const WhatsappBtn = () => {
  return (
    <div className="flex items-center justify-center bg-green-400 rounded-full p-2 font-bold text-white gap-1">
      <img src={whatsapp} className="w-6" />
      <Link>
        <button>Connect</button>
      </Link>
    </div>
  );
};

export default WhatsappBtn;
