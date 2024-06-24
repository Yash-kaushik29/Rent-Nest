import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlaceGallery from "../components/PlaceGallery";
import { MdDelete } from "react-icons/md";
import { enqueueSnackbar } from "notistack";
import Image from "../components/Image";

const SingleBookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [place, setPlace] = useState([]);
  const [showImages, setShowImages] = useState(false)
  const navigate = useNavigate();

  const fetchPlaceData = async (placeId) => {
    const { data } = await axios.get(
      `/getPlace/${placeId}`
    );
    setPlace(data);
  };

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await axios.get(
        `/getBooking/${id}`,
        { withCredentials: true }
      );
      setBooking(data[0]);
      if (data[0].placeId) {
        fetchPlaceData(data[0].placeId);
      }
    };
    fetchBooking();
  }, [id]);

  const deleteBooking = async () => {
    const bookingId = booking._id;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/deleteBooking/${bookingId}`);
      enqueueSnackbar("Booking Cancelled !", {
        autoHideDuration: 3000,
        variant: "success",
      });
      navigate("/account/bookings");
    } catch (error) {
      console.error("Error deleting booking:", error);
      enqueueSnackbar("Failed to Cancel Booking", {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };

  if(showImages) {
    return (
      <div className="grid sm:grid-cols-2 gap-4 mt-4 mx-5">
        <button className="fixed top-[90px] right-8 bg-red-600 text-white font bold px-4 py-2 rounded-full" onClick={() => setShowImages(false)}>X Close</button>
        {place?.images?.length > 0 && place.images.map(image => (
          <div key={image}>
            <Image src={image} alt="Image" className="rounded-xl w-full h-full sm:h-[50vh] lg:h-[60vh]" />
          </div>
        ))}
      </div>
    )
  }

  return <div className="py-6 px-2 sm:px-10 bg-gray-100">
    <h1 className="mb-2 text-xl font-bold text-gray-600">Booking ID : <span className="text-orange-500">{booking._id}</span></h1>
      <div className="font-semibold text-xl sm:text-3xl text-gray-700">
        {place.title}
      </div>
      <div className="font-semibold sm:text-xl text-gray-500">{place.address}</div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-600">Booking Details</h2>
          <div className="mt-2">
            <div>
              <span className="font-semibold text-gray-700">Check-In: </span>
              {new Date(booking.checkIn).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Check-Out: </span>
              {new Date(booking.checkOut).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Guests: </span>
              {booking.maxGuests}
            </div>
            <div>
              <span className="font-semibold text-gray-700">Phone: </span>
              {booking.phone}
            </div>
            <div className="mt-2 font-semibold text-lg">
              Total Price: <span className="text-orange-500 font-bold">${booking.price}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-600">Place Details</h2>
          <div className="mt-2">
            <div>
              <span className="font-semibold text-gray-700">Check-In Time: </span>
              {place.checkIn}:00
            </div>
            <div>
              <span className="font-semibold text-gray-700">Check-Out Time: </span>
              {place.checkOut}:00
            </div>
          </div>
          <div
            className="mt-3 w-fit flex items-center gap-1 bg-orange-500 text-white px-4 py-2 font-semibold rounded-lg cursor-pointer"
            onClick={deleteBooking}
          >
            <MdDelete className="" /> Cancel
          </div>
        </div>
  </div>
  <PlaceGallery placeData={place} setShowImages={setShowImages} />
  </div>
};

export default SingleBookingPage;
