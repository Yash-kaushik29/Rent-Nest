import React from 'react'
import { FaPlaneDeparture } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonCircleSharp } from "react-icons/io5";

const Header = () => {

  return (
    <div className='flex justify-between items-center px-3 sm:px-10 py-3 shadow-md shadow-gray-200'>
        <div className='flex gap-2 sm:gap-5 items-center'>
            <div><FaPlaneDeparture className='text-2xl sm:text-2xl md:text-3xl text-orange-500 '/></div>
            <div className='text-orange-500 text-xl sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-600'>RENTNEST</div>
        </div>
        <div className='flex gap-3 sm:gap-5 border-2 border-gray-300 px-3 py-1 rounded-full shadow-md'>
            <div className='text-xl sm:text-2xl md:text-3xl'><GiHamburgerMenu /></div>
            <div className='text-xl sm:text-2xl md:text-3xl'><IoPersonCircleSharp /></div>
        </div>
    </div>
  )
}

export default Header