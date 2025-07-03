import PostsNavbar from "../components/PostsNavbar";
import StoryPost from "../components/StoryPost";
import UserActivityNavbar from "../components/UserActivityNavbar";

const Stories = () => {
  const user = localStorage.getItem("user");

  return (
    <div className="flex flex-col w-full justify-center items-center p-2 bg-purple-200">
      <div className="flex flex-col items-center gap-2">
        <h1 className="lg:text-5xl lg:left-0 relative md:text-3xl md:left-[14rem] font-bold text-red-500">
          Stories:{" "}
          <span className="lg:text-3xl font-mono relative md:text-xl text-black">
            A place for engaging content
          </span>
        </h1>
        <p className="lg:text-xl relative lg:block md:hidden font-serif text-purple-600 underline">
          Empowering Women, One Story at a Time
        </p>
      </div>
      <div className="flex p-1 w-fit">
        {/*posts section*/}
        <div className="flex w-[80%] flex-col gap-2 rounded-lg pb-5 pl-2">
          <StoryPost />
        </div>
        {/*navigation section*/}
        <div className="flex relative w-[20%] flex-col bg-purple-900 rounded-2xl gap-[5rem] h-[40rem] top-5 items-center justify-evenly shadow-purple-500 shadow-xl">
          <PostsNavbar />
          {user && <UserActivityNavbar />}
        </div>
      </div>
    </div>
  );
};

export default Stories;
