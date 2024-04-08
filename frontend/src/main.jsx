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
import Login from './components/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement:<ErrorPage/>,
    children :[
      {
        path: "/Home",
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
        element: <Login/>,
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
