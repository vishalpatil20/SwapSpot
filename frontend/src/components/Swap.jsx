import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import RichardImage from '../assets/dark_logo.png';


const db = [
  {
    name: 'Richard Hendricks',
    url: RichardImage,
  },
  {
    name: 'Erlich Bachman',
    url: './img/erlich.jpg',
  },
  {
    name: 'Monica Hall',
    url: './img/monica.jpg',
  },
  {
    name: 'Jared Dunn',
    url: './img/jared.jpg',
  },
  {
    name: 'Dinesh Chugtai',
    url: './img/dinesh.jpg',
  },
];

function Swap() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
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

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#004AAD]">
      <h1 className="text-2xl font-bold mb-4">React Tinder Card</h1>
      <div className="cardContainer w-90vw max-w-4xl h-96 flex items-center justify-center">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe bg-blue-500 rounded-lg shadow-lg"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: `url(${character.url})` }}
              className="card bg-cover bg-center w-full h-full rounded-lg"
            >
              <h3 className="absolute bottom-0 mb-4 ml-4 text-black">{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons flex flex-wrap justify-center mt-4">
        <button
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => swipe('left')}
          className="btn bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canGoBack && '#c3c4d3' }}
          onClick={() => goBack()}
          className="btn bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => swipe('right')}
          className="btn bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText text-xl font-semibold">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText text-xl font-semibold">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Swap;
