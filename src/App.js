import React, { useEffect, useState } from "react";
import "./main.css";

const App = () => {
  const url = "https://nextjs-orpin-omega-98.vercel.app/api/restaurants";

  const [restaurantData, setRestaurantData] = useState({});

  const getRestaurantData = async () => {
    const res = await fetch(url);
    const jsonData = await res.json();
    setRestaurantData(jsonData);
  };

  const filterRestaurantsByState = (state) => {
    const uniqueRestaurants = restaurantData.reduce((acc, current) => {
      if (current.state === state) {
        if (
          !acc.some((item) => item.restaurant_name === current.restaurant_name)
        ) {
          acc.push(current);
        }
      }
      return acc;
    }, []);

    return uniqueRestaurants.map((item, index) => (
      <div key={index} className="mx-5">
        <li>{item.restaurant_name}</li>
      </div>
    ));
  };

  useEffect(() => {
    getRestaurantData();
  }, [restaurantData]);

  return (
    <div className="grid gap-8 justify-center h-screen mt-10 ">
      <div className=" w-[450px] md:w-[500px] lg:w-max">
        {/* Title */}
        <div className="flex flex-col items-center justify-center gap-5 ">
          <div className="font-bold text-xl">
            ReactJS Application Development Test
          </div>
          <div className=" text-lg">
            Create a ReactJS application that displays a list of restaurants
            categorised by their location states.
          </div>
          <div className=" text-lg">Dev: Christian John Roa</div>
        </div>

        {/* Display of datas */}
        <div className="flex justify-center items-center bg-neutral-300 rounded-lg ">
          <div className="text-md ">
            {restaurantData.length ? (
              [...new Set(restaurantData.map((item) => item.state))].map(
                (state, index) => (
                  <ul key={index} className="list-disc my-5">
                    <li>{state}</li>
                    {filterRestaurantsByState(state)}
                  </ul>
                )
              )
            ) : (
              <div>No data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
