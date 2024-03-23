import { useState,useEffect,memo } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
//Anchor tag: Page reload
//Link Tag: page not load only url path got update
 function Header({generateUniqueNumber,uniqueNum}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log('Header Render')
    //console.log('Header Component Render')
    //if we doesn't pass dependency array useffect will call on every render
    //if we pass empty depeendency array  useEffect will call only on initial render
    //if we pass variable inside the dependency array then every time useEffect will call when var changes
    // useEffect(() => {
    //     console.log('useffectRender')
    // },[isLoggedIn])
    return (
        <>
            {/* <h1>{uniqueNum}</h1>
            <button onClick = {() =>  generateUniqueNumber()}>generateUniqueNumber</button> */}
            <div className="flex justify-between bg-pink-100 items-center">
                <div className="">
                    <img className="h-20 w-66" src={LOGO_URL} alt="app logo"/>
                </div>
                <div className="">
                    <ul className="flex p-4 m-4 flex-wrap items-center">
                        <li className="p-4"><Link to="/">Home</Link></li>
                        <li className="p-4"><Link to="/grocery">Grocery</Link></li>
                        <li className="p-4"><Link to="about">About Us</Link></li>
                        <li className="p-4"><Link to="/contact" >Contacts</Link></li>
                        <li className="p-4">Cart</li>
                        <li onClick={() => setIsLoggedIn(!isLoggedIn)}>
                         {isLoggedIn ? 'Logout' : 'Login'}
                        </li>

                    </ul>
                </div>

            </div>
        </>
    )
}
export default memo(Header);