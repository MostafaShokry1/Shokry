import React from 'react'
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';


export default function Layout({ userData, setuserData }) {
  return <>
    <div className=" pt-5">
      <Navbar userData={userData} setuserData={setuserData} />
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  </>

}
