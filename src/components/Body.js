import React, { useEffect, useState } from 'react'
import RestroCard from './RestroCard';
import { SWIGGY_API_ENDPOINT } from '../utils/constants';
import Shimmer from './Shimmer';

export default function Body() {
  //Special State Variable

  const [resData, setResData] = useState([]);
  const [count,setCount] = useState(0)
  let [searchString, setSearchString] = useState('');
  const fetchData = async () => {
    const res = await fetch(SWIGGY_API_ENDPOINT);
    const json = await res.json();
    const restroList = await json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setResData(restroList)
    //;
//card.card.gridElements.infoWithStyle.restaurants
}
  //Normal JS Variable
  // const normalJSVariable = resList;
  const handleFilter = () => {
    const filteredData = resData.filter(data => data.info.avgRating > 4.5);
    setResData(filteredData)
  }
  const clearFilter = () => {
    setResData([])
  }
  const handleSearch = (filterValue) => {
    console.log(count)
    const filteredData = [].filter(data =>  data.info.name.includes(filterValue));
    setResData(filteredData);
    setCount(count+1)
  }
  useEffect(() => {
    setInterval(fetchData(),6000)
  },[])
  useEffect(() => {
    handleSearch(searchString);
  }, [searchString])

  //Conditional rendering

  // if (resData.length === 0) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      {

      resData.length === 0 ? (<Shimmer />) : (
      <div className='body'>
      <div className='search'>
        <button style={{marginRight:"10px"}} onClick={() => handleFilter()}>Top Rated</button>
        <button onClick={() => clearFilter()}>Clear Filter</button>
          <input type='text'style={{marginLeft:"10px"}} value={searchString} placeholder='search by restro name' onChange={(e) => setSearchString(e.target.value)} />

          </div>
          <div className='res-container'>
              {resData.map((data,index) => (
              <RestroCard  resData={data?.info} key={data?.info.id}   />
                  
              ))}
             

          </div>
          
    </div>
    ) }
    </>
    
    
  )
}
