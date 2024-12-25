import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';

const db = [
  {
    productName: 'Wireless Earbuds',
    imageUrl: 'https://cdn.pixabay.com/photo/2020/12/07/15/40/headphones-5812344_1280.jpg',
  },
  {
    productName: 'Smart Watch',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/22/15/57/watch-1853900_1280.jpg',
  },
  {
    productName: 'Laptop',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/18/11/16/laptop-1839405_1280.jpg',
  },
  {
    productName: 'Gaming Console',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/08/14/12/27/console-2640166_1280.jpg',
  },
];

function Swap() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [swipedIndices, setSwipedIndices] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(() => Array(db.length).fill(0).map(() => React.createRef()), []);

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
        {db.map((character, index) => (
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
                  <h3 className="text-xl font-semibold text-white">{character.productName}</h3>
                </div>
              </div>
            </TinderCard>
          )
        ))}
      </div>
      <div className="buttons flex justify-center gap-4 mt-6">
        <button
          onClick={() => swipe('left')}
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
          onClick={() => swipe('right')}
          className="btn bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
        >
          Swipe Right
        </button>
      </div>
      {lastDirection && (
        <h2 className="infoText text-2xl font-semibold text-white mt-6">
          You swiped <span className="capitalize text-yellow-400">{lastDirection}</span>
        </h2>
      )}
    </div>
  );
}

export default Swap;
