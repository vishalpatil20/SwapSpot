import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const InfiniteScrollAnimation = () => {
  return (
    <div className="bg-[#004AAD]">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-90%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden ">
        <motion.div style={{ x }} className="flex gap-6">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-[#004AAD]"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default InfiniteScrollAnimation;

const cards = [
  {
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    title: "Buy",
    id: 1,
  },
  {
    url: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg",
    title: "Sale",
    id: 2,
  },
  {
    url: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg",
    title: "Rent",
    id: 3,
  },
  {
    url: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg",
    title: "Talk",
    id: 4,
  },
  {
    url: "https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg",
    title: "Offers",
    id: 5,
  },
];