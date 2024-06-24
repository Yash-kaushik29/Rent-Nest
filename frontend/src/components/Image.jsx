import React from "react";

const Image = ({ src, ...rest }) => {
  const path =
    src && src.includes("http://")
      ? src
      : "http://localhost:5000/uploads/" + src;
  return <img {...rest} src={path} alt="Img" />;
};

export default Image;
