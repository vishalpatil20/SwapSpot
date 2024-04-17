import React from 'react'
import Intro from './Intro'
import Typewriter from 'typewriter-effect';
import InfiniteScrollAnimation from './InfiniteScrollAnimation'
import Footer from './Footer';
import MarqueEffect from './MarqueEffect';

const Home = () => {
  return (
    <div className=' bg-[#000000] h-dvh	'>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="m-0 p-0 text-6xl md:text-8xl lg:text-9xl font-bold tracking-wide text-white">Welcome to <span className='text-[#004AAD] '>
        <Typewriter
            onInit={(typewriter) => {
            typewriter.typeString('SwapSpot')
            .pauseFor(2)
            .start();
            
          }}
        />
        </span>
      </span>
      </div>
      
      <Intro/>
      <MarqueEffect/>
      <InfiniteScrollAnimation/>
      <Footer/>
    </div>
  )
}

export default Home