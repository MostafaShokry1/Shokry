import React, { useContext, useState } from 'react'
import styles from './Cash.module.css';
import { contextCart } from '../../Context/ContextCart';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Cash() {
  const [loading, setloading] = useState(false)

  let navigate = useNavigate()
  let { offlinePayment } = useContext(contextCart)
  const handleSubmit = async (values) => {
    setloading(true)
    const res = await offlinePayment(values)
    setloading(false)
    if (res?.status === 200) {
      console.log(res);
      toast.success("Order Success")
      navigate("/order")
    }
    else {
      toast.error(res.response.data.message.split(" ").slice(0, 10).join(" "))
    }
  }
  let formik = useFormik({
    initialValues: {
      address: "",
      phone_Number: "",
    },
    onSubmit: handleSubmit
  })
  return <>
    <div className="w-50 mx-auto py-5">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="address">Address :</label>
        <input onChange={formik.handleChange}
          value={formik.values.address} className='form-control' type="text" id='address' name='address' />
        <label htmlFor="phone_Number">Phone :</label>
        <input onChange={formik.handleChange}
          value={formik.values.phone_Number} className='form-control' type="tel" id='phone_Number' name='phone_Number' />
        {loading ? <button type="button" className='btn bg-main text-white mt-4 w-100 text-center'><i className='fas fa-spinner fa-spin'></i></button>
          : <button className='btn w-100 border-main bg-main text-white mt-4' type="submit">Order Now</button>}
      </form>
    </div>
  </>


}
