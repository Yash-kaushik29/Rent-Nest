import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../components/PlaceGallery";

const PlacePage = () => {
  const [placeData, setPlaceData] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      const { data } = await axios.get(`http://localhost:5000/getPlace/${id}`);
      setPlaceData(data);
    };

    fetchPlace();
  }, [id]);

  const handleBooking = () => {
    
  }

  if(showImages) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-5">
        <button className="fixed top-[90px] right-8 bg-red-600 text-white font bold px-4 py-2 rounded-full" onClick={() => setShowImages(false)}>X Close</button>
        {placeData?.images?.length > 0 && placeData.images.map(image => (
          <div key={image}>
            <img src={`http://localhost:5000/uploads/${image}`} alt="Image" className="rounded-xl w-full h-full" />
          </div>
        ))}
      </div>
    )
  }

  if(showDescription) {
    return (
      <div className="mt-4 mx-10">
        <span className="font-semibold text-3xl">Description</span>
        <p className="mt-2 from-gray-500 text-lg font-serif">{placeData.description}</p>
        <button className="fixed top-[88px] right-10 font-bold bg-gray-600 text-white px-5 py-1 rounded-full" onClick={() => setShowDescription(false)}>X</button>
      </div>
    )
  }

  return (
    <div className="py-6 px-2 sm:px-10 bg-gray-100">
      <div className="font-semibold text-xl sm:text-3xl text-gray-700">
        {placeData.title}
      </div>
      <div className="font-semibold sm:text-xl text-gray-500">
        {placeData.address}
      </div>

      <PlaceGallery placeData={placeData} setShowImages={setShowImages} />

      <div className="grid grid-cols-1 xs:grid-cols-[2fr_1fr] lg:xs:grid-cols-[3fr_1fr] mt-6 gap-x-4">
      <div>
        <span className="font-semibold text-xl sm:text-2xl">Description</span>
        <p className="mt-1 from-gray-400 sm:text-lg font-semibold">{placeData?.description?.substr(0,150)}<span className="text-black font-semibold cursor-pointer" onClick={() => setShowDescription(true)}>...Read More</span></p>
        <div className="flex flex-wrap gap-3 mt-3">
          {placeData.perks?.length > 0 && placeData.perks.map(perk => (
            <div key={perk} className="bg-gray-400 px-2 sm:px-3 sm:py-1 rounded-md text-white">{perk}</div>
          ))}
        </div>
        <div className="mt-3 flex flex-col sm:flow-row gap-x-6">
        <p className="font-semibold text-gray-700">Check In: <span className="font-bold text-gray-500">{placeData.checkIn}:00</span></p>
        <p className="font-semibold text-gray-700">Check Out: <span className="font-bold text-gray-500">{placeData.checkOut}:00</span></p>
        </div>
      </div>
      <div className="bg-white mt-2 sm:mt-0 pb-5 rounded-lg shadow-md shadow-gray-400 h-fit">
        <div className="sm:text-xl text-gray-700 font-bold px-2 py-1">${placeData.price} / per night</div>
        <div className="flex flex-col xs:flex-row gap-y-1 my-4 font-semibold">
        <div className="flex flex-col px-2 border  border-gray-300 mx-1 rounded-md">
          <label>Check-In </label>
          <input type="date" onChange={(e) => setCheckIn(e.target.value)}></input>
        </div>
        <div className="flex flex-col px-2 border  border-gray-300 mx-1 rounded-md">
          <label>Check-Out </label>
          <input type="date" onChange={(e) => setCheckOut(e.target.value)}></input>
        </div>
        </div>
        <div className="px-2 mt-4">
          <input type="text" placeholder="No. of Guests" className="mt-1 px-3 border w-full rounded-lg"  onChange={(e) => setMaxGuests(e.target.value)}/>
        </div>
        <div className="px-2 mt-4">
          <input type="text" placeholder="Contact No" className="mt-1 px-3 border w-full rounded-lg" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="px-10">
        <button className="mt-4 bg-orange-500 text-white font-bold px-4 py-2 w-full rounded-full" onClick={() => handleBooking}>Book Now</button>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default PlacePage;
