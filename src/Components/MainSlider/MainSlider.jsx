import React from 'react'
import styles from './MainSlider.module.css';
import Slider from 'react-slick';
import slide1 from '../../finalProject assets/images/slider-image-1.jpeg'
import slide2 from '../../finalProject assets/images/slider-image-2.jpeg'
import slide3 from '../../finalProject assets/images/slider-image-3.jpeg'

export default function MainSlider() {

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return <>
    <div className="row gx-0 py-5">
      <div className="col-md-9">

        <Slider {...settings}>
          <img className='w-100' height={400} src={slide1} alt="" />
          <img className='w-100' height={400} src={slide2} alt="" />
          <img className='w-100' height={400} src={slide3} alt="" />

        </Slider>
      </div>
      <div className="col-md-3">
        <img className='w-100' height={200} src={slide1} alt="" />
        <img className='w-100' height={200} src={slide3} alt="" />

      </div>
    </div>
  </>

}
