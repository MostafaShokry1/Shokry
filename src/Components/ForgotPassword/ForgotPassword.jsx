import React, { useState } from 'react'
import styles from './ForgotPassword.module.css';
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function ForgotPassword() {
  let navigate = useNavigate()
  const [errorMessage, seterrorMessage] = useState("")
  const [loading, setloading] = useState(false)
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is Required").email("email is invalid"),
  })
  const handleLogin = async (values) => {
    setloading(true)
    let { data } = await axios.post("https://ecom-2suv.onrender.com/api/v1/auth/forgotpassword", values).catch((errr) => {
      setloading(false)
      seterrorMessage(`${errr.response.data.message}`)
    });
      if (data.message === "Reset password link has been sent to your email") {
        setloading(false)
        toast.success(data.message)
        navigate("/login")
      }
  }

  let formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema,
    onSubmit: handleLogin
  })
  return <>
    <div className='w-75 mx-auto py-5'>
      <h3>Forgot Password : </h3>
      {errorMessage ? <div className=' alert alert-danger'>{errorMessage}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input className=' form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
        {formik.errors.email && formik.touched.email ? <div className=' alert alert-danger'>{formik.errors.email}</div> : null}


        {loading ? <button type="button" className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> :
          <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white'>Forgot Password</button>}
      </form>
    </div>
  </>

}



