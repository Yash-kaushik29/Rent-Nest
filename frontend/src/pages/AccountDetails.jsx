import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Loader from "../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserDetails from "../components/UserDetails";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import Accomodation from "./Accomodation";

const AccountDetails = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();
  let { subCategory } = useParams();

  if (subCategory === undefined) {
    subCategory = "profile";
  }

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
    let classes =
      "flex items-center gap-1 text-lg md:text-xl font-semibold text-gray-700 px-10 py-1 rounded-full my-1";

    if (category === subCategory) {
      classes += " bg-orange-500 text-white underline";
    }
    return classes;
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Failed to logout. Please try again.", {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };

  return (
    <div>
      {!ready ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row mt-5 sm:mt-12 max-w-xl justify-between items-center mx-auto">
            <Link to={"/account"}>
              <div className={addClasses("profile")}>
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
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Profile
              </div>
            </Link>
            <Link to={"/account/bookings"}>
              <div className={addClasses("bookings")}>
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
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                Bookings
              </div>
            </Link>
            <Link to={"/account/accomodations"}>
              <div className={addClasses("accomodations")}>
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
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                  />
                </svg>
                Accomodations
              </div>
            </Link>
          </div>

          <div className="max-w-md sm:max-w-xl md:max-w-2xl bg-orange-500 h-[1px] mt-8 mx-auto"></div>

          <div>
            {subCategory === "profile" && (
              <UserDetails user={user} logout={logout} />
            )}
            {subCategory === "accomodations" && <Accomodation />}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
