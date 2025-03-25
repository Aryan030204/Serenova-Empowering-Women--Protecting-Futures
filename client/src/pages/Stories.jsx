import PostsNavbar from "../components/PostsNavbar";
import StoryPost from "../components/StoryPost";
import UserActivityNavbar from "../components/UserActivityNavbar";

const Stories = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center p-2 bg-purple-200">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-bold text-red-500">
          Stories:{" "}
          <span className="text-3xl font-mono text-black">
            A place for engaging content
          </span>
        </h1>
        <p className="text-xl font-serif text-purple-600 underline">
          Empowering Women, One Story at a Time
        </p>
        <h3 className="mt-4">In development, come back later :{")"} </h3>
      </div>
      <div className="flex w-full justify-between items-start p-2">
        {/*posts section*/}
        <div className="flex w-[80%] bg-white flex-col gap-2 justify-start rounded-lg pb-5 pl-2">
          <StoryPost />
          <StoryPost />
        </div>
        <div className="w-[1px] h-full bg-gray-300"></div>
        {/*navigation section*/}
        <div className="flex w-[20%] flex-col gap-[5rem] h-full bg-white items-center">
          <PostsNavbar/>
          <UserActivityNavbar/>
        </div>
      </div>
    </div>
  );
};

export default Stories;
