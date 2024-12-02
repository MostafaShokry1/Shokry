import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  let params = useParams()
  const [productDetails, setproductDetails] = useState(null)
  const [loading, setloading] = useState(false)
  const getProductsDetails = async (id) => {
    setloading(true)
    const { data } = await axios.get(`https://ecom-2suv.onrender.com/api/v1/products/${id}`)
    setproductDetails(data.product)
    setloading(false)
  }
  useEffect(() => {
    getProductsDetails(params.id)
  }, [])
  return <>

    <div className="row align-items-center justify-content-center py-3">
      {loading ? <div className='text-center my-5'><i className=' fas fa-spinner fa-spin fa-3x text-main'></i></div> : <> <div className='col-md-4'>
        <Slider {...settings}>
      {productDetails?.images?.map((img)=><img key={img.image_id._id} src={img.image_id.path} className='w-100' alt="" />)}

        </Slider>
      </div>
        <div className="col-md-8">
          <h3>{productDetails?.title}</h3>
          <p className="text-muted p-2"> {productDetails?.description}</p>
          <div className="d-flex justify-content-between py-1">

            <span className='text-muted'>{productDetails?.discounted_price}  EGP</span>
            <span>
              <i className='fas fa-star rating-color'></i>
              <span> 4.7</span>
            </span>
          </div>
          <button className='bg-main btn text-white w-100'>+ Add</button>
        </div> </>}
    </div>
  </>

}
