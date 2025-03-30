import { Link } from "react-router";

const PostsNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex flex-col w-[70%] p-4 gap-[1rem] justify-center text-center">
      <Link to={"/stories/trending"}>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Trending</h1>
        </div>
      </Link>
      <Link to={"/stories/mostliked"}>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Most liked</h1>
        </div>
      </Link>
      <Link to={"/stories/mostviewed"}>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Most viewed</h1>
        </div>
      </Link>
      <Link to={"/stories/recent"}>
        <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Recent posts</h1>
        </div>
      </Link>
      {user && (
        <Link to={`${user._id}/saved`}>
          <div className="flex w-full items-center justify-center bg-blue-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
            <h1>Saved posts</h1>
          </div>
        </Link>
      )}
    </div>
  );
};

export default PostsNavbar;
