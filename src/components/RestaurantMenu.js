import React, { useEffect,useState } from 'react'
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import '../css/restaurantMenu.css'
import deliveryLogo from '../images/Delivery_fee_logo.avif'
import nonVegLogo from '../images/Non-Veg-Logo.png'
import downarrow from '../images/Down-Arrow.png'
import uparrow from '../images/Up-Arrow.png';
import { CDN_URL } from '../utils/constants';
import useRestroMenu from '../utils/hooks/useRestroMenu';
import useStatusOnline from '../utils/hooks/useStatusOnline';
import RestoCategory from './RestoCategory';

export default function RestaurantMenu() {
    const [activeCategory, setActiveCategory] = useState({ index: 0, isActive: true });
    const [activeIndex,setActiveIndex] = useState(0)
    const {resId} = useParams();
    const menuData = useRestroMenu(resId);
    const onlineStatus = useStatusOnline();

    if (!onlineStatus) {
         return <h1>You're offline</h1>
     }
     if (menuData.length === 0) {
        return <Shimmer />
    }
    console.log(menuData[0])
    const {name,  costForTwoMessage, avgRating, sla, cuisines, city, locality, totalRatingsString, feeDetails, category } = menuData[2]?.card?.card?.info
    const data = menuData[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(item => {
        if (item.card.card.itemCards !== undefined) {
            return item.card.card.itemCards; 
        }
    }).filter(item => item !== undefined)
    const itemCards = data
    //console.log(menuData[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    const categoryList = menuData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c?.card?.["card"]?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    console.log(categoryList)
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
                    {/* <p>3 kms | ₹{feeDetails?.fees[0]?.fee/100} Delivery fee will apply</p> */}
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
                  {categoryList.map((category,index) => (
                      <RestoCategory
                          category={category?.card?.card}
                          setActiveIndex={() => setActiveIndex(index)}
                          showMenu={activeIndex === index ? true :false}

                      />
                  ))}
                 
            
            
        </div>
        
    </div>
    </>
  )
}
