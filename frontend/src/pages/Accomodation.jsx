import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import UserAccomodations from "../components/UserAccomodations";

const Accomodation = () => {
  const { action } = useParams();
  const [accomodations, setAccomodations] = useState([]);
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

  useEffect(() => {
    const fetchAccomodations = async() => {
        const {data} = await axios.get("http://localhost:5000/getAccomodations", {withCredentials: true});
        setAccomodations(data);
    }

    fetchAccomodations();
  }, []);
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    const placeData = {title, address, description, images, perks, extraInfo, checkIn, checkOut, price, maxGuests};
    await axios.post("http://localhost:5000/savePlace", {placeData}, {withCredentials: true});

    navigate("/account/accomodations");
  };

  return (
    <div>
      {action !== "new" ? (
        <>
        <div className="text-center">
          <Link
            to={"/account/accomodations/new"}
            className="inline-flex gap-2 items-center mt-12 bg-orange-500 text-white font-semibold text-lg px-3 sm:px-10 py-2 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add new accomodation
          </Link>
        </div>
        
        <div className="mt-8">
          {accomodations.length > 0 && accomodations.map((accomodation) => (
            <UserAccomodations key={accomodation._id} accomodation={accomodation} />
          ))}
        </div>
        </>
      ) : (
        <div className="mx-2 sm:px-5 md:mx-10 mt-6">
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
        </div>
      )}
    </div>
  );
};

export default Accomodation;
