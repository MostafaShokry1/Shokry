import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { contextCart } from '../../Context/ContextCart';
import toast from 'react-hot-toast';
import styles from './Products.module.css';
export default function Products() {
  const [loading, setloading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [hasMorePages, setHasMorePages] = useState(true);
  let { addtoCart, setcountCart, getCart } = useContext(contextCart)
  const addCart = async (id) => {
    const res = await addtoCart(id)
    if (res?.status === 200) {
      toast.success(res.data, { duration: 2000 })
      getCart()
    }
    else
      toast.error("Error :" + res.response.data.message, { duration: 2000 })
    console.log(res);

  }
  const [FeaturedProducts, setFeaturedProducts] = useState([])
  const getProducts = async (currentPage) => {
    setloading(true)
    const { data } = await axios.get(`https://ecom-2suv.onrender.com/api/v1/products?page=${currentPage}`)

    if (data.products.length > 0) {
      setFeaturedProducts(data.products)
      setHasMorePages(true); // More pages available
    } else {
      setHasMorePages(false); // No more pages
    }
    setloading(false)
  }

  useEffect(() => {
    getProducts(currentPage); // Fetch products for the current page
    getCart();
  }, [currentPage]);
  const handleNext = () => {
    if (hasMorePages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };
  return <>
    <div className="row">
      {loading ? <div className='text-center my-5'><i className=' fas fa-spinner fa-spin fa-3x text-main'></i></div> :
        FeaturedProducts.map((product) => <div className='col-md-2 ' key={product.id}>
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
        </div>)}
    </div>
    <div className="d-flex justify-content-between my-3 pb-5">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="btn btn-secondary"
      >
        Previous
      </button>
      <span className='text-main fw-bold'>Page {hasMorePages?currentPage:currentPage-1}</span>
      <button
        onClick={handleNext}
        disabled={!hasMorePages}
        className="btn btn-secondary"
      >
        Next
      </button>
    </div>
  </>

}
