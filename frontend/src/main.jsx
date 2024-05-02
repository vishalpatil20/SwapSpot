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
import LoginSignUpForm from './components/LoginSignUpForm.jsx';
import PayButton from './components/PayButton.jsx'
import PLay from './components/PLay.jsx'
import ProductsPage from './components/Products/ProductsPage.jsx';
import SwapCallRegister from './components/SwapCall/SwapCallRegister.jsx';
import SwapCallFeature from './components/SwapCall/SwapCallFeature.jsx';

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
    ]
  },

  


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
