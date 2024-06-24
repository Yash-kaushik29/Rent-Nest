import React from 'react'
import { GrGallery } from "react-icons/gr";
import Image from './Image';

const PlaceGallery = ({placeData, setShowImages}) => {
  return (
    <div className="flex mt-5 gap-2 rounded-xl">
    <div className="basis-2/3">
      {placeData.images?.[0] && (
        <div className="h-full">
          <Image
            src={placeData.images[0]}
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>
      )}
    </div>
    <div className="basis-1/3 grid gap-2 relative">
      {placeData.images?.[1] && (
        <div className="h-full">
          <Image
            src={placeData.images[1]}
            className="h-full w-full object-cover rounded-tr-lg"
          />
        </div>
      )}
      {placeData.images?.[2] && (
        <div className="h-full relative">
          <Image
            src={placeData.images[2]}
            className="h-full w-full object-cover rounded-br-lg"
          />
          <button className="flex items-center absolute right-2 bottom-2 text-white bg-orange-500 px-2 py-1 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm md:text-base lg:text-lg" onClick={() => setShowImages(true)}>
            <GrGallery className="mr-1 sm:mr-2" />
            All Photos
          </button>
        </div>
      )}
    </div>
  </div>
  
  )
}

export default PlaceGallery