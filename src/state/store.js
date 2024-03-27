import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";


const appStore = configureStore({
    reducer: {
        cart:cartSlice
    }
});
export default appStore;