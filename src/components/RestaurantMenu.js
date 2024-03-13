import React, { useEffect,useState } from 'react'
import { SWIGGY_MENU_API_ENDPOINT } from '../utils/constants';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';

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
    const { name, costForTwoMessage, avgRating } = menuData[0]?.card?.card?.info
    const data = menuData[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(item => {
        if (item.card.card.itemCards !== undefined) {
            return item.card.card.itemCards; 
        }
    }).filter(item => item !== undefined)
    const  itemCards  = data[0];
    console.log(data)
   
  return (
      <div className='menu'>
          <h3>{name}</h3>
          <h4>{avgRating}</h4>
          <h4>{costForTwoMessage}</h4>
          <h4>Menu</h4>
          <ul>
              {itemCards?.map(item => (<li>{item?.card?.info?.name} - RS- { item?.card?.info?.price/100 }</li>))}
             

          </ul>

          
    </div>
  )
}
