import { Link } from "react-router";

const UserActivityNavbar = () => {
  return (
    <div className="flex flex-col w-[70%] p-4 gap-[1rem] justify-center text-center">
      <Link>
        <div className="flex w-full items-center justify-center bg-red-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Create</h1>
        </div>
      </Link>
      <Link>
        <div className="flex w-full items-center justify-center bg-red-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>My posts</h1>
        </div>
      </Link>
      <Link>
        <div className="flex w-full items-center justify-center bg-red-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Manage posts</h1>
        </div>
      </Link>
      <Link>
        <div className="flex w-full items-center justify-center bg-red-600 text-white font-semibold p-1 rounded-lg cursor-pointer">
          <h1>Drafts</h1>
        </div>
      </Link>
    </div>
  );
};

export default UserActivityNavbar;
