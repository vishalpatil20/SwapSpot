import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';

const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    name: 'Erlich Bachman',
    url: 'https://images.unsplash.com/photo-1502767089025-6572583495b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    name: 'Monica Hall',
    url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    name: 'Jared Dunn',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-800 via-purple-700 to-black">
      <h1 className="text-4xl font-extrabold mb-6 text-white tracking-wide">
        Swipe Your Match
      </h1>
      <div className="cardContainer w-11/12 max-w-3xl h-96 flex items-center justify-center relative">
        {db.map((character, index) => (
          !swipedIndices.includes(index) && (
            <TinderCard
              ref={childRefs[index]}
              className="swipe absolute w-full h-full"
              key={character.name + index}
              onSwipe={(dir) => swiped(dir, character.name, index)}
            >
              <div className="card relative w-full h-full rounded-lg shadow-xl overflow-hidden">
                <img
                  src={character.url}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full py-4 px-6">
                  <h3 className="text-xl font-semibold text-white">{character.name}</h3>
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
