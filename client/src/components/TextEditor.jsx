import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { SERVER_URL } from "../utils/config";
const TextEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handlePost = async () => {
    try {
      const res=await axios.post(
        SERVER_URL + "/user/stories/create",
        {
          title: title,
          content: content,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      
    } catch (err) {
      console.log(err);
    }
  };
  const handleDraft = async () => {
    try {
      const res = await axios.post(
        SERVER_URL + "/user/stories/drafts/save",
        {
          title: title,
          content: content,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-2 items-center justify-start h-full bg-red-100 p-5">
      <div className="flex flex-col my-2 items-center gap-2 w-full h-full">
        <TextField
          id="outlined-basic"
          label="Title of the post"
          variant="outlined"
          className="w-full bg-white rounded-xl border-red-500 shadow-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border-2 border-red-500 p-2 h-full rounded-xl"
          placeholder="Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-end gap-5">
        <Button
          variant="outlined"
          className="hover:bg-blue-600 hover:text-white shadow-lg"
          onClick={() => handleDraft()}
        >
          SAVE DRAFT
        </Button>
        <Button
          variant="contained"
          className="shadow-lg"
          onClick={() => handlePost()}
        >
          POST
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
