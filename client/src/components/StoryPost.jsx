import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setstories } from "../utils/storiesSlice";
import Pagination from "./Pagination";
const StoryPost = () => {
  const stories = useSelector((state) => state.stories.stories);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [savedStories, setSavedStories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  const likeStory = async (id) => {
    try {
      if (!liked) {
        await axios.patch(
          SERVER_URL + `/stories/${id}/like/increment`,
          {},
          {
            withCredentials: true,
          }
        );
        if (disliked) {
          await axios.patch(
            SERVER_URL + `/stories/${id}/dislike/decrement`,
            {},
            {
              withCredentials: true,
            }
          );
          setDisliked(false);
        }
        setLiked(true);
      } else {
        await axios.patch(
          SERVER_URL + `/stories/${id}/like/decrement`,
          {},
          {
            withCredentials: true,
          }
        );
        setLiked(false);
      }
      getStories();
    } catch (err) {
      console.log(err);
    }
  };

  const dislikeStory = async (id) => {
    try {
      if (!disliked) {
        await axios.patch(
          SERVER_URL + `/stories/${id}/dislike/increment`,
          {},
          {
            withCredentials: true,
          }
        );
        if (liked) {
          await axios.patch(
            SERVER_URL + `/stories/${id}/like/decrement`,
            {},
            {
              withCredentials: true,
            }
          );
          setLiked(false);
        }

        setDisliked(true);
      } else {
        await axios.patch(
          SERVER_URL + `/stories/${id}/dislike/decrement`,
          {},
          {
            withCredentials: true,
          }
        );
        setDisliked(false);
      }
      getStories();
    } catch (err) {
      console.log(err);
    }
  };

  const saveStory = async (id) => {
    try {
      if (savedStories.includes(id)) {
        await axios.post(
          SERVER_URL + `/user/stories/${id}/unsave`,
          {},
          { withCredentials: true }
        );
        setSavedStories((prev) => prev.filter((postId) => postId !== id));
        toast.success("Post unsaved successfully");
      } else {
        await axios.post(
          SERVER_URL + `/user/stories/${id}/save`,
          {},
          { withCredentials: true }
        );
        setSavedStories((prev) => [...prev, id]);
        toast.success("Post saved successfully");
      }
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  const viewStory = async (id) => {
    try {
      await axios.patch(
        SERVER_URL + `/stories/${id}/viewed`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getSavedStories = async () => {
    try {
      const res = await axios.get(SERVER_URL + "/user/stories/saved", {
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
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-evenly rounded-lg md:w-fit h-fit p-3 lg:w-[60%] gap-[2rem]">
        {/*content*/}
        {stories.map((i) => {
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          return (
            <>
              <div
                key={i._id}
                className="flex flex-col gap-2 mt-2 p-3 bg-gray-800 rounded-3xl shadow-purple-500 shadow-xl text-white"
              >
                <div>
                  <Link
                    to={`stories/${i._id}`}
                    onClick={() => viewStory(i._id)}
                  >
                    <div className="w-full flex flex-col text-3xl font-bold text-start">
                      <h1 className="text-yellow-400">{i.title}</h1>
                      <div className="flex gap-2 items-center justify-start">
                        <h1 className="text-sm font-normal opacity-50 mt-1">
                          Posted:{" "}
                          {`${i.createdAt.split("T")[0].split("-")[2]}th ${
                            months[
                              i.createdAt
                                .split("T")[0]
                                .split("-")[1]
                                .split("0")[1] - 1
                            ]
                          }, ${i.createdAt.split("T")[0].split("-")[0]} ${
                            i.createdAt.split("T")[1].split(".")[0]
                          },`}
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
                  {/*navigation*/}
                  <div className="flex gap-2 w-full justify-between p-1 text-2xl items-center mt-3">
                    <div className="flex gap-2">
                      <div className="flex gap-1 text-lg">
                        <button
                          onClick={() => {
                            if (user !== null) {
                              setLiked(!liked);
                              likeStory(i._id);
                            } else {
                              toast.error(
                                "You must be logged in to like or dislike a post",
                                {
                                  className: "font-semibold",
                                }
                              );
                            }
                          }}
                        >
                          {liked ? <ThumbsUp fill="blue" /> : <ThumbsUp />}
                        </button>
                        <h1>{i.likes > 0 ? i.likes : 0}</h1>
                      </div>
                      <div className="flex gap-1 text-lg">
                        <button
                          onClick={() => {
                            if (user !== null) {
                              setDisliked(!disliked);
                              dislikeStory(i._id);
                            } else {
                              toast.error(
                                "You must be logged in to like or dislike a post",
                                {
                                  className: "font-semibold",
                                }
                              );
                            }
                          }}
                        >
                          {disliked ? (
                            <ThumbsDown fill="red" />
                          ) : (
                            <ThumbsDown />
                          )}
                        </button>
                        <h1>{i.dislikes > 0 ? i.dislikes : 0}</h1>
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
              </div>
            </>
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
