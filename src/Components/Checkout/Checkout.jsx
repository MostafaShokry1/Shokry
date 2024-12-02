import React, { useContext, useState } from 'react'
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { contextCart } from '../../Context/ContextCart';
export default function Checkout() {
  const [loading, setloading] = useState(false)

  let { onlinePayment } = useContext(contextCart)
  const handleSubmit = async (values) => {
    setloading(true)
    const res = await onlinePayment(values)
    setloading(false)

    if (res?.status === 200) {
      console.log(res);
      window.location.href = res.data.session.url
    }
  }
  let formik = useFormik({
    initialValues: {
      address: "",
      phone: "",
      details: ""
    },
    onSubmit: handleSubmit
  })
  return <>
    <div className="w-50 mx-auto py-5">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="address">Address :</label>
        <input onChange={formik.handleChange}
          value={formik.values.address} className='form-control' type="text" id='address' name='address' />
        <label htmlFor="phone">Phone :</label>
        <input onChange={formik.handleChange}
          value={formik.values.phone} className='form-control' type="tel" id='phone' name='phone' />
        <label htmlFor="details">Details :</label>
        <input onChange={formik.handleChange}
          value={formik.values.details} className='form-control' type="text" id='details' name='details' />
        {loading ? <button type="button" className='btn bg-main text-white mt-4 w-100 text-center'><i className='fas fa-spinner fa-spin'></i></button>
          : <button className='btn w-100 border-main bg-main text-white mt-4' type="submit"> Pay</button>}
      </form>
    </div>
  </>

}
