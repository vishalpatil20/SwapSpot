
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
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
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
                            alt="Product 1"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product2}
                            alt="Product 2"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product3}
                            alt="Product 3"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product4}
                            alt="Product 4"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product5}
                            alt="Product 5"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product6}
                            alt="Product 6"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={product7}
                            alt="Product 7"
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
      {/* <Swap/> */}
    </div>
  );
};

export default Aboutme;