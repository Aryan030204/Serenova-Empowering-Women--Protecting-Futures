/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import HeroBanner from "../components/HeroBanner";
import HeroFeatures from "../components/HeroFeatures";
import WhatToDo from "../components/WhatToDo";

const Home = () => {
  const [logged, isLogged] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center mt-[6rem] gap-[2rem] bg-gray-50">
      <HeroBanner />
      <HeroFeatures />
      <WhatToDo />
    </div>
  );
};

export default Home;
