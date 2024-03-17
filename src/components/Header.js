import { useState,useEffect } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
//Anchor tag: Page reload
//Link Tag: page not load only url path got update
export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    //console.log('Header Component Render')
    //if we doesn't pass dependency array useffect will call on every render
    //if we pass empty depeendency array  useEffect will call only on initial render
    //if we pass variable inside the dependency array then every time useEffect will call when var changes
    // useEffect(() => {
    //     console.log('useffectRender')
    // },[isLoggedIn])
    return (
        <>
            <div className="header">
                <div className="">
                    <img className="logo" src={LOGO_URL} alt="app logo"/>
                </div>
                <div className="nav-items">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/grocery">Grocery</Link></li>
                        <li><Link to="about">About Us</Link></li>
                        <li><Link to="/contact" >Contacts</Link></li>
                        <li>Cart</li>
                        <li onClick={() => setIsLoggedIn(!isLoggedIn)}>
                         {isLoggedIn ? 'Logout' : 'Login'}
                        </li>

                    </ul>
                </div>

            </div>
        </>
    )
}