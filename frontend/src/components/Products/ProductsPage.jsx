import React from 'react'
import ProductsSidebar from './ProductsSidebar'
import ProductPaging from './ProductPaging'
// import ProductCart from './ProductCart'
const ProductsPage = () => {
  return (
    <div>
        <ProductsSidebar/>
        {/* <ProductCart/> */}
        <ProductPaging/>
    </div>
  )
}

export default ProductsPage