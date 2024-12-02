import React, { useContext, useEffect, useState } from 'react'
import styles from './VerifiyEmail.module.css';
import { contextCart } from '../../Context/ContextCart';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function VerifiyEmail() {
  const navigate = useNavigate()
  const [isVerified, setIsVerified] = useState(false);

  const { emailToken } = useContext(contextCart)
  const checkEmailVerification = async () => {
    const { data } = await axios.get(`https://ecom-2suv.onrender.com/api/v1/auth/verifiy/${emailToken}`).catch((err) => {
      toast.error(err.response.data.message)
    })
    console.log(data?.isVerifiy);

    if (data?.isVerifiy == true) {
      setIsVerified(data.isVerifiy)
      console.log(data.isVerifiy);
      clearInterval(interval)
      navigate("/login")
    }
  }
  const interval = setInterval(() => {
    checkEmailVerification();
  }, 5000);
  return <>
    <div className='w-75 mx-auto py-5 text-center bg-light'>
      <h3 className='fw-bold'>Please Go to Your Gmail and Verifiy Email ... </h3>
      <div className='py-5'>
        <h4>Waiting For Verifiying Your Email</h4>
        <div className='text-center my-5'><i className=' fas fa-spinner fa-spin fa-3x text-main'></i></div>
      </div>
    </div>
  </>

}
