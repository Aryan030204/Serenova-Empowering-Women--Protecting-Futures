/* eslint-disable react/prop-types */
import male from "../assets/male.png";
import female from "../assets/female.png";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Prevent rendering if user is null
  if (!user) return null;

  const handleLogout = async () => {
    try {
      await axios.post(SERVER_URL + "/logout");

      dispatch(logout()); // Instantly update Redux
      toast.success("Logged out successfully");

      // Redirect after toast (optional delay)
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 w-[15rem]">
      <img
        src={user.gender === "male" ? male : female}
        alt="dp_avatar"
        className="w-[2.2rem] border-none rounded-full"
      />
      <h1 className="whitespace-nowrap font-bold mr-5">
        Hello, <span className="text-blue-500 font-bold">{user.firstName}</span>
      </h1>
      <button
        className="border-none bg-red-500 rounded-xl text-sm font-bold text-white p-[6px]"
        onClick={handleLogout}
      >
        Logout
      </button>
      <ToastContainer />
    </div>
  );
};

export default Profile;
