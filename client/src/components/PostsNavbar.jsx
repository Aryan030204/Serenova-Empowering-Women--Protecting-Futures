import { Link } from "react-router";

const PostsNavbar = () => {
  return (
    <div className="flex flex-col w-[70%] p-4 gap-[1rem] justify-center text-center">
      <Link>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Trending</h1>
        </div>
      </Link>
      <Link>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Most liked</h1>
        </div>
      </Link>
      <Link>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Most viewed</h1>
        </div>
      </Link>
      <Link>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Recent posts</h1>
        </div>
      </Link>
    </div>
  );
};

export default PostsNavbar;
