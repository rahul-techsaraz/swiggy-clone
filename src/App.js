import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css'
import Header from './components/Header';
import Body from './components/Body';
/**
 * -Header
 *  -Logo
 *  -Nav List
 * -Body
 *  -Search
 *  -Restro Card
 * -Footer
 * @returns 
 */

const AppLayout = () => {
  console.log(<Body />)
  return (
    <>
      <Header />
      <Body />
    </>
  )
}



//We will create React Dom Node
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
<React.Fragment>
   <AppLayout />
</React.Fragment>

);