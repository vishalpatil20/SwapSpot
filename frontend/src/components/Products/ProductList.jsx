import { products } from "./constants";
export default function ProductList() {
  return (
    <div className="bg-black">
      <div className=" max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-2 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-2 text-sm text-prim">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-white">
                {product.price}
              </p>
              <div className="flex items-center mt-1 text-sm font-medium text-gray-600">
                <p className="mr-2">Posted : {product.dateCreated} </p>
                <p className="mr-2">{product.color}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
