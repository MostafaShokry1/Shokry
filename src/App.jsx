import React, { useEffect, useState } from 'react'
import { Offline, Online } from "react-detect-offline";
import './App.css';
import Layout from './Components/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import About from './Components/About/About';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import { ContextCartProvider } from './Context/ContextCart';
import { Toaster, toast } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import DashBoard from './Components/DashBoard/DashBoard';
import SubCategoryProducts from './Components/SubCategoryProducts/SubCategoryProducts';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import VerifiyEmail from './Components/VerifiyEmail/VerifiyEmail';
import Cash from './Components/Cash/Cash';
import Orders from './Components/Orders/Orders';


export default function App() {
  const [userData, setuserData] = useState(null)
  const saveUserData = () => {
    let token = localStorage.getItem("userToken")
    let decodeedTkoen = jwtDecode(token)
    setuserData(decodeedTkoen)
  }

  const routers = createBrowserRouter([{
    path: "", element: <Layout setuserData={setuserData} userData={userData} />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "categorydetails/:category", element: <ProtectedRoute><CategoryDetails /></ProtectedRoute> },
      { path: "subcategoryproducts/:scategory/:subcategory", element: <ProtectedRoute><SubCategoryProducts /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "cash", element: <ProtectedRoute><Cash /></ProtectedRoute> },
      { path: "order", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "about", element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: "login", element: <Login saveUserData={saveUserData} /> },
      { path: "register", element: <Register /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "verifiyemail", element: <VerifiyEmail /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "*", element: <NotFound /> },
    ]
  }])

  return <>
    <ContextCartProvider>
      <Offline><div className='network'>Only shown offline (surprise!)</div></Offline>
      <Toaster />
      <RouterProvider router={routers} ></RouterProvider>

    </ContextCartProvider>
  </>
}

