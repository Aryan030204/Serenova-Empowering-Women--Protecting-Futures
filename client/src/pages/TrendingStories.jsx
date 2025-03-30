import PostsNavbar from "../components/PostsNavbar";
import UserActivityNavbar from "../components/UserActivityNavbar";

const TrendingStories = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="flex w-full justify-between p-4 items-start">
      <div></div>
      <div className="w-[20%]">
        <div className="flex flex-col bg-purple-900 rounded-2xl gap-[5rem] h-[40rem] items-center justify-evenly shadow-purple-500 shadow-xl">
          <PostsNavbar />
          {user && <UserActivityNavbar />}
        </div>
      </div>
    </div>
  );
};

export default TrendingStories;
