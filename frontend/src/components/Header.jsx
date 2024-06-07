import React, { useContext, useEffect } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center px-3 sm:px-10 py-3 shadow-lg shadow-gray-300">
      <div className="flex gap-2 sm:gap-5 items-center">
        <div>
          <FaPlaneDeparture className="text-2xl sm:text-2xl md:text-3xl text-orange-500 " />
        </div>
        <div className="text-orange-500 text-xl sm:text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600">
          RENTNEST
        </div>
      </div>
      {user ? (
        <div className="flex gap-2 sm:gap-3 border-2 border-gray-300 px-3 py-1 rounded-full shadow-md items-center">
          <div className="text-xl sm:text-2xl md:text-3xl text-gray-700">
            <GiHamburgerMenu />
          </div>
          <Link to={"/account"}>
            <div className="flex items-center gap-2">
              <div className="text-xl sm:text-2xl md:text-3xl text-gray-600">
                <IoPersonCircleSharp />
              </div>
              <div className="text-xl font-bold text-gray-700">
                {user.username}
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <Link to={"/login"}>
          <div>
            <button className="text-md sm:text-lg md:text-xl bg-orange-500 font-semibold text-white px-4 py-2 rounded-full animate-bounce">
              Login
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;
