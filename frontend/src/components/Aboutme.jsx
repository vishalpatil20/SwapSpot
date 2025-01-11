import product1 from '../assets/product1.png';
import product2 from '../assets/product1.png';
import product3 from '../assets/product1.png';
import product4 from '../assets/product1.png';
import product5 from '../assets/product1.png';
import product6 from '../assets/product1.png';
import product7 from '../assets/product1.png';

const Aboutme = () => {
  return (
    <div>
      <div className="relative h-screen overflow-hidden bg-black">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-prim sm:text-6xl">
                Swap it, Sell it, Love it
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Welcome to Swapspot, your go-to destination for all things trading! Whether you're looking to swap, sell, or simply find your next favorite item, Swapspot is here to make it happen.
              </p>
              <p className="mt-4 text-lg text-gray-400">
                Discover a new way to shop and trade with our user-friendly platform. From trendy outfits to vintage collectibles, our marketplace is packed with opportunities to explore, connect, and exchange. Join a community that values sustainability and creativity in commerce.
              </p>
            </div>
            <div>
              <div className="mt-10">
                /* Decorative image grid */
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src={product1}
                            alt="Trendy Outfit"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product2}
                            alt="Vintage Collectible"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product3}
                            alt="Handmade Craft"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product4}
                            alt="Eco-friendly Product"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product5}
                            alt="Unique Accessory"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product6}
                            alt="Art Piece"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product7}
                            alt="Gadget"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/products"
                  className="inline-block rounded-md border border-transparent bg-prim px-8 py-3 text-center font-medium text-black hover:bg-white"
                >
                  Shop Collection
                </a>
                </div>
                </div>
                </div>
                </div>
                </div>

                <div className="bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
                  <div className="max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-prim sm:text-4xl">
                      Why Choose Swapspot?
                    </h2>
                    <p className="mt-4 text-lg text-gray-400">
                      Swapspot offers a unique and sustainable way to shop and trade. Our platform is designed to connect you with a community that values creativity and eco-friendliness. Whether you're looking for trendy outfits, vintage collectibles, or handmade crafts, Swapspot has something for everyone. Join us and experience a new way of commerce that prioritizes both people and the planet.
                    </p>
                  </div>
                </div>

      <div className="bg-gray-800 py-16 px-4 sm:px-6 lg:px-8 h-screen">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-prim sm:text-3xl">
            What Our Users Say
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "Swapspot made it so easy to find a new home for my unused items. The process is seamless, and the community is fantastic!"
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— Alex Johnson</cite>
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "I love how intuitive the platform is. I've discovered some unique items I never thought I’d find!"
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— Priya Sharma</cite>
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "The secure payment system gives me peace of mind. Swapspot is a game-changer for trading online."
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— John Doe</cite>
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "Swapspot made it so easy to find a new home for my unused items. The process is seamless, and the community is fantastic!"
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— Alex Johnson</cite>
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "I love how intuitive the platform is. I've discovered some unique items I never thought I’d find!"
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— Priya Sharma</cite>
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "The secure payment system gives me peace of mind. Swapspot is a game-changer for trading online."
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— John Doe</cite>
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "Swapspot made it so easy to find a new home for my unused items. The process is seamless, and the community is fantastic!"
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— Alex Johnson</cite>
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "I love how intuitive the platform is. I've discovered some unique items I never thought I’d find!"
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— Priya Sharma</cite>
              </footer>
            </blockquote>
            <blockquote className="bg-gray-700 p-6 rounded-lg">
              <p className="text-lg text-gray-300">
                "The secure payment system gives me peace of mind. Swapspot is a game-changer for trading online."
              </p>
              <footer className="mt-4">
                <cite className="text-sm text-gray-400">— John Doe</cite>
              </footer>
            </blockquote>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
