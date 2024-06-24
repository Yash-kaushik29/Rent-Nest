import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { MdModeEdit } from "react-icons/md";
import Image from './Image';

const UserAccomodations = ({accomodation}) => {
  return (
  <Card className="max-w-[350px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] flex flex-col sm:flex-row sm:items-left items-center my-8 mx-auto border-2 border-gray-200">
  <CardHeader
    shadow={false}
    floated={false}
    className="m-0 shrink-0 rounded-r-none"
  >
    <Image
      src={accomodation.images[0]}
      alt="card-image"
      className="h-48 w-48 object-cover rounded-md"
    />
  </CardHeader>
  <CardBody className="sm:ml-6 overflow-hidden">
    <Typography className="mb-2 text-3xl text-center sm:text-left">
      {accomodation.title}
    </Typography>
    <Typography className='mb-1 font-semibold text-gray-600 text-xl text-center sm:text-left'>
      {accomodation.address}
    </Typography>
    <div className="flex flex-wrap gap-2 mt-3">
      {accomodation.perks.length > 0 && accomodation.perks.map((perk) => (
        <div key={perk} className="bg-orange-500 text-white px-2 py-1 rounded">
          {perk}
        </div>
      ))}
    </div>
    <div className='flex items-center justify-start my-5'>
    <div className='font-semibold text-lg'>
      <span className='text-orange-500 font-bold text-xl'>${accomodation.price}</span> per night
    </div>
    <Link to={`/account/my-accomodations/${accomodation._id}`} className='absolute right-0 mr-10'>
    <div className='flex items-center gap-1 my-2 font-semibold text-lg bg-orange-500 hover:bg-orange-400 text-white px-4 py-1 rounded-full w-fit'>
      <MdModeEdit />
      Edit
    </div>
    </Link>
    </div>
  </CardBody>
</Card>

  )
}

export default UserAccomodations