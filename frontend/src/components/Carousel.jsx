import React, { useState, useEffect } from 'react';
import { IoMdArrowDroprightCircle, IoMdArrowDropleftCircle } from "react-icons/io";

const images = [
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg',
  '/img6.jpg'
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative overflow-hidden rounded-lg h-[30vh] sm:h-[40vh] md:h-[400px] lg:h-[500px] 3xl:h-[60vh] mt-4 mx-2">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute block w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            className="block w-full h-full object-cover"
            alt={`Slide ${index}`}
          />
        </div>
      ))}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent bg-opacity-50 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        <IoMdArrowDropleftCircle className='text-2xl sm:text-4xl text-white' />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        <IoMdArrowDroprightCircle className='text-2xl sm:text-4xl text-white' />
      </button>
    </div>
  );
};

export default Carousel;
