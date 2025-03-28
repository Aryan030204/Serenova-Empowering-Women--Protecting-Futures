import { Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useEffect, useState } from "react";
import { Link } from "react-router";
const StoryPost = () => {
  const [stories, setStories] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

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

  const getStories = async () => {
    const res = await axios.get(SERVER_URL + "/stories/all");
    setStories(res.data.stories);
  };
  useEffect(() => {
    getStories();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-evenly rounded-lg md:w-fit h-fit p-3 lg:w-[60%] gap-[2rem]">
        {/*content*/}
        {stories.map((i) => {
          console.log(i);

          return (
            <>
              <div key={i._id} className="flex flex-col gap-2 mt-2 border-0 p-3 border-b-2 border-black">
                <div>
                  <Link>
                    <div className="w-full flex flex-col text-3xl font-bold text-start">
                      <h1>{i.title}</h1>
                      <div className="w-full h-[0.1px] mt-3 bg-black"></div>
                    </div>
                    <div className="w-full text-lg text-start whitespace-pre-line my-1">
                      <p className="overflow-hidden">{i.content}</p>
                    </div>
                  </Link>
                  {/*navigation*/}
                  <div className="flex gap-2 w-fit self-end text-2xl items-center justify-center">
                    <div className="flex justify-center items-center gap-1 text-lg">
                      <button
                        onClick={() => {
                          setLiked(!liked);
                          likeStory(i._id);
                        }}
                      >
                        {liked ? <ThumbsUp color="blue" /> : <ThumbsUp />}
                      </button>
                      <h1>{i.likes}</h1>
                    </div>
                    <div className="flex justify-center items-center gap-1 text-lg">
                      <button
                        onClick={() => {
                          setDisliked(!disliked);
                          dislikeStory(i._id);
                        }}
                      >
                        {disliked ? <ThumbsDown color="red" /> : <ThumbsDown />}
                      </button>
                      <h1>{i.dislikes}</h1>
                    </div>
                    <div className="flex justify-center items-center gap-1 text-lg">
                      <button>
                        <Share2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default StoryPost;
