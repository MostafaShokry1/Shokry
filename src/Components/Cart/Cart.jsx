import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { contextCart } from '../../Context/ContextCart';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null)
  const { getUserLoggedCart, removeItem, updateItem,setcountCart } = useContext(contextCart)
  async function getCart() {
    const res = await getUserLoggedCart()
    if (res?.status === 200) {
      console.log(res);
      setcartDetails(res.data.cart)
      setcountCart(res.data?.cart?.products?.reduce((sum, product) => sum + product.quantity, 0))
    }
  }
  async function deleteItem(id) {
    const res = await removeItem(id)
    if (res?.status === 200) {
      console.log(res);
      toast.success("Removed successfully")
      getCart()
    }
  }
  async function updateProductItem(id, count) {
    const res = await updateItem(id, count)
    if (res?.status === 200) {
      console.log(res);
      toast.success("updated Count successfully")
      getCart()
    }
  }
  useEffect(() => {
    getCart();
  }, [])
  return <>
    <Helmet>

      <title>Cart Details</title>

    </Helmet>
    {cartDetails ? <div className="bg-main-light p-4 my-5">
      <h3>Shop Cart:</h3>
      <h6 className='text-main'>Total Price : {cartDetails?.total_price} EGP</h6>
      {cartDetails.products.map((product) => <div key={product.product_id._id} className='row border-bottom py-2 my-2 align-items-center '>
        <div className="col-md-1">
          <img src={product.product_id.cover_image.path} className='w-100' height={120} alt="" />
        </div>
        <div className=' col-md-11 d-flex justify-content-between'>
          <div>
            <h4>{product.product_id.title}</h4>
            <h5 className='text-main'>Price:  {product.product_id.price} EGP</h5>
            <button onClick={() => deleteItem(product.product_id._id)} className='p-0 m-0 btn' > <i className='fa-solid text-main fa-trash-can'></i> Remove</button>
          </div>
          <div>
            <button onClick={() => updateProductItem(product.product_id._id, 1)} className='btn border-main btn-sm '>+</button>
            <span className='mx-3'>{product.quantity}</span>
            <button onClick={() => updateProductItem(product.product_id._id, -1)} className='btn border-main btn-sm '>-</button>
          </div>
        </div>
      </div>)}
      <div className='d-flex justify-content-between px-3'>
        <button className='btn bg-main'>
          <Link className="text-white" to={"/checkout"}>CheckOut :Online</Link>
        </button>
        <button className='btn bg-main'>
          <Link className="text-white" to={"/cash"}>CheckOut :Offline</Link>
        </button>
      </div>
    </div>
      : <div className='text-center my-5'><i className=' fas fa-spinner fa-spin fa-3x text-main'></i></div>}

  </>

}
