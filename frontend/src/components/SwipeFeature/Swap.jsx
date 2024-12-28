import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";

const db = [
  {
    productName: "Wireless Earbuds",
    imageUrl:
      "https://imgs.search.brave.com/M-x6OsHDKQRjBu4pi9YCwhjb1CNvNdyV1gTbrKhkqKM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3RhdHVzLmNvL2Nk/bi9zaG9wL2ZpbGVz/L2JldHdlZW4tcHJv/X3Byb2QtcmVuZC0w/MS5qcGc_Y3JvcD1j/ZW50ZXImaGVpZ2h0/PTY0MCZ2PTE3Mjkx/MjYyNzImd2lkdGg9/NjQw",
  },
  {
    productName: "Smart Watch",
    imageUrl:
      "https://imgs.search.brave.com/rEq5yslHAyHoFhgMOvUB8NSDW1bYMtH82Tr4ED6GWjI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY5/MzI4Mjg2L3Bob3Rv/L3NtYXJ0d2F0Y2gu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVVuczFVMmZqYzBN/NURJenhXOHFvOFdt/X0s3YWZ4Zk5sd1JX/YWlYczQ2UE09",
  },
  {
    productName: "Laptop",
    imageUrl:
      "https://imgs.search.brave.com/qKMVCI7M1JqYilc1hysT6eYtWFxKTNY4LIbXQvq2WLg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/MjIzNzEwL3Bob3Rv/L2xhcHRvcC1mbG9h/dGluZy1hbmdsZWQt/b3Blbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9Z1VpZkph/cDRkRmtHeW5MQkFz/Q0NCdFR4eWpNNTEx/eTAtODVGLW50R092/VT0",
  },
  {
    productName: "Gaming Console",
    imageUrl:
      "https://imgs.search.brave.com/bLNKCNJTOjb-MJfsI5rhAirP83qafvHvcZBYZnjLVZM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQzLzM5LzY5/LzM2MF9GXzI0MzM5/Njk3MF9Ndng0aDNa/OEJHRTNNSXFqS1pq/NEw0R0o1UDVZMjlG/Ri5qcGc",
  },
  {
    productName: "Wireless Earbuds",
    imageUrl:
      "https://imgs.search.brave.com/M-x6OsHDKQRjBu4pi9YCwhjb1CNvNdyV1gTbrKhkqKM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3RhdHVzLmNvL2Nk/bi9zaG9wL2ZpbGVz/L2JldHdlZW4tcHJv/X3Byb2QtcmVuZC0w/MS5qcGc_Y3JvcD1j/ZW50ZXImaGVpZ2h0/PTY0MCZ2PTE3Mjkx/MjYyNzImd2lkdGg9/NjQw",
  },
  {
    productName: "Smart Watch",
    imageUrl:
      "https://imgs.search.brave.com/rEq5yslHAyHoFhgMOvUB8NSDW1bYMtH82Tr4ED6GWjI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY5/MzI4Mjg2L3Bob3Rv/L3NtYXJ0d2F0Y2gu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVVuczFVMmZqYzBN/NURJenhXOHFvOFdt/X0s3YWZ4Zk5sd1JX/YWlYczQ2UE09",
  },
  {
    productName: "Laptop",
    imageUrl:
      "https://imgs.search.brave.com/qKMVCI7M1JqYilc1hysT6eYtWFxKTNY4LIbXQvq2WLg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/MjIzNzEwL3Bob3Rv/L2xhcHRvcC1mbG9h/dGluZy1hbmdsZWQt/b3Blbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9Z1VpZkph/cDRkRmtHeW5MQkFz/Q0NCdFR4eWpNNTEx/eTAtODVGLW50R092/VT0",
  },
  {
    productName: "Gaming Console",
    imageUrl:
      "https://imgs.search.brave.com/bLNKCNJTOjb-MJfsI5rhAirP83qafvHvcZBYZnjLVZM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQzLzM5LzY5/LzM2MF9GXzI0MzM5/Njk3MF9Ndng0aDNa/OEJHRTNNSXFqS1pq/NEw0R0o1UDVZMjlG/Ri5qcGc",
  },
  {
    productName: "Wireless Earbuds",
    imageUrl:
      "https://imgs.search.brave.com/M-x6OsHDKQRjBu4pi9YCwhjb1CNvNdyV1gTbrKhkqKM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3RhdHVzLmNvL2Nk/bi9zaG9wL2ZpbGVz/L2JldHdlZW4tcHJv/X3Byb2QtcmVuZC0w/MS5qcGc_Y3JvcD1j/ZW50ZXImaGVpZ2h0/PTY0MCZ2PTE3Mjkx/MjYyNzImd2lkdGg9/NjQw",
  },
  {
    productName: "Smart Watch",
    imageUrl:
      "https://imgs.search.brave.com/rEq5yslHAyHoFhgMOvUB8NSDW1bYMtH82Tr4ED6GWjI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY5/MzI4Mjg2L3Bob3Rv/L3NtYXJ0d2F0Y2gu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVVuczFVMmZqYzBN/NURJenhXOHFvOFdt/X0s3YWZ4Zk5sd1JX/YWlYczQ2UE09",
  },
  {
    productName: "Laptop",
    imageUrl:
      "https://imgs.search.brave.com/qKMVCI7M1JqYilc1hysT6eYtWFxKTNY4LIbXQvq2WLg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/MjIzNzEwL3Bob3Rv/L2xhcHRvcC1mbG9h/dGluZy1hbmdsZWQt/b3Blbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9Z1VpZkph/cDRkRmtHeW5MQkFz/Q0NCdFR4eWpNNTEx/eTAtODVGLW50R092/VT0",
  },
  {
    productName: "Gaming Console",
    imageUrl:
      "https://imgs.search.brave.com/bLNKCNJTOjb-MJfsI5rhAirP83qafvHvcZBYZnjLVZM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQzLzM5LzY5/LzM2MF9GXzI0MzM5/Njk3MF9Ndng0aDNa/OEJHRTNNSXFqS1pq/NEw0R0o1UDVZMjlG/Ri5qcGc",
  },
];

