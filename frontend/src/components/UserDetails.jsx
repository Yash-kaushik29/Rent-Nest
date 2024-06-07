import React from "react";

const userDetails = ({ user, logout }) => {
  return (
    <>
      {user && (
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{user.username}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="p-4 border-t mx-8 mt-2" onClick={logout}>
            <button className="w-1/2 block mx-auto rounded-full bg-orange-500 hover:shadow-lg font-semibold text-white px-6 py-2">
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default userDetails;
