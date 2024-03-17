import { useEffect, useState } from "react";
import { SWIGGY_MENU_API_ENDPOINT } from "../constants";
const useRestroMenu = (resId) => {
    const [menuData,setMenuData] = useState([])
 useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const data = await fetch(SWIGGY_MENU_API_ENDPOINT+resId);
        const json = await data.json();
        const menuDetails = json?.data?.cards;
        setMenuData(menuDetails);

    }
        return menuData;


}
export default useRestroMenu;