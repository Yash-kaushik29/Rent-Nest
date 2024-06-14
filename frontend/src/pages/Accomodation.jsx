import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserAccomodations from "../components/UserAccomodations";
import Form from "../components/Form";

const Accomodation = () => {
  const { action } = useParams();
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    const fetchAccomodations = async() => {
        const {data} = await axios.get("http://localhost:5000/getAccomodations", {withCredentials: true});
        setAccomodations(data);
    }

    fetchAccomodations();
  }, []);

  return (
    <div>
      {action !== "new" ? (
        <>
        <div className="text-center">
          <Link
            to={"/account/my-accomodations/new"}
            className="inline-flex gap-2 items-center mt-12 bg-orange-500 text-white font-semibold text-lg px-3 sm:px-10 py-2 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add new accomodation
          </Link>
        </div>
        
        <div className="mt-8">
          {accomodations.length > 0 && accomodations.map((accomodation) => (
            <UserAccomodations key={accomodation._id} accomodation={accomodation} />
          ))}
        </div>
        </>
      ) : (
        <div className="mx-2 sm:px-5 md:mx-10 mt-6">
          <Form />
        </div>
      )}
    </div>
  );
};

export default Accomodation;
