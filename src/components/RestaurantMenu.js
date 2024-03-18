import React, { useEffect,useState } from 'react'
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import '../css/restaurantMenu.css'
import deliveryLogo from '../images/Delivery_fee_logo.avif'
import nonVegLogo from '../images/Non-Veg-Logo.png'
import downarrow from '../images/Down-Arrow.png'
import uparrow from '../images/Up-Arrow.png'
import { CDN_URL } from '../utils/constants';
import useRestroMenu from '../utils/hooks/useRestroMenu';
import useStatusOnline from '../utils/hooks/useStatusOnline';

export default function RestaurantMenu() {
    const [activeCategory, setActiveCategory] = useState({index:0,isActive:true});
    const {resId} = useParams();
    const menuData = useRestroMenu(resId);
    const onlineStatus = useStatusOnline();

    if (!onlineStatus) {
         return <h1>You're offline</h1>
     }
     if (menuData.length === 0) {
        return <Shimmer />
    }
    console.log(menuData)
    const { name, costForTwoMessage, avgRating, sla, cuisines, city, locality, totalRatingsString, feeDetails, category } = menuData[0]?.card?.card?.info
    const data = menuData[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(item => {
        if (item.card.card.itemCards !== undefined) {
            return item.card.card.itemCards; 
        }
    }).filter(item => item !== undefined)
    const itemCards = data
    console.log(itemCards)
    
    const handelList = (index) => {
        if (index === activeCategory.index) {
       setActiveCategory({index,isActive:!activeCategory.isActive});
        } else {
            
       setActiveCategory({index,isActive:true});
        }
        
    }
  
    
   
  return (
  
    <>
        <div className="main-container">
        <div className="main-container-wrapper">
            <div className="header-container">
                <div className="location">
                    <p>Home </p>
                    <span>/</span>
                    <p> {city} </p>
                    <span>/</span>
                    <p> {name} </p>
                </div>
            </div>
            <div className="header-content-container">
                <div className="header-content-container-wrapper">
                    <div className="header-content">
                        <p className="restro-name">{name}</p>
                        <p className="cuisine">{cuisines.join(', ')}</p>
                        <p className="cuisine">{locality}</p>
                    </div>
                    <div className="header-rating">
                        <p className="rating"><b>* {avgRating}</b></p>
                        <hr/>
                        <p className="rating-count">{totalRatingsString}</p>
                    </div>
                </div>
                <div className="delivery-fee">
                    <img src={deliveryLogo} alt="delivery-logo"/>
                    <p>3 kms | ₹{feeDetails?.fees[0]?.fee/100} Delivery fee will apply</p>
                </div>
                <hr className="doted-hr"/>
                <div className="delivery-time-rate-containor">
                    <div className="time-div">
                        <img src="" alt=""/>
                        <p><b>{sla.minDeliveryTime} - {sla.maxDeliveryTime} MINS</b></p>
                    </div>
                    <div className="cost-div">
                        <img src="" alt=""/>
                        <p><b>{costForTwoMessage}</b></p>
                    </div>
                </div>
                <hr className="doted-hr"/>
            </div>
            {itemCards.map((item,index)=>(<div>
            <div className="menulist-container">
                <button onClick={(e)=>handelList(index)}>
                    <h3>{category} <span>(15)</span></h3>
                    <img src={uparrow} alt="down-pointer-logo" width="20px" height="20px"/>
                </button>
            </div>
            {itemCards[index].map(item=>(
                <div className={`menulist-item-container ${activeCategory.index === index  && activeCategory.isActive ? 'show' : 'hide'}`}>
                <div className="menulist-item-inner-container">
                    <div className="menulist-item-inner-container2">
                        <div>
                            <img src={nonVegLogo} alt="" height="40px" width="40px"/>
                        </div>
                        <p className="item-name"><b>{item?.card?.info?.category}</b></p>
                        <p>₹ <span>{item?.card?.info?.price/100}</span></p>
                        <p>{item?.card?.info?.description}</p>
                    </div>
                    <div className="menulist-item-image">
                        <img src={CDN_URL+item?.card?.info?.imageId} alt="Item-image"/>
                    </div>
                </div>
            </div>
            ))}
            
                <div className="space"></div>
            </div>))}
            
            
        </div>
        
    </div>
    </>
  )
}
