import React, { useContext } from 'react'
import styles from './Navbar.module.css';
import logo from "../../finalProject assets/mylogo (1).svg"
import { Link, useNavigate } from 'react-router-dom';
import { contextCart } from '../../Context/ContextCart';
export default function Navbar({ userData, setuserData }) {
  let { countCart } = useContext(contextCart)
  let navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('userToken')
    setuserData(null)
    navigate("/login")
  }
  return <> <nav
    className="navbar fixed-top navbar-expand-sm navbar-light bg-light"
  >
    <div className="container">
      <a className="navbar-brand" to="/">
        <img height={50}  src={logo} alt="" />
      </a>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">

        {localStorage.getItem("userToken") ?
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="order">Orders</Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link px-2" to="cart">
                <i className='fas fa-shopping-cart fa-2xl'></i>
                <span className='badge position-absolute top-0 end-0 bg-main text-white'>{countCart}</span>
              </Link>
            </li>
          </ul>
          : null}

        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

          <li className="nav-item d-flex align-items-center">
            <i className='fab mx-2  fa-facebook'></i>
            <i className='fab mx-2  fa-twitter'></i>
            <i className='fab mx-2  fa-instagram'></i>
            <i className='fab mx-2  fa-tiktok'></i>
            <i className='fab mx-2  fa-linkedin'></i>
            <i className='fab mx-2  fa-youtube'></i>
          </li>
          {localStorage.getItem("userToken") ? <><li className="nav-item" onClick={handleLogout}>
            <Link className="nav-link" >Logout</Link>
          </li></> : <> <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
          </li>
            <li className="nav-item">
              <Link className="nav-link" to="register">Register</Link>
            </li></>}

        </ul>
      </div>
    </div>
  </nav>
  </>
}
