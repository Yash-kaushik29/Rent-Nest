import React from 'react'
import { FaPlaneDeparture } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoPersonCircleSharp } from "react-icons/io5";

const Header = () => {

  return (
    <div className='flex justify-between items-center px-10 py-4 shadow-md shadow-gray-200'>
        <div className='flex gap-4 items-center'>
            <div><FaPlaneDeparture className='text-5xl text-orange-500'/></div>
            <div className='text-orange-500 text-3xl font-semibold'>RestNest</div>
        </div>
        <div className='flex gap-2'>
            <div className='text-3xl'><GiHamburgerMenu /></div>
            <div className='text-3xl'><IoPersonCircleSharp /></div>
        </div>
    </div>
  )
}

export default Header