import React, {useState,useEffect,lazy, Suspense, useCallback, useMemo} from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Header from './components/Header';
import Body from './components/Body';
import { Outlet, RouterProvider,createBrowserRouter } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { lazy } from 'react';
//import Grocery from './components/Grocery';
const Grocery = lazy(() => import('./components/Grocery'))
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
  const [count, setCount] = useState(0);
  const [uniqueNum, setuniqueNumber] = useState(0)
  const generateUniqueNumber = useCallback(() => {
    const randNum = Math.random();
    setuniqueNumber(randNum)
  }, [uniqueNum, count])

  const calculateMagicNumber = (count) => {
    console.log('We are doing heavy calculations here')
    let magicNumber = 0;

    for (let i = 0; i < count + 1000000000; i++){
       magicNumber+=i
    }
     return magicNumber;
  }
  const magicNumber = useMemo(() =>calculateMagicNumber(count),[count]);


  return (
    <>
      <h1> { magicNumber}</h1>
      <button onClick={() => setCount(count+1)}> Inc Count</button>
      <Header generateUniqueNumber={ generateUniqueNumber} uniqueNum={uniqueNum} />
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
            path: '/grocery',
            element:<Suspense ><Grocery /></Suspense>
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