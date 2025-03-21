
const HeroFeatures = () => {
  return (
    <div className="flex flex-col gap-[2rem] w-full">
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-semibold">Our Features</h1>
      </div>
      <div className="flex flex-col gap-[5rem] justify-center items-center">
        <div className="flex items-center justify-evenly w-full flex-wrap">
          <div className="flex flex-col border-2 border-black lg:h-[13rem] lg:w-[20rem] md:h-[10rem] md:w-[15rem] rounded-3xl items-center justify-center gap-2 px-[1rem] text-white text-center lg:text-xl md:text-[14px] bg-purple-600">
            <h2 className="font-bold">AI-Powered Safe Route Planner</h2>
            <p className="font-mono">
              Suggests the safest route using real-time crime data, street
              lighting, and crowd density.
            </p>
          </div>
          <div className="flex flex-col border-2 border-black lg:h-[13rem] lg:w-[20rem] md:h-[10rem] md:w-[15rem] rounded-3xl items-center justify-center gap-2 px-[1rem] text-white text-center lg:text-xl md:text-[14px] bg-purple-600">
            <h2 className="font-bold">Real-Time Reporting</h2>
            <p className="font-mono">
              Allows users to anonymously report incidents, creating a heatmap
              of high-risk areas
            </p>
          </div>
          <div className="flex flex-col border-2 border-black lg:h-[13rem] lg:w-[20rem] md:h-[10rem] md:w-[15rem] rounded-3xl items-center justify-center gap-2 px-[1rem] text-white text-center lg:text-xl md:text-[14px] bg-purple-600">
            <h2 className="font-bold">Survivor Storytelling Blog</h2>
            <p className="font-mono">
              Provides a safe space for survivors to share stories and access
              healing resources
            </p>
          </div>
        </div>
        <div className="flex items-center justify-evenly w-full flex-wrap">
          <div className="flex flex-col border-2 border-black lg:h-[13rem] lg:w-[20rem] md:h-[10rem] md:w-[15rem] rounded-3xl items-center justify-center gap-2 px-[1rem] text-white text-center lg:text-xl md:text-[14px] bg-purple-600">
            <h2 className="font-bold"> Emergency SOS and Live Tracking</h2>
            <p className="font-mono">
              Includes an SOS button and live location sharing for immediate
              help during emergencies.
            </p>
          </div>
          <div className="flex flex-col border-2 border-black lg:h-[13rem] lg:w-[20rem] md:h-[10rem] md:w-[15rem] rounded-3xl items-center justify-center gap-2 px-[1rem] text-white text-center lg:text-xl md:text-[14px] bg-purple-600">
            <h2 className="font-bold">Crowdsourced Safety Feedback</h2>
            <p className="font-mono">
              Lets users rate routes, share safety tips, and improve
              recommendations through community input.
            </p>
          </div>
          <div className="flex flex-col border-2 border-black lg:h-[13rem] lg:w-[20rem] md:h-[10rem] md:w-[15rem] rounded-3xl items-center justify-center gap-2 px-[1rem] text-white text-center lg:text-xl md:text-[14px] bg-purple-600">
            <h2 className="font-bold">Easy-to-Use Interface</h2>
            <p className="font-mono">
              Features a simple, intuitive design with clear navigation, making
              it accessible for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFeatures;
