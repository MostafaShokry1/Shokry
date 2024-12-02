import React, { useContext, useEffect, useState } from 'react'
import styles from './SubCategoryProducts.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { contextCart } from '../../Context/ContextCart';
import toast from 'react-hot-toast';

export default function SubCategoryProducts() {
  const{addtoCart, getCart}= useContext(contextCart)
  let params = useParams()
  const [subCategoryProducts, setsubCategoryProducts] = useState([])
  const [subcategory, setsubcategory] = useState({})
  const [loading, setloading] = useState(false)
  const addCart = async (id) => {
    const res = await addtoCart(id)
    if (res?.status === 200){
      toast.success(res.data, { duration: 2000 })
      getCart()
    }
    else
      toast.error("Error :" + res.response.data.message, { duration: 2000 })
    console.log(res);

  }
  const getCategorysDetails = async (category,subcategory) => {
    setloading(true)
    const { data } = await axios.get(`https://ecom-2suv.onrender.com/api/v1/categories/${category}/subcategories/${subcategory}`)
    setsubcategory(data?.subcategory)
    setsubCategoryProducts(data?.products)
    setloading(false)
  }
  useEffect(() => {
    getCategorysDetails(params.scategory,params.subcategory)
  }, [])

  return <>
    <div className="row">
      {loading ? <div className='text-center my-5'><i className=' fas fa-spinner fa-spin fa-3x text-main'></i></div> :<>
        <div className="d-flex justify-content-center align-items-center bg-main text-white p-4 rounded my-3 shadow-lg">
        <h2>{subcategory?.name}</h2>
      </div>
   {subCategoryProducts.map((product) => <div className='col-md-2 ' key={product.id}>
    <div className='product px-2 py-3 cursor-pointer'>
      <Link to={`/productdetails/${product.slug}`} className="text-decoration-none">
        <img className='w-100 py-2' height="230" src={product.cover_image.path} alt="" />
        <span className='text-main fw-bold font-sm'>{product.category}</span>
        <h3 className='h6 fw-bolder'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
        <div className='d-flex justify-content-between'>
          <span className='text-muted'>{product.discounted_price}  EGP</span>
          <span>
            <i className='fas fa-star rating-color'></i>
            <span> 5</span>
          </span>

        </div>
      </Link>
      <button onClick={() => addCart(product.id)} className='bg-main btn text-white w-100'>+ Add</button>
    </div>
  </div>)}</>}
    </div>
  </>

}
