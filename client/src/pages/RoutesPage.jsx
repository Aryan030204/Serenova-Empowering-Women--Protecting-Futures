import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../utils/config";

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);

  const getRoutes = async () => {
    const res = await axios.get(SERVER_URL + "/route/all", {
      withCredentials: true,
    });
    console.log(res.data.routes);
    setRoutes(res.data.routes);
  };

  useEffect(() => {
    getRoutes();
  },[]);
  return (
    <div className="flex flex-col md:w-1/2 items-center justify-center self-center my-10 p-5">
      <div>
        <h1 className="font-bold text-3xl">Saved Routes</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        {routes.map((route, index) => {
          return (
            <>
              <div
                key={route._id}
                className="flex flex-col gap-2 items-center bg-purple-100 self-start w-full p-2"
              >
                <div className="flex items-start justify-center gap-1">
                  <h1 className="text-red-500 font-semibold">{index + 1}.</h1>
                  <h1 className="font-bold text-blue-500">
                    Current Location: {" "}
                    <span className="text-black">
                      {route.currentLocationName}, ({route.currentLocation})
                    </span>
                  </h1>
                </div>
                <div className="flex items-center gap-1">
                  <h1 className="font-bold text-blue-500">
                    Destination : {" "}
                    <span className="text-black">
                      {route.destinationLocationName}, (
                      {route.destinationLocation})
                    </span>
                  </h1>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default RoutesPage;
