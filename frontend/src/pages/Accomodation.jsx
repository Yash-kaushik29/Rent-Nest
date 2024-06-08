import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoWifiOutline, IoCarSport } from "react-icons/io5";
import { MdFamilyRestroom, MdOutlinePets } from "react-icons/md";
import { PiForkKnifeFill } from "react-icons/pi";
import { TbSmokingNo } from "react-icons/tb";


const Accomodation = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = () => {};

  const addImageByUrl = async(e) => {
    e.preventDefault();

    const {data: filename} = await axios.post("http://localhost:5000/save-image", {url: imageURL}, {withCredentials: true});
    setImages((prev) => {
        return [...prev, filename];
    });
    console.log(images)
    setImageURL("");
  }

  const handleUpload = async(e) => {
    const files = e.target.files;
    const filedata = new FormData();

    for(let i=0; i<files.length; i++) {
        filedata.append("photos", files[i]);
    }

    const {data: filename} = await axios.post("http://localhost:5000/upload", filedata, {
        headers: {'Content-Type': 'multipart/form-data'}
    })

    console.log(filename)
  }

  return (
    <div>
      {action !== "new" ? (
        <div className="text-center">
          <Link
            to={"/account/accomodations/new"}
            className="inline-flex gap-2 items-center mt-12 bg-orange-500 text-white font-semibold text-lg px-10 py-2 rounded-xl"
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
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Images
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="images"
                    placeholder="Enter link for your image"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button className="bg-orange-500 px-3 rounded-xl text-white font-semibold" onClick={addImageByUrl}>
                    Add&nbsp;image
                  </button>
                </div>
                <div className="grid gap-4 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {images.length > 0 && images.map(image => (
                    <div key={image} className="mt-4 rounded-xl"><img src={"http://localhost:5000/uploads/" + image} alt="Uploaded" className="w-full h-28 object-cover rounded-lg shadow-sm" /></div>
                ))}
                <label className="flex justify-center items-center cursor-pointer border-2 border-dotted mt-4 text-gray-600 font-semibold rounded-xl w-full h-28">
                    <input type="file" className="hidden" multiple onChange={handleUpload} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Upload
                
                </label>
                </div>
              </div>
              <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                  Extra Perks
                </label>
              <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-2">
                <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <IoWifiOutline className="text-xl" />
                 
                 <span className="font-semibold">wifi</span> 
                </label>
                <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <IoCarSport className="text-xl" />
                 <span className="font-semibold">Free Parking</span> 
                </label>
                <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
</svg>       
                 <span className="font-semibold">Fire Proof</span> 
                </label>
                <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
</svg>
    
                 <span className="font-semibold">Room Service</span> 
                </label>
                <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <TbSmokingNo className="text-xl" />

                 <span className="font-semibold">No Smoking rooms</span> 
                </label>
                <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
</svg>


                 <span className="font-semibold">TV</span> 
                </label>
                <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
</svg>
                 <span className="font-semibold">Music System</span> 
                </label>
                <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <MdFamilyRestroom className="text-xl" />
                 
                 <span className="font-semibold">Family</span>
                 </label>
                 <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <PiForkKnifeFill className="text-xl" />
                 
                 <span className="font-semibold">Dinner</span>
                 </label>
                 <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
                <input type="checkbox"/>
                <MdOutlinePets className="text-xl" />
                 
                 <span className="font-semibold">Pets</span>
                 </label>
              </div>
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
                    type="number"
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
                    type="number"
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
                  className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600"
                >
                  Submit
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
