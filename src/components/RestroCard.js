import React from 'react'
import { CDN_URL } from '../utils/constants';

export default function RestroCard(props) {
    const { name, avgRating, sla, cuisines, cloudinaryImageId } = props.resData;
  return (
      <div className='w-[240px] m-4 h-[450px] bg-gray-50 hover:bg-gray-200 sm:bg-slate-400 md:bg-gray-900 lg:bg-red-600'>
          <img className='res-logo' src={CDN_URL+cloudinaryImageId} alt="res thumbnail" />
          <h1>{ name}</h1>
          <h4>{avgRating} Star</h4>
          <h3>{sla.deliveryTime} Mins</h3>
          <h5>{cuisines.join(" , ")}</h5>
    </div>
  )
}
