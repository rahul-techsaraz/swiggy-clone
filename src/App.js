import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Header from './components/Header';
import Body from './components/Body';
import { Outlet, RouterProvider,createBrowserRouter } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
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
  return (
    <>
      <Header />
    <Outlet />
    {/* /-> Body */}
      {/* <Body /> */}
      {/* /-> about */}
      {/* <AboutUs /> */}
      {/* /-> contact */}
      {/* <ContactUs /> */}

    </>
  )
}

const router = createBrowserRouter(
    [
        {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
          {
            path: '/',
            element: <Body />,
            
          },
          {
            path: 'about',
            element: <AboutUs />,
            //  children: [
            //   {
            //     path: 'abc',
            //     element:<div>ABC</div>
            //    },
            //    {
            //     path: 'a',
            //     element:<div>A</div>
            //   }
            // ]
    },
      {
            path: '/contact',
            element:<ContactUs />
          },
       {
            path: '/restaurants/:resId',
            element:<RestaurantMenu />
    }
        ]
        
    },
      
    ]
)

//We will create React Dom Node
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
<React.Fragment>
  <RouterProvider router={router} />
</React.Fragment>

);