import React, { useEffect, useState } from 'react'
import RestroCard from './RestroCard';
import { resList } from '../utils/mockData';

export default function Body() {
  //Special State Variable

  const [resData, setResData] = useState(resList);
  const [count,setCount] = useState(0)
  const [searchString, setSearchString] = useState('');

  //Normal JS Variable
  // const normalJSVariable = resList;
  const handleFilter = () => {
    const filteredData = resData.filter(data => data.info.avgRating > 4.5);
    setResData(filteredData)
  }
  const clearFilter = () => {
    setResData(resList)
  }
  const handleSearch = (filterValue) => {
    console.log(count)
    const filteredData = resList.filter(data =>  data.info.name.includes(filterValue));
    setResData(filteredData);
    setCount(count+1)
  }
  useEffect(() => {
handleSearch(searchString)
  },[searchString])
  return (
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
  )
}
