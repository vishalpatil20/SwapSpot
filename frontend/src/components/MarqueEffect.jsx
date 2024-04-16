import React from "react";
import Marquee from "react-fast-marquee";
import { CiBadgeDollar } from "react-icons/ci";


const MarqueeEffect = () => (
  <Marquee autoFill pauseOnHover direction="right">
    <div className="text-[#004AAD] text-5xl">
    <CiBadgeDollar />
    </div>
  </Marquee>
  
);


export default MarqueeEffect;
