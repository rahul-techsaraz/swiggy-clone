import React, { useEffect,useState } from 'react'
import { SWIGGY_MENU_API_ENDPOINT } from '../utils/constants';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import '../css/restaurantMenu.css'
import deliveryLogo from '../images/Delivery_fee_logo.avif'
import nonVegLogo from '../images/Non-Veg-Logo.png'
import downarrow from '../images/Down-Arrow.png'
import uparrow from '../images/Up-Arrow.png'
import { CDN_URL } from '../utils/constants';

export default function RestaurantMenu() {
    const [menuData, setMenuData] = useState([]);
    const {resId} = useParams();
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const data = await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.8666634&lng=77.5741212&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        const json = await data.json();
        const menuDetails= json?.data?.cards;
        setMenuData(menuDetails);
        //console.log(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    }
     if (menuData.length === 0) {
        return <Shimmer />
    }
    //console.log(menuData)
    const { name, costForTwoMessage, avgRating, sla, cuisines, city, locality, totalRatingsString, feeDetails } = menuData[0]?.card?.card?.info
    console.log(menuData[0]?.card?.card?.info)
    const data = menuData[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(item => {
        if (item.card.card.itemCards !== undefined) {
            return item.card.card.itemCards; 
        }
    }).filter(item => item !== undefined)
    //console.log(data)
    const  itemCards  = data;
    
   const handelList= (e)=>{
    if(e.target.parentElement.childNodes[1].alt === 'down-pointer-logo'){
        // console.log(e.target.parentElement.parentElement.parentElement.getElementsByClassName('hide'))
        // console.log(e.target.parentElement.parentElement.parentElement.getElementsByClassName('hide').length)
        for(let i=0; i<e.target.parentElement.parentElement.parentElement.getElementsByClassName('hide').length; i++){
            e.target.parentElement.parentElement.parentElement.getElementsByClassName('hide')[i].classList.add('show')
            e.target.parentElement.parentElement.parentElement.getElementsByClassName('hide')[i].classList.remove('hide')
        }
        e.target.parentElement.childNodes[1].src = uparrow
        e.target.parentElement.childNodes[1].alt = 'up-pointer-logo'
        
    }else{
        // console.log(e.target.parentElement.parentElement.parentElement.getElementsByClassName('show'))
        // console.log(e.target.parentElement.parentElement.parentElement.getElementsByClassName('show').length)
        for(let i=0; i<e.target.parentElement.parentElement.parentElement.getElementsByClassName('show').length; i++){
            e.target.parentElement.parentElement.parentElement.getElementsByClassName('show')[i].classList.add('hide')
            e.target.parentElement.parentElement.parentElement.getElementsByClassName('show')[i].classList.remove('show')
        }
        e.target.parentElement.childNodes[1].src = downarrow
        e.target.parentElement.childNodes[1].alt = 'down-pointer-logo'
    }
    // console.log(e.target.parentElement.parentElement.parentElement.getElementsByClassName('hide'))
    // const elements = e.target.parentElement.parentElement.parentElement.childNodes
    // console.log(typeof(elements[1].classList.value) )
    // const element = elements.filter((e)=>(e.classList.value.includes('hide')))
    // console.log(element)
   }
    
   
  return (
    //   <div classNameName='menu'>
    //       <h3>{name}</h3>
    //       <h4>{avgRating}</h4>
    //       <h4>{costForTwoMessage}</h4>
    //       <h4>Menu</h4>
    //       <ul>
    //           {itemCards?.map(item => (<li>{item?.card?.info?.name} - RS- { item?.card?.info?.price/100 }</li>))}
             

    //       </ul>

          
    // </div>
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
                    <p>3 kms | ₹{feeDetails.fees[0].fee/100} Delivery fee will apply</p>
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
                <button onClick={(e)=>handelList(e)}>
                    <h3>Recommended <span>(15)</span></h3>
                    <img src={uparrow} alt="down-pointer-logo" width="20px" height="20px"/>
                </button>
            </div>
            {itemCards[index].map(item=>(
                <div className="menulist-item-container hide">
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
