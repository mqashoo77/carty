import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from "../../assets/laptop.png"

const Banner = () => {
  return (
    <>
      <div className='header__container'>
        <div className='header__content'>
            <h1>Laptops up to - 20% off </h1>
            <p>The biggest risk is a missed opportunity.</p>
            <button className='btn'><Link to='/shop'>Start Shoping Now</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt="banner image" />
        </div>
        
    </div>
    </>
    
  )
}

export default Banner