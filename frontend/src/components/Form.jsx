import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotosUploader from './PhotosUploader';
import Perks from './Perks';

const Form = () => {
  const {id} = useParams();  
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const navigate = useNavigate();

  useState(() => {
    const fetchDetails = async() => {
      const {data} = await axios.get(`/getAccomodation/${id}`);
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setImages(data.images);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setPrice(data.price);
      setMaxGuests(data.maxGuests);
    }

    if(id) {
      fetchDetails();
    }
  })

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(id) {
      const placeData = {id, title, address, description, images, perks, extraInfo, checkIn, checkOut, price, maxGuests};
      await axios.put("/updatePlace", {placeData}, {withCredentials: true});  
    } else {
      const placeData = {title, address, description, images, perks, extraInfo, checkIn, checkOut, price, maxGuests};
      await axios.post("/savePlace", {placeData}, {withCredentials: true});
    }

    navigate("/account/my-accomodations");
  };
  
  return (
    <div className="max-w-3xl mx-auto p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="For ex: My Apt"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address to this place"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  placeholder="Enter description of this place"
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <PhotosUploader images={images} setImages={setImages} />
              <Perks selected={perks} onChange={setPerks} />

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Additional Info
                </label>
                <input
                  type="text"
                  name="extraInfo"
                  placeholder="House Rules etc"
                  value={extraInfo}
                  onChange={(e) => setExtraInfo(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div className="flex gap-2 sm:gap-5 md:gap-10">
                <div>
                <label className="block text-lg font-medium text-gray-700">
                    Check-In Time
                  </label>
                  <input
                    type="text"
                    name="checkIn"
                    placeholder="8:00"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Check-Out Time
                  </label>
                  <input
                    type="text"
                    name="checkOut"
                    placeholder="22:00"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 sm:gap-5 md:gap-10">
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    placeholder="$50 per night"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Maximum Guests
                  </label>
                  <input
                    type="string"
                    name="maxGuests"
                    placeholder="1"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-xl hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
  )
}

export default Form