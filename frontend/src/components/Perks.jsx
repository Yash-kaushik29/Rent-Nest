import React from "react";
import { IoCarSport, IoWifiOutline } from "react-icons/io5";
import { MdFamilyRestroom, MdOutlinePets } from "react-icons/md";
import { PiForkKnifeFill } from "react-icons/pi";
import { TbSmokingNo } from "react-icons/tb";

const Perks = ({ selected, onChange }) => {
  const checkPerks = (e) => {
    const { checked, name } = e.target;

    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((perk) => perk !== name)]);
    }
    console.log(selected);
  };
  return (
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Extra Perks
      </label>
      <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-2">
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="wifi" onChange={checkPerks} />
          <IoWifiOutline className="text-xl" />

          <span className="font-semibold">wifi</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="parking" onChange={checkPerks} />
          <IoCarSport className="text-xl" />
          <span className="font-semibold">Free Parking</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="fire" onChange={checkPerks} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
          </svg>
          <span className="font-semibold">Fire Proof</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="service" onChange={checkPerks} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
            />
          </svg>

          <span className="font-semibold">Room Service</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="smoking" onClick={checkPerks} />
          <TbSmokingNo className="text-xl" />

          <span className="font-semibold">No Smoking rooms</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="tv" onChange={checkPerks} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>

          <span className="font-semibold">TV</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="music" onChange={checkPerks} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
          <span className="font-semibold">Music System</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="family" onChange={checkPerks} />
          <MdFamilyRestroom className="text-xl" />

          <span className="font-semibold">Family</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="dinner" onChange={checkPerks} />
          <PiForkKnifeFill className="text-xl" />

          <span className="font-semibold">Dinner</span>
        </label>
        <label className="flex gap-2 items-center border border-gray-300 px-4 py-2 rounded-2xl">
          <input type="checkbox" name="pets" onChange={checkPerks} />
          <MdOutlinePets className="text-xl" />

          <span className="font-semibold">Pets</span>
        </label>
      </div>
    </div>
  );
};

export default Perks;
