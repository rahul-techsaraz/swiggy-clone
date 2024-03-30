import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";
import bodySlice from "../features/bodySlice";


const appStore = configureStore({
    reducer: {
        cart: cartSlice,
        body:bodySlice
    }
});
export default appStore;