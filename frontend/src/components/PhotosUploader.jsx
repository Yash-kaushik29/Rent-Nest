import axios from "axios";
import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { IoStar, IoStarOutline } from "react-icons/io5";
import Image from "./Image";

const PhotosUploader = ({ images, setImages }) => {
  const [imageURL, setImageURL] = useState("");

  const addImageByUrl = async (e) => {
    e.preventDefault();

    const { data: filename } = await axios.post(
      "/save-image",
      { url: imageURL },
      { withCredentials: true }
    );
    setImages((prev) => {
      return [...prev, filename];
    });
    setImageURL("");
  };

  const handleUpload = async (e) => {
    const files = e.target.files;
    const filedata = new FormData();

    for (let i = 0; i < files.length; i++) {
      filedata.append("photos", files[i]);
    }

    const { data: filenames } = await axios.post(
      "/upload",
      filedata,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    setImages((prev) => {
      return [...prev, ...filenames];
    });
  };

  const deleteImage = (imageToBeDeleted) => {
    const newImages = images.filter(image => {
      return image != imageToBeDeleted;
    })

    setImages(newImages)
  }

  const setCoverPhoto = (coverPhoto) => {
    const newImages = images.filter(image => {
      return image != coverPhoto;
    })

    setImages([coverPhoto, ...newImages]);
  }

  return (
    <>
      <div>
        <label className="block text-lg font-medium text-gray-700">
          Images
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            name="images"
            placeholder="Enter link for your image"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            className="bg-orange-500 px-3 rounded-xl text-white font-semibold"
            onClick={addImageByUrl}
          >
            Add&nbsp;image
          </button>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {images.length > 0 &&
            images.map((image) => (
              <div key={image} className="mt-4 rounded-xl flex relative">
                <div className="cursor-pointer absolute right-2 bottom-1 text-2xl text-white" onClick={() => deleteImage(image)}><MdOutlineDelete /></div>
                <div className="cursor-pointer absolute left-2 bottom-2 text-xl text-white" onClick={() => setCoverPhoto(image)}>
                  {image === images[0] ? 
                  <IoStar />:
                  <IoStarOutline /> }
                </div>
                <Image
                  src={image}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg shadow-sm"
                />
              </div>
            ))}
          <label className="flex justify-center items-center cursor-pointer border-2 border-dotted border-gray-300 mt-4 text-gray-600 font-semibold rounded-xl w-full h-32 bg-gray-50">
            <input
              type="file"
              className="hidden"
              multiple
              onChange={handleUpload}
            />
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
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </label>
        </div>
      </div>
    </>
  );
};

export default PhotosUploader;
