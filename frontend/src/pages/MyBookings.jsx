import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import BookingCard from "../components/BookingCard";

const MyBookings = () => {
  const { user } = useContext(UserContext);
  const [bookings, setbookings] = useState([]);

  const fetchBookings = async () => {
    const { data } = await axios.get("http://localhost:5000/getBookings", {
      withCredentials: true,
    });
    setbookings(data);
  };
  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-5">
      {bookings.length > 0 &&
        bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            fetchBookings={fetchBookings}
          />
        ))}
    </div>
  );
};

export default MyBookings;
