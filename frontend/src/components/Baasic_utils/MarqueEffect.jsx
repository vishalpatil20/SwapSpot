import React from "react";
import Marquee from "react-fast-marquee";
import {logo} from './assets/dark_logo.png';

const MarqueeEffect = () => (
  <Marquee className="text-[#004AAD] text-xl"autoFill pauseOnHover direction="right" gradient gradientWidth={200} gradientColor="#000000" speed={120}>
    <div >
      <img src={logo} alt=""  className="h-20 w-20"/>
    </div>
  </Marquee>
  
);


export default MarqueeEffect;
