import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ booking, fetchBookings }) => {
    const [place, setPlace] = useState([]);
    const { placeId, checkIn, checkOut, maxGuests, price, phone } = booking;

    useEffect(() => {
        const fetchPlaceData = async() => {
            const { data } = await axios.get(`http://localhost:5000/getPlace/${placeId}`);
            setPlace(data);
        }
        fetchPlaceData();
    }, [])

    const deleteBooking = async () => {
        const bookingId = booking._id;
        const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
        if (!confirmDelete) return;
    
        try {
          await axios.delete(`http://localhost:5000/deleteBooking/${bookingId}`);
          fetchBookings();
          enqueueSnackbar("Booking Cancelled !", {
            autoHideDuration: 3000,
            variant: "success", 
          });
        } catch (error) {
          console.error('Error deleting booking:', error);
          enqueueSnackbar("Failed to Cancel Booking", {
            autoHideDuration: 3000,
            variant: "error", 
          });
        }
      };
  
    return (
        <div className="grid grid-cols-1 xs:grid-cols-[2fr_3fr] md:grid-cols-[2fr_3fr] gap-x-4 mt-5 mx-3 sm:mx-6 md:mx-12 border rounded-xl shadow-lg shadow-gray-300">
        <div>
          <img src={`http://localhost:5000/uploads/${place?.images?.[0]}`} className="w-full h-auto xs:h-[175px] object-cover rounded-l-xl" />
        </div>
        <div className="flex relative flex-col">
          <h1 className="text-xl font-semibold text-gray-700">{place.title}</h1>
          <p className="font-semibold text-gray-500">{place.address}</p>
          <div className="mt-3">
            <span className="font-semibold text-gray-700">CheckIn:</span> {new Date(checkIn).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold text-gray-700">CheckOut:</span> {new Date(checkOut).toLocaleDateString()}
          </div>
          <div className="font-bold text-gray-600">
            {place.checkIn}:00 - {place.checkOut}:00
          </div>
          <p className="mt-2 font-semibold text-lg">
            Total Price: <span className="text-orange-500 font-bold">${price}</span>
          </p>
          <div className='absolute right-3 bottom-2 flex items-center gap-1 bg-orange-500 text-white px-2 py-1 font-semibold rounded-lg cursor-pointer' onClick={deleteBooking}>
            <MdDelete className='' /> Cancel
          </div>
        </div>
      </div>
      
    );
  };
  

export default BookingCard