function Swap() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [swipedIndices, setSwipedIndices] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    setSwipedIndices([...swipedIndices, index]);
  };

  const undoSwipe = () => {
    if (swipedIndices.length === 0) return;
    const lastSwipedIndex = swipedIndices[swipedIndices.length - 1];
    setSwipedIndices(swipedIndices.slice(0, -1));
    updateCurrentIndex(lastSwipedIndex);
  };

  const swipe = async (dir) => {
    if (currentIndex >= 0 && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-prim via-prim to-black">
      <h1 className="text-4xl font-extrabold mb-6 text-white tracking-wide">
        Swipe Your Products
      </h1>
      <div className="cardContainer w-11/12 max-w-3xl h-96 flex items-center justify-center relative">
        {db.map(
          (character, index) =>
            !swipedIndices.includes(index) && (
              <TinderCard
                ref={childRefs[index]}
                className="swipe absolute w-full h-full"
                key={character.productName + index}
                onSwipe={(dir) => swiped(dir, character.productName, index)}
              >
                <div className="card relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                  <img
                    src={character.imageUrl}
                    alt={character.productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full py-4 px-6">
                    <h3 className="text-xl font-semibold text-white">
                      {character.productName}
                    </h3>
                  </div>
                </div>
              </TinderCard>
            )
        )}
      </div>
      <div className="buttons flex justify-center gap-4 mt-6">
        <button
          onClick={() => swipe("left")}
          className="btn bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
        >
          Swipe Left
        </button>
        <button
          onClick={undoSwipe}
          className="btn bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
        >
          Undo
        </button>
        <button
          onClick={() => swipe("right")}
          className="btn bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
        >
          Swipe Right
        </button>
      </div>
      {lastDirection && (
        <h2 className="infoText text-2xl font-semibold text-white mt-6">
          You swiped{" "}
          <span className="capitalize text-yellow-400">{lastDirection}</span>
          {lastDirection === "right" ? " - Added to cart" : " - Ignored"}
        </h2>
      )}
    </div>
  );
}

export default Swap;
