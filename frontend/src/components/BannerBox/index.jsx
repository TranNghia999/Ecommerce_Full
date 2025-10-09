import React from 'react'
import { Link } from 'react-router-dom'

const BannerBox = (props) => {
  return (
    <div className='box bannerBox overflow-hidden rounded-lg group'>
        <Link to="/">
          <img className='w-full transition-all group-hover:scale-105 group-hover:rotate-1'
          src={props.image}  alt='banner'/>
        </Link>
    </div>
    
  )
}

export default BannerBox
