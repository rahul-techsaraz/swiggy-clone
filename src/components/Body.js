import React, { useEffect, useState } from 'react'
import RestroCard from './RestroCard';
import { SWIGGY_API_ENDPOINT } from '../utils/constants';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';

//Chunking
//Lazy Loading
//Dynamic Loading

export default function Body() {
  //Special State Variable

  const [resData, setResData] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([])
  const [apiResp, setApiResp] = useState(true)
  //const [count,setCount] = useState(0)
  let [searchString, setSearchString] = useState('');
  const fetchData = async () => {
    const res = await fetch(SWIGGY_API_ENDPOINT);
    setApiResp(res.ok)
    const json = await res.json();
    //console.log(json)
    const restroList = await json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setResData(restroList)
    setFilteredDatas(restroList)
    
}
//console.log(filteredDatas)
  //Normal JS Variable
  // const normalJSVariable = resList;
  const handleFilter = () => {
    const filteredData = resData.filter(data => data.info.avgRating > 4.5);
    //console.log(filteredData)
    setFilteredDatas(filteredData)
  }
  const clearFilter = () => {
    setFilteredDatas(resData)
  }
  const handleSearch = (filterValue) => {
    //console.log(count)
    const filteredData = resData.filter(data =>  data.info.name.toUpperCase().includes(filterValue));
    //console.log(filteredData)
    setFilteredDatas(filteredData);
    //setCount(count+1)
  }
  useEffect(() => {
    // setInterval(fetchData(),6000)
    fetchData()
    
  },[])
  useEffect(() => {
    handleSearch(searchString.toUpperCase());
  }, [searchString])
  useEffect(()=>{

  },[filteredDatas])

  //Conditional rendering

  // if (resData.length === 0) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      {apiResp === true ?

      resData.length === 0 ? (<Shimmer />) : (
      <div className='body'>
      <div className='search'>
        <button style={{marginRight:"10px"}} onClick={() => handleFilter()}>Top Rated</button>
        <button onClick={() => clearFilter()}>Clear Filter</button>
          <input type='text'style={{marginLeft:"10px"}} value={searchString} placeholder='search by restro name' onChange={(e) => setSearchString(e.target.value)} />

          </div>
          <div className='res-container'>
              {filteredDatas.length === 0 ? <div>No Records Found for your search</div> : 
              filteredDatas.map((data,index) => (
              <Link to={"/restaurants/"+data?.info.id}><RestroCard  resData={data?.info} key={data?.info.id}   /></Link>
                  
              ))}
             

          </div>
          
    </div>
    ):
    <div><h1>Something went wrong...</h1><h3>work under process. we will be back soon</h3></div>}
    </>
    
    
  )
}
