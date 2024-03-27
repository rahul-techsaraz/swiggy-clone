import React, { useEffect, useState } from 'react'
import RestroCard from './RestroCard';
import { SWIGGY_API_ENDPOINT } from '../utils/constants';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';

//Chunking
//Lazy Loading
//Dynamic Loading
/**
 * Redux Architecture
 * 
 * store:Keep our central state
 * Actions=>
 * Dispatch
 * Reducer
 * Subscribe
 * 
 * npm i react-redux, @reduxjs/toolkit
 * Create the store and configure with slice
 * Pass this store to Main Component
 * Create Slice
 * To get redux state data, call useSelector hooks
 * to Dispatch the action call the useDispatch
 * 
 * TODO
 * 1. Prevent to add duplicate products into the cart
 * 2. Create one Cart Component and display the basic card details with custom product quantity
 * 3. Remove the item from cart
 * 4. clear cart item
 * 5. if cart item is empty display , cart is empty , add one button to redirect on home page 
 * 6. Fixed the card menu api dynamic key issue for swiggy api
 * 
 * @param {*} Component 
 * @returns 
 */
 const withPrometedRestCard = (Component) => {
console.log(Component)
   return (props) => {
    console.log(props)
    return (
      <>
      <span className='absolute m-3  p-4 bg-orange-400'>Top Rated</span>
      <Component {...props} />
      </>
    )
  }

}
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
  const WithPromotedComponent = withPrometedRestCard(RestroCard);
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
console.log(resData)
  },[filteredDatas])

  //Conditional rendering

  // if (resData.length === 0) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      {apiResp === true ?

      resData.length === 0 ? (<Shimmer />) : (
      <div className='p-4 m-4'>
      <div className=' flex m-4 gap-4'>
        <button className='bg-slate-100 rounded-lg border-slate-400 w-[150px] h-10 p-4 items-center '  onClick={() => handleFilter()}>Top Rated</button>
        <button className='bg-slate-100 rounded-lg border-slate-400 w-[150px] h-10 p-4 items-center ' onClick={() => clearFilter()}>Clear Filter</button>
          <input className='border-blue-solid shadow-md rounded-lg' type='text' value={searchString} placeholder='search by restro name' onChange={(e) => setSearchString(e.target.value)} />

          </div>
          <div className='flex flex-wrap'>
              {filteredDatas.length === 0 ? <div>No Records Found for your search</div> : 
              filteredDatas.map((data,index) => (
                <Link to={"/restaurants/" + data?.info.id} key={data?.info.id}>
                  {data.info.avgRating > 4.1 ? <WithPromotedComponent resData={data?.info} key={data?.info.id} />  :<RestroCard resData={data?.info} key={data?.info.id} />}
                </Link>
                  
              ))}
             

          </div>
          
    </div>
    ):
    <div><h1>Something went wrong...</h1><h3>work under process. we will be back soon</h3></div>}
    </>
    
    
  )
}
//HOC=> COmponent that recived the a another component as parameter or can return a compoenent

