import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { RENDER_SERVER_URL, SERVER_URL } from "../utils/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import QuoteBox from "../components/QuoteBox";
const Signup = () => {
  const [hidden, isHidden] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(undefined);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        SERVER_URL + "/signup",
        {
          firstName,
          lastName,
          age,
          gender,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Account created successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div>
          <div className="relative right-[18rem]">
            <QuoteBox
              quote={
                "No one can limit a woman who believes in her potential and takes action to achieve her goals."
              }
              bcolor={"border-red-500"}
              bgcolor={"bg-red-100"}
            />
          </div>
          <div className="relative right-[2rem] top-12">
            <QuoteBox
              quote={
                "You are powerful, brilliant, and enough—never let the world convince you otherwise."
              }
              bcolor={"border-blue-500"}
              bgcolor={"bg-blue-100"}
            />
          </div>
        </div>
        <div className="relative flex flex-col justify-evenly items-center mt-[5rem] shadow-lg bg-white border-0 rounded-lg w-[35rem] h-[35rem]">
          <h1 className="font-bold text-2xl">Create a new Account</h1>
          <div className="flex flex-col justify-center items-center w-full relative bottom-[3rem]">
            <form action="" className="flex gap-[1rem]">
              <div className="flex flex-col gap-6">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  size="small"
                  value={firstName}
                  type="text"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  value={lastName}
                  size="small"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  type="number"
                  size="small"
                  variant="outlined"
                />
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3 relative items-center justify-end">
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="w-[10rem] h-[2.4rem]"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"not to say"}>not to say</MenuItem>
                  </Select>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  size="small"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  variant="outlined"
                />
                <div className="flex">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type={hidden ? "text" : "password"}
                    size="small"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    variant="outlined"
                  />
                  <div
                    className="flex w-fit absolute right-[3.5rem] top-[8.4rem] cursor-pointer"
                    onClick={() => {
                      isHidden(!hidden);
                    }}
                  >
                    {hidden ? <EyeOff color="grey" /> : <Eye color="grey" />}
                  </div>
                </div>
              </div>
            </form>
            <div className="flex flex-col relative pt-4">
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignup();
                }}
              >
                Create
              </Button>
            </div>
            <h1 className="relative top-[3rem] font-semibold">
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </h1>
            <ToastContainer />
          </div>
        </div>
        <div>
          <div>
            <div className="relative left-[19rem] top-10">
              <QuoteBox
                quote={
                  "A woman’s strength lies in her ability to rise every time she falls and keep moving forward."
                }
                bcolor={"border-red-500"}
                bgcolor={"bg-red-100"}
              />
            </div>
            <div className="relative left-[2rem]">
              <QuoteBox
                quote={
                  "Women are not meant to fit into boxes, they are born to create new paths and rewrite history."
                }
                bcolor={"border-blue-500"}
                bgcolor={"bg-blue-100"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
