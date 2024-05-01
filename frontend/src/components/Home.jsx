import React from 'react'
import Intro from './Intro'
import Typewriter from 'typewriter-effect';
import InfiniteScrollAnimation from './InfiniteScrollAnimation'
import Footer from './Footer';
import MarqueEffect from './MarqueEffect';
import { useLocation } from 'react-router-dom';
import Aboutme from './Aboutme';
import Banner from '../components/Banner'
import SwappCallPricing from './SwapCall/SwapCallPricing';


const Home = () => {
  const location = useLocation();
  const userName = location.state && location.state.userName;

  return (
    <div className=' bg-[#000000] h-dvh	'>
      {userName && (
          <div className="flex items-center text-white text-2xl absolute top-0 right-0 p-4">
            <FaUser className="mr-2" />
            Hello, {userName || ''}!
          </div>
        )}
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
      <Banner/>
      <Intro/>
      {/* <MarqueEffect/> */}
      <Aboutme/>
      <InfiniteScrollAnimation/>
      <SwappCallPricing/>
      <Footer/>
    </div>
  )
}

export default Home