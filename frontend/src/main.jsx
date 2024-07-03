import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import './index.css'
import Aboutme from './components/Aboutme.jsx';
import Home from './components/Home.jsx';
import LoginSignUpForm from './components/Login/LoginSignUpForm.jsx';
import PayButton from './components/Baasic_utils/PayButton.jsx'
import PLay from './components/PLay.jsx'
import ProductsPage from './components/Products/ProductsPage.jsx';
import SwapCallRegister from './components/SwapCall/SwapCallRegister.jsx';
import SwapCallFeature from './components/SwapCall/SwapCallFeature.jsx';
import Profile from './components/Profile/Profile.jsx';
import Swap from './components/SwipeFeature/Swap.jsx';
import CheckoutForm from './components/Products/CheckoutForm.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<ErrorPage/>,
    children :[
      {
        path: "/",
        element: <Home/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/Aboutme",
        element: <Aboutme/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/Login",
        element: <LoginSignUpForm/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/PLAY",
        element: <PLay/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/products",
        element: <ProductsPage/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/Swapcall",
        element: <SwapCallRegister/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/SwapVideocalling",
        element: <SwapCallFeature/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/SwapSwipe",
        element: <Swap/>,
        errorElement:<ErrorPage/>,
      },
      {
        path: "/Checkout",
        element: <CheckoutForm/>,
        errorElement:<ErrorPage/>,
      },
      
    ]
  },

  


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
