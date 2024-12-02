import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Categories() {
  const [loading, setloading] = useState(false)
  const [categories, setcategories] = useState([])
  const getCategories = async () => {
    setloading(true)
    const { data } = await axios.get('https://ecom-2suv.onrender.com/api/v1/categories')
    setloading(false)

    setcategories(data.categories)

  }
  useEffect(() => {
    getCategories()
  }, [])


  return <>
  <div className="row">
  {loading ? <div className='text-center my-5'><i className=' fas fa-spinner fa-spin fa-3x text-main'></i></div>
        : categories.map((category) =>
          <div key={category._id} className='py-4 px-1 col-md-2' >
            <img className='w-100' height="175" src={category.image.path} alt="" />
            <Link to={`/categorydetails/${category.slug}`}>
              {/* <h3 className='h6 text-white bg-main fw-bold text-center py-2 w-50 mx-auto'>{category.strCategory}</h3> */}
              <button className='bg-main btn text-white w-100 py-2 mt-2'>{category.name}</button>
            </Link>
          </div>
        )}
  </div>

  </>

}
