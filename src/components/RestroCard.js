import React from 'react'
import { CDN_URL } from '../utils/constants';

export default function RestroCard(props) {
    const { name, avgRating, sla, cuisines, cloudinaryImageId } = props.resData;
  return (
      <div className='res-card'>
          <img className='res-logo' src={CDN_URL+cloudinaryImageId} alt="res thumbnail" />
          <h1>{ name}</h1>
          <h4>{avgRating} Star</h4>
          <h3>{sla.deliveryTime} Mins</h3>
          <h5>{cuisines.join(" , ")}</h5>
    </div>
  )
}
