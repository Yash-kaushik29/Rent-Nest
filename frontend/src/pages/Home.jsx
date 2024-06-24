import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Image from "../components/Image";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPopularPlaces = async () => {
      const { data } = await axios.get("/getPlaces");
      setPlaces(data);
    };

    fetchPopularPlaces();
  }, []);

  return (
    <>
      <Carousel />

      <h1 className="mt-3 text-center font-bold text-2xl md:text-4xl text-orange-400">Top Listings</h1>
      <div className="grid xxs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-x-6 gap-y-10 mx-3 sm:mx-5 md:mx-10 mt-5 md:mt-10">
        {places.length > 0 &&
          places.map((place) => (
            <Link key={place._id} to={`/place/${place._id}`}>
              <div className="relative pb-4 rounded-lg">
                <div className="h-64 overflow-hidden rounded-lg bg-gray-200 shadow-lg shadow-gray-400">
                  <Image
                    src={place?.images[0]}
                    alt={place?.title || "Place image"}
                    className="object-cover h-full w-full hover:scale-110"
                  />
                </div>
                <div className="mt-4 ml-2 sm:ml-3">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {place.title}
                  </h3>
                  <p className="font-semibold text-gray-500">{place.address}</p>
                  <p className="font-semibold text-gray-500">
                    {place.maxGuests} person
                  </p>
                  <p className="text-gray-500 font-semibold">
                    <span className="text-lg font-bold">${place.price}</span>{" "}
                    night
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Home;
