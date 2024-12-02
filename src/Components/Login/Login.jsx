
import styles from './Login.module.css';
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export default function Login({ saveUserData }) {
  let navigate = useNavigate()
  const [errorMessage, seterrorMessage] = useState("")
  const [loading, setloading] = useState(false)
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is Required").email("email is invalid"),
    password: Yup.string().required("Password is Required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must be more powerful"),
  })
  const handleLogin = async (values) => {
    setloading(true)
    let { data } = await axios.post("https://ecom-2suv.onrender.com/api/v1/auth/signin", values).catch((errr) => {
      setloading(false)
      seterrorMessage(`${errr.response.data.message}`)
    });
    if (data.token) {
      localStorage.setItem("userToken", data.token)
      saveUserData()
      setloading(false)
      navigate("/")
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLogin
  })
  return <>
    <div className='w-75 mx-auto py-5'>
      <h3>Login Now : </h3>
      {errorMessage ? <div className=' alert alert-danger'>{errorMessage}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input className=' form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
        {formik.errors.email && formik.touched.email ? <div className=' alert alert-danger'>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password :</label>
        <input className=' form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
        {formik.errors.password && formik.touched.password ? <div className=' alert alert-danger'>{formik.errors.password}</div> : null}
        {loading ? <button type="button" className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> :
          <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white'>Login</button>}
      </form>
      <div className='w-100 d-flex'>
        <Link className='ms-auto' to="/forgotpassword">
          <button className='btn bg-primary text-light p-1 fw-bold'>ForgotPassword</button>
        </Link>
      </div>
    </div>
  </>

}
