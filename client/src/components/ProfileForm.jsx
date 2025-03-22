import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import male from "../assets/male.png";
import female from "../assets/female.png";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });
  const [saved, setSaved] = useState(false);
  const getProfile = async () => {
    const res = await axios.get(SERVER_URL + "/profile", {
      withCredentials: true,
    });
    setFormData({
      firstName: res.data.data.firstName,
      lastName: res.data.data.lastName,
      age: res.data.data.age,
      gender: res.data.data.gender,
    });
  };
  useEffect(() => {
    getProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.patch(
        SERVER_URL + "/profile/update",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          gender: formData.gender,
        },
        {
          withCredentials: true,
        }
      );
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
      console.log("profile updated successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 p-5 lg:w-1/4 md:w-1/2 my-[2rem] border-2 border-purple-500 shadow-lg bg-purple-50">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold text-blue-500">MY PROFILE</h1>
        {formData.gender === "male" ? (
          <img
            src={male}
            className="w-[10rem] border-4 rounded-full pt-2 overflow-hidden border-y-black"
          />
        ) : (
          <img
            src={female}
            className="w-[10rem] border-2 rounded-full pt-2 overflow-hidden border-y-black"
          />
        )}
      </div>
      <div className="flex flex-col w-[80%] justify-center gap-[1rem]">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold text-lg">
            First Name
          </label>
          <TextField
            id="standard-basic"
            variant="filled"
            size="small"
            value={formData.firstName}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                firstName: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold text-lg">
            Last Name
          </label>
          <TextField
            id="standard-basic"
            variant="filled"
            size="small"
            value={formData.lastName}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                lastName: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold text-lg">
            Age
          </label>
          <TextField
            id="standard-basic"
            variant="filled"
            type="number"
            size="small"
            value={formData.age}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                age: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="font-semibold text-lg">
            Gender
          </label>
          <TextField
            id="standard-basic"
            variant="filled"
            size="small"
            value={formData.gender}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                gender: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="bg-red-500 p-2 text-white font-bold text-lg rounded-lg shadow-lg"
          onClick={handleUpdate}
        >
          {saved ? "Saved successfully!" : "Save profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
