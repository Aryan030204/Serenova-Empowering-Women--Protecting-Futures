import { Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useEffect, useState } from "react";
import { Link } from "react-router";
const StoryPost = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [stories, setStories] = useState([]);
  const getStories = async () => {
    const res = await axios.get(SERVER_URL + "/stories/all");
    // console.log(res.data.stories);
    setStories(res.data.stories);
  };
  useEffect(() => {
    getStories();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-evenly bg-purple-300 rounded-lg md:w-fit h-fit p-3 lg:w-[60%]">
        {/*content*/}
        {stories.map((i) => {
          console.log(i);

          return (
            <>
              <Link key={i._id}>
                <div className="w-full text-3xl font-bold text-start">
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
                    }}
                  >
                    {liked ? <ThumbsUp fill="blue" /> : <ThumbsUp />}
                  </button>
                  <h1>{i.likes}</h1>
                </div>
                <div className="flex justify-center items-center gap-1 text-lg">
                  <button
                    onClick={() => {
                      setDisliked(!disliked);
                    }}
                  >
                    {disliked ? <ThumbsDown fill="blue" /> : <ThumbsDown />}
                  </button>
                  <h1>{i.dislikes}</h1>
                </div>
                <div className="flex justify-center items-center gap-1 text-lg">
                  <button>
                    <Share2 />
                  </button>
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
