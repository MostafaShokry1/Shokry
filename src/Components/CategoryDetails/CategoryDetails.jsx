import React, { useEffect, useState } from 'react'
import styles from './CategoryDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import photo from "../../finalProject assets/categories.png"
import axios from 'axios';
export default function CategoryDetails() {
  let params = useParams()
  const [categoryDetails, setcategoryDetails] = useState([])
  const [loading, setloading] = useState(false)
  const getCategorysDetails = async (category) => {
    setloading(true)
    const { data } = await axios.get(`https://ecom-2suv.onrender.com/api/v1/categories/${category}/subcategories`)
    setcategoryDetails(data.subcategories)
    setloading(false)
  }
  useEffect(() => {
    getCategorysDetails(params.category)
  }, [])
  console.log(params.category);

  return <>
    <div className="row">
      {loading ? <div className='text-center my-5'><i className=' fas fa-spinner fa-spin fa-3x text-main'></i></div> :
        categoryDetails.map((category) => <div className='col-md-2 pt-2' key={category._id}>
          <Link to={`/subcategoryproducts/${params.category}/${category.slug}`}>
            <div className='product px-2 py-3 cursor-pointer shadow-lg rounded-2'>
              <img className='w-100 py-2' height="200" src={photo} alt="" />
              <h3 className='text-main h6 fw-bolder'>{category.name.split(" ").slice(0, 2).join(" ")}</h3>
            </div>
          </Link>
        </div>)}
    </div>
  </>

}
