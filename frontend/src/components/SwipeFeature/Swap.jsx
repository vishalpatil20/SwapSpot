import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';

const db = [
  {
    name: 'Richard Hendricks',
    url: '/Swipe_assets/dark_logo.png',
  },
  {
    name: 'Erlich Bachman',
    url: '/Swipe_assets/dark_logo.png',
  },
  {
    name: 'Monica Hall',
    url: '/Swipe_assets/dark_logo.png',
  },
  {
    name: 'Jared Dunn',
    url: '/Swipe_assets/dark_logo.png',
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
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4 text-white">React Tinder Card</h1>
      <div className="cardContainer w-90vw max-w-4xl h-96 flex items-center justify-center relative">
        {db.map((character, index) => (
          !swipedIndices.includes(index) && (
            <TinderCard
              ref={childRefs[index]}
              className="swipe absolute w-full h-full"
              key={character.name + index}
              onSwipe={(dir) => swiped(dir, character.name, index)}
            >
              <div
                style={{ backgroundImage: `url(${character.url})` }}
                className="card bg-cover bg-center w-full h-full rounded-lg shadow-lg"
              >
                <h3 className="absolute bottom-0 mb-4 ml-4 text-white">{character.name}</h3>
              </div>
            </TinderCard>
          )
        ))}
      </div>
      <div className="buttons flex flex-wrap justify-center mt-4">
        <button
          onClick={() => swipe('left')}
          className="btn bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Swipe left!
        </button>
        <button
          onClick={() => undoSwipe()}
          className="btn bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Undo
        </button>
        <button
          onClick={() => swipe('right')}
          className="btn bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Swipe right!
        </button>
      </div>
      {lastDirection && (
        <h2 className="infoText text-xl font-semibold text-white">
          You swiped {lastDirection}
        </h2>
      )}
    </div>
  );
}

export default Swap;
