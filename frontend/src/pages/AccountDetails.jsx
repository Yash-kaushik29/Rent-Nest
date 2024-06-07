import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const AccountDetails = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();
  let { subCategory } = useParams();

  if (subCategory === undefined) {
    subCategory = "profile";
  }

  console.log(subCategory);

  // Redirect to home with a warning if user is not logged in
  if (ready && !user) {
    enqueueSnackbar("Please Login To See Details!", {
      autoHideDuration: 3000,
      variant: "warning",
    });
    navigate("/");
  }

  // Function to add conditional classes for navigation links
  const addClasses = (category) => {
    let classes = "text-lg md:text-xl font-semibold text-gray-700 px-10 py-1 rounded-full my-1";

    if (category === subCategory) {
      classes += " bg-orange-500 text-white underline";
    }
    return classes;
  }

  // Function to handle logout
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Failed to logout. Please try again.", {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  }

  return (
    <div>
      {!ready ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row mt-5 sm:mt-12 max-w-xl justify-between items-center mx-auto">
            <Link to={"/account"}>
              <div className={addClasses("profile")}>Profile</div>
            </Link>
            <Link to={"/account/bookings"}>
              <div className={addClasses("bookings")}>Bookings</div>
            </Link>
            <Link to={"/account/accomodations"}>
              <div className={addClasses("accomodations")}>Accomodations</div>
            </Link>
          </div>

          <div>
            {subCategory === "profile" && (
              <UserDetails user={user} logout={logout} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountDetails;
