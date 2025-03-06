/* eslint-disable react/no-unescaped-entities */
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { login } from "../utils/userSlice";
const Login = () => {
  const [hidden, isHidden] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

  })
  const handleLogin = async () => {
    try {
      
      const res = await axios.post(
        SERVER_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Logged in successfully");
      setTimeout(() => {
        dispatch(login(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate("/");
      },3000);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative flex flex-col justify-evenly items-center mt-[5rem] shadow-lg bg-white border-0 rounded-lg w-[30rem] h-[35rem]">
          <h1 className="font-bold text-2xl">Login to your Account</h1>
          <div className="flex flex-col justify-center items-center w-full relative bottom-[3rem]">
            <form action="" className="flex flex-col gap-[1rem]">
              <div className="flex flex-col">
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-[20rem]"
                  variant="filled"
                />
              </div>
              <div className="flex justify-center items-center">
                <TextField
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={hidden ? "text" : "password"}
                  variant="filled"
                  className="w-[20rem]"
                />
                <div
                  className="flex w-fit absolute right-[5.5rem] cursor-pointer"
                  onClick={() => {
                    isHidden(!hidden);
                  }}
                >
                  {hidden ? <EyeOff /> : <Eye />}
                </div>
              </div>
              <div className="flex flex-col">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </Button>
              </div>
            </form>
            <h1 className="relative top-4 font-semibold">
              don't have an account ?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </h1>
            <ToastContainer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
