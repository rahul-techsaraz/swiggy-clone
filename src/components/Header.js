import { LOGO_URL } from "../utils/constants";

export default function Header() {
    return (
        <>
            <div className="header">
                <div className="">
                    <img className="logo" src={LOGO_URL} alt="app logo"/>
                </div>
                <div className="nav-items">
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Services</li>
                        <li>Cart</li>

                    </ul>
                </div>

            </div>
        </>
    )
}