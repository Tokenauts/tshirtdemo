"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
export default function Home() {
  // Hardcoded product details
  const [selectedSize, setSelectedSize] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); // State to control the overlay
  const [trxID, settrxID] = useState(null);
  const handlePurchase = async () => {
    const data = {
      address: "0x1b3A00A796940C2a23a05c867b88bb5832c19435",
      amount: 30,
      chainId: 5,
      contractAddress: "0x46F9BF1Ec252e6f7FFcA7650faDb1Ea2F29E0DC8",
    };

    try {
      const response = await fetch("/api/GetTransactionId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData.id);

      if (responseData) {
        setShowOverlay(true);
        settrxID(responseData);
      }
    } catch (error) {
      console.error("There was an error with the transaction:", error);
    }
  };

  const product = {
    name: "Nothing Great",
    description: "This is a Cotton Tshirt with Front Print",
    price: "30.00",
    fileHashes: {
      video: "Tshirt.webm",
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  const videoHash = product.fileHashes.video;
  return (
    <div className="w-full h-full bg-slate-900 text-black">
      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-opacity-75 bg-black flex justify-center items-center">
          <iframe
            src="https://front-git-test-way2pay.vercel.app/redirect/"
            title="External Page"
            width="80%"
            height="80%"
            frameBorder="0"
          ></iframe>
          <button
            className="absolute top-5 right-5 bg-red-600 text-white p-2 rounded"
            onClick={() => setShowOverlay(false)}
          >
            Close
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full h-full p-4 md:p-12 bg-slate-900 max-w-7xl mx-auto min-h-screen">
        <motion.div className="flex-1 p-4 md:p-6 bg-slate-900 rounded-lg mb-4 md:mb-0">
          <div className="flex-1 p-4 md:p-6 bg-slate-900">
            {videoHash && (
              <video
                className="h-full w-full object-cover"
                src={videoHash}
                autoPlay
                muted
                loop
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </motion.div>

        {/* Product Information Section */}
        <motion.div
          className="flex-1 p-4 md:p-6 ml-0 md:ml-12 bg-white rounded-lg text-left"
          variants={infoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex-1 p-4 md:p-6 ml-0 md:ml-12 bg-white rounded-lg">
            <h2 className="text-2xl font-bold leading-tight">{product.name}</h2>
            <p className="mt-4 mb-8 text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <h3 className="text-xl font-bold leading-tight">
              Price: ${product.price}
            </h3>

            {/* Sizes */}
            <div className="mt-6">
              <label className="block  text-lg font-medium leading-tight mb-5">
                Size:
              </label>
              <div className="flex flex-wrap space-x-2 md:space-x-4">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border-2 mb-2 ${
                      selectedSize === size
                        ? "bg-blue-500 text-white "
                        : "bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={handlePurchase}
                className="Text-xl font-medium bg-black text-white p-2 px-4 rounded-lg mt-10"
              >
                Buy Product
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
