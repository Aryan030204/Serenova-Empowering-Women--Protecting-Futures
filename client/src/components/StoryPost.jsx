/* eslint-disable react-hooks/exhaustive-deps */
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setstories } from "../utils/storiesSlice";
import Pagination from "./Pagination";

const StoryPost = () => {
  const stories = useSelector((state) => state.stories.stories);
  const [savedStories, setSavedStories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // const SERVER_URL = import.meta.env.SERVER_URL;
  const updateUser = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/profile`, {
        withCredentials: true,
      });
      
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const likeStory = async (id) => {
    try {
      await axios.patch(
        `${SERVER_URL}/stories/${id}/like/increment`,
        {},
        { withCredentials: true }
      );
      await updateUser(); // <-- update user first
      await getStories();
    } catch (err) {
      console.log(err);
    }
  };

  const dislikeStory = async (id) => {
    try {
      await axios.patch(
        `${SERVER_URL}/stories/${id}/like/decrement`,
        {},
        { withCredentials: true }
      );
      await updateUser(); // <-- update user first
      await getStories();
    } catch (err) {
      console.log(err);
    }
  };

  const saveStory = async (id) => {
    try {
      if (savedStories.includes(id)) {
        await axios.post(
          `${SERVER_URL}/user/stories/${id}/unsave`,
          {},
          { withCredentials: true }
        );
        setSavedStories((prev) => prev.filter((postId) => postId !== id));
        toast.success("Post unsaved");
      } else {
        await axios.post(
          `${SERVER_URL}/user/stories/${id}/save`,
          {},
          { withCredentials: true }
        );
        setSavedStories((prev) => [...prev, id]);
        toast.success("Post saved");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const viewStory = async (id) => {
    try {
      await axios.patch(
        `${SERVER_URL}/stories/${id}/viewed`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getSavedStories = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/user/stories/saved`, {
        withCredentials: true,
      });
      setSavedStories(res.data.savedPosts.map((post) => post._id));
    } catch (err) {
      console.error("Error fetching saved posts:", err);
    }
  };

  const getStories = async (page = 1) => {
    try {
      const res = await axios.get(
        `${SERVER_URL}/stories/all?page=${page}&limit=5`
      );
      dispatch(setstories(res.data.stories));
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      getSavedStories();
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  };

  useEffect(() => {
    getStories();
    updateUser();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-evenly rounded-lg md:w-fit h-fit p-3 lg:w-[60%] gap-[2rem]">
        {stories.map((i) => {
          const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December",
          ];
          const dateParts = i.createdAt.split("T")[0].split("-");
          const timePart = i.createdAt.split("T")[1].split(".")[0];
          const formattedDate = `${dateParts[2]}th ${
            months[+dateParts[1] - 1]
          }, ${dateParts[0]} ${timePart}`;
          
          
          

          const isLiked = user?.likedPosts?.includes(i._id);
          const isDisliked = user?.dislikedPosts?.includes(i._id);
          

          return (
            <div
              key={i._id}
              className="flex flex-col gap-2 mt-2 p-3 bg-gray-800 rounded-3xl shadow-purple-500 shadow-xl text-white"
            >
              <Link to={`stories/${i._id}`} onClick={() => viewStory(i._id)}>
                <div className="w-full flex flex-col text-3xl font-bold text-start">
                  <h1 className="text-yellow-400">{i.title}</h1>
                  <div className="flex gap-2 items-center justify-start">
                    <h1 className="text-sm font-normal opacity-50 mt-1">
                      Posted: {formattedDate}
                    </h1>
                    <h1 className="text-sm font-normal opacity-50 mt-1">
                      {i.author}
                    </h1>
                  </div>
                  <div className="w-full h-[1px] mt-3 mb-2 bg-white"></div>
                </div>
                <div className="w-full text-lg text-start whitespace-pre-line my-1">
                  <p className="overflow-hidden">{i.content}</p>
                </div>
              </Link>

              {/* navigation */}
              <div className="flex gap-2 w-full justify-between p-1 text-2xl items-center mt-3">
                <div className="flex gap-2">
                  <div className="flex gap-1 text-lg">
                    <button
                      onClick={() => {
                        if (!user) return toast.error("Login required");
                        likeStory(i._id);
                      }}
                    >
                      {isLiked ? <ThumbsUp fill="blue" /> : <ThumbsUp />}
                    </button>
                    <h1>{i.likes || 0}</h1>
                  </div>
                  <div className="flex gap-1 text-lg">
                    <button
                      onClick={() => {
                        if (!user) return toast.error("Login required");
                        dislikeStory(i._id);
                      }}
                    >
                      {isDisliked ? <ThumbsDown fill="red" /> : <ThumbsDown />}
                    </button>
                    <h1>{i.dislikes || 0}</h1>
                  </div>
                  <div className="flex gap-1 text-lg">
                    <button onClick={() => saveStory(i._id)}>
                      {savedStories.includes(i._id) ? (
                        <Bookmark fill="white" />
                      ) : (
                        <Bookmark />
                      )}
                    </button>
                  </div>
                  <div className="flex gap-1 justify-end text-lg">
                    <button>
                      <Share2 />
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <h1 className="text-lg opacity-50">{i.views} views</h1>
                </div>
              </div>
            </div>
          );
        })}
        <ToastContainer />
        <div className="w-full flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            fetchStories={getStories}
          />
        </div>
      </div>
    </>
  );
};

export default StoryPost;
