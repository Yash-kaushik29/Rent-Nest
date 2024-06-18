import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlacePage = () => {
  const [placeData, setPlaceData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlace = async () => {
      const { data } = await axios.get(`http://localhost:5000/getPlace/${id}`);
      setPlaceData(data);
    };

    fetchPlace();
  }, []);

  return (
    <div className="mt-6">
      <div className="font-semibold text-3xl ml-10 text-gray-700">{placeData.title}</div>
      <div className="mt-2 font-semibold text-xl ml-10 text-gray-500">{placeData.address}</div>
      <div className="mt-5 grid grid-cols-[2fr_1fr] gap-3 mx-5">
        <div className="">
        <img src={`http://localhost:5000/uploads/${placeData.images[0]}`} alt="Image-1" />
        </div>
        <div className="grid">
          <img src={`http://localhost:5000/uploads/${placeData.images[1]}`} alt="Image-2" className="" />
          <img src={`http://localhost:5000/uploads/${placeData.images[1]}`} alt="Image-3" className="" />
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
