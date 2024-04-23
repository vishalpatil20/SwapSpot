import React from 'react'
import PayButton from './PayButton'
import Swap from './Swap'
import SocketClient from '../components/chatFeature/trial'
const PLay = () => {
  return (
    <div>
        <PayButton/>
        <Swap/>
        <SocketClient/>
    </div>
  )
}

export default PLay