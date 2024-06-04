import React from "react";
import Lottie from "react-lottie";
import animationData from "../lottie/notfound.json";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={350} width={350} />
      <div className="text-orange-400 text-center my-4 font-bold text-2xl sm:text-4xl">Page Not Found</div>
    </div>
  );
};

export default NotFound;
