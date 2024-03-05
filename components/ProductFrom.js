import { Layout } from "@/components/Layout";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
export default function ProductFrom({
  _id,
  name: existingName,
  details: existingDetails,
  price: existingPrice,
  imge: existingImge,
  featured:existingFeatured
}) {
  const [name, setName] = useState(existingName || " ");
  const [details, setDetails] = useState(existingDetails || " ");
  const [price, setPrice] = useState(existingPrice || " ");
  const [featured, setFeatured] = useState(existingFeatured || false);
  const [imge, setImge] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const newProduct = {
    name: name,
    details: details,
    price: price,
    img: imge,
    featured: featured,
  };

  const handleSummit = async (e) => {
    e.preventDefault();

    try {
      if (_id) {
          await axios.put('/api/product', { ...newProduct, _id });
      } else {
          await axios.post("/api/product", newProduct);
      }
  } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately, e.g., show a message to the user
  }
    router.push("/");
  };

  const ImgeUpload = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // Accessing files property to get the selected file
    reader.onload = () => {
      setImge(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error :", error);
    };
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
       setFeatured(true);
    } else {
       setFeatured(false);
    }
 }
 


  return (
    <form
      className="h-full  items-center flex flex-col justify-start bg-black text-white px-8 py-16"
      onSubmit={handleSummit}
    >
      {error ? <div className="mb-4 text-red-500">{error}</div> : null}
      {message ? <div className="mb-4 text-green-500">{message}</div> : null}
      <div className="w-full max-w-lg">
        <div className="mb-6">
          <label htmlFor="title" className="text-x font-semibold mb-2">
            ชื่อสินค้า
          </label>
          <input
            type="text"
            name="title"
            placeholder="Add some Title "
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 text-white w-full p-3 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="details" className="text-x; font-semibold mb-2">
            รายละเอียด
          </label>
          <textarea
            name="details"
            placeholder="Add some details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="bg-gray-800 text-white w-full p-3 h-48 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="text-x; font-semibold mb-2">
            ราคา
          </label>
          <input
            type="text"
            name="price"
            placeholder="Add some price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-800 text-white w-full p-3 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="imge" className="text-x font-semibold mb-2">
            รูปสินค้า
          </label>
          <input
            type="file"
            name="imge"
            accept="image/*"
            placeholder="Add some imge"
            onChange={ImgeUpload}
            className="bg-gray-800 text-white w-full p-3 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {imge == "" || imge == null ? (
            ""
          ) : (
            <Image width={100} height={100} src={imge} />
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="text-x; font-semibold mb-2">
          featured
          </label>
          <input
            type="checkbox"
            name="price"
            placeholder="Add some price"
            value={featured}
            onChange={handleCheckBox}
            className="bg-gray-800 text-white w-full p-3 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full focus:outline-none focus:ring focus:border-blue-300"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
