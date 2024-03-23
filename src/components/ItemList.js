import React from 'react'
import nonVegLogo from '../images/Non-Veg-Logo.png'
import { CDN_URL } from '../utils/constants';

export default function ItemList({ data }) {
    console.log(data)
    
    return (
        <>
              {
            data.map(items => (
           <div className={`menulist-item-container`}>
                <div className="menulist-item-inner-container">
                    <div className="menulist-item-inner-container2">
                        <div>
                            <img src={nonVegLogo} alt="" height="40px" width="40px"/>
                        </div>
                        <p className="item-name"><b>{items?.card?.info?.category}</b></p>
                        <p>₹ <span>{items?.card?.info?.price ? items?.card?.info?.price/100 : items?.card?.info?.defaultPrice/100}</span></p>
                        <p>{items?.info?.description}</p>
                    </div>
                    <div className="menulist-item-image">
                        <img src={CDN_URL+items?.card?.info?.imageId} alt="Item-image"/>
                    </div>
                </div>
            </div>
      ))}
        </>
      
   
  )
}
