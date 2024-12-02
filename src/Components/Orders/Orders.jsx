import React, { useContext, useEffect, useState } from 'react'
import styles from './Orders.module.css';
import axios from 'axios';
import { contextCart } from '../../Context/ContextCart';
import toast from 'react-hot-toast';
export default function Orders() {
  const [loading, setloading] = useState(false)
  const [orderDetails, setorderDetails] = useState([])
  const { getUserLoggedOrder } = useContext(contextCart)
  async function getOrder() {
    setloading(true)
    const res = await getUserLoggedOrder()
    setloading(false)
    if (res?.status === 200) {
      console.log(res);
      setorderDetails(res.data.orders)
    }
    else {
      toast.error(res.response.data.message)
    }
  }
  useEffect(() => {
    getOrder();
  }, [])

  return <>
    {!loading ? <div className="bg-main-light p-4 my-5">
      <h3 className='text-center fw-bold text-main'>My Orders :</h3>
      {orderDetails.map((product) => <div key={product._id} className='row border-3 border-bottom py-3 my-2 align-items-center '>
        <div className="col-md-3">
          <h6>Address : <span className='fw-bold'>{product.address}</span></h6>
          <h6>PhoneNumber :<span className='fw-bold'>{product.phone_Number}</span></h6>
          <h6>Payment Type :<span className='fw-bold'>{product.payment_type}</span></h6>
          <h6>is Paid :<span className='fw-bold'>{product.is_paid?"yes":"No"}</span> </h6>
          <h6>Total Price :<span className='fw-bold'>{product.total_discounted_price}</span></h6>
        </div>
        <div className=' col-md-9 d-flex justify-content-between'>
          <div className='row w-100'>
          {
            product.products.map((prod)=><div key={prod.id} className='col-md-3 pt-2'>
              <div className='px-2 py-3 shadow-lg rounded-2'>
                <h6 className='text-center fw-bold'>{prod.product.title}</h6>
                <h6>Price :{prod.product.discounted_price}</h6>
                <h6>quantity : {prod.quantity}</h6>
              </div>
            </div>)
          }
          </div>

        </div>
      </div>)}
    </div>
      : <div className='text-center my-5'><i className=' fas fa-spinner fa-spin fa-3x text-main'></i></div>}
  </>

}
