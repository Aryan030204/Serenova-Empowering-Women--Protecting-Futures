import { Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
const StoryPost = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-evenly bg-purple-300 rounded-lg md:w-fit h-fit p-3 lg:w-[60%]">
        {/*content*/}
        <Link>
          <div className="w-full text-3xl font-bold text-start">
            <h1>The Lost Explorer and the Hidden Cave of Wonders</h1>
            <div className="w-full h-[0.1px] mt-3 bg-black"></div>
          </div>
          <div className="w-full text-lg text-start whitespace-pre-line my-1">
            <p className="overflow-hidden">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repudiandae corporis ex harum sed eligendi distinctio eveniet
              dolores necessitatibus consectetur veritatis assumenda quisquam
              est, itaque rerum cupiditate officiis! Omnis facilis numquam,
              neque asperiores nihil ad dicta necessitatibus fuga quis mollitia
              odit ipsa blanditiis quisquam vitae quidem doloremque earum
              inventore ipsum officia! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ex excepturi numquam nam molestiae obcaecati
              mollitia doloremque ullam voluptas aliquid alias? Lorem ipsum
              dolor sit amet.
            </p>
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
            <h1>2</h1>
          </div>
          <div className="flex justify-center items-center gap-1 text-lg">
            <button
              onClick={() => {
                setDisliked(!disliked);
              }}
            >
              {disliked ? <ThumbsDown fill="blue" /> : <ThumbsDown />}
            </button>
            <h1>2</h1>
          </div>
          <div className="flex justify-center items-center gap-1 text-lg">
            <button>
              <Share2 />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryPost;
