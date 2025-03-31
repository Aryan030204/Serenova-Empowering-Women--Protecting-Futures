import PostsNavbar from "../components/PostsNavbar";
import UserActivityNavbar from "../components/UserActivityNavbar";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="flex w-full justify-between p-4">
      <div></div>
      <div className="flex w-[20%] flex-col bg-purple-900 rounded-2xl gap-[5rem] h-[40rem] items-center justify-evenly shadow-purple-500 shadow-xl">
        <PostsNavbar />
        <UserActivityNavbar />
      </div>
      <div id="editor"></div>
    </div>
  );
};

export default CreatePost;
