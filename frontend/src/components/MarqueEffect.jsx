import Marquee from "react-marquee-slider";

export default function MarqueEffect() {
    return (
      <Marquee velocity={25}>
        <div>Your content goes here</div>
        <div>Your content goes here</div>
        <div>Your content goes here</div>
        <div>Your content goes here</div>
      </Marquee>
    );
  }