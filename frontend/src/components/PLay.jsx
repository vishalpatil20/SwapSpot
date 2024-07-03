import React from 'react'
import PayButton from './Baasic_utils/PayButton'
import Swap from './SwipeFeature/Swap'
import ChatApp from '../components/chatFeature/ChatApp'
import ProductShoppingCart from '../components/Products/ProductShoppingCart'


const PLay = () => {
  return (
    <div>
      <h1>      this is a component that si to be removed while deplying</h1>
        <PayButton/>
        <Swap/>
        {/* <ChatApp/> */}
        <ProductShoppingCart/>
    </div>
  )
}

export default PLay