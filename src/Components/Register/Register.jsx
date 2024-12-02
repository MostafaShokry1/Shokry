import styles from './Register.module.css';
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { contextCart } from '../../Context/ContextCart';

export default function Register() {
  const { setEmailToken } = useContext(contextCart)
  let navigate = useNavigate()
  const [errorMessage, seterrorMessage] = useState("")
  const [loading, setloading] = useState(false)
  let validationSchema = Yup.object({
    name: Yup.string().required("Name is Required").min(3, "min Length is 3").max(10, "max Length is 10"),
    email: Yup.string().required("Email is Required").email("email is invalid"),
    password: Yup.string().required("Password is Required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "password must be more powerful"),
    rePassword: Yup.string().required("rePassword is Required").oneOf([Yup.ref("password")], "password doesn't Match"),
    phone: Yup.string().required("phone is Required").matches(/^01[0125][0-9]{8}$/, "Phone must be Valid Number")
  })
  const handleRegister = async (values) => {
    setloading(true)
    let { data } = await axios.post("https://ecom-2suv.onrender.com/api/v1/auth/signup", {
      name: values.name,
      email: values.email,
      password: values.password
    }).catch((errr) => {
      setloading(false)
      seterrorMessage(`${errr.response.data.message}`)
    });
    if (data.message === "Signed up successfully") {
      setEmailToken(data.tokenToCheackVerifiy)
      setloading(false)
      navigate("/verifiyemail")
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: handleRegister
  })
  return <>
    <div className='w-75 mx-auto py-5'>
      <h3>Register Now : </h3>
      {errorMessage ? <div className=' alert alert-danger'>{errorMessage}</div> : null}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input className=' form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" />
        {formik.errors.name && formik.touched.name ? <div className=' alert alert-danger'>{formik.errors.name}</div> : null}
        <label htmlFor="email">Email :</label>
        <input className=' form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
        {formik.errors.email && formik.touched.email ? <div className=' alert alert-danger'>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password :</label>
        <input className=' form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
        {formik.errors.password && formik.touched.password ? <div className=' alert alert-danger'>{formik.errors.password}</div> : null}

        <label htmlFor="rePassword">RePassword :</label>
        <input className=' form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className=' alert alert-danger'>{formik.errors.rePassword}</div> : null}

        <label htmlFor="phone">Phone :</label>
        <input className=' form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" />
        {formik.errors.phone && formik.touched.phone ? <div className=' alert alert-danger'>{formik.errors.phone}</div> : null}
        {loading ? <button type="button" className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> :
          <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white'>Register</button>}

      </form>
    </div>
  </>

}
