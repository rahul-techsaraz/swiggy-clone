import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux is synchronous in nature
 * To achive Async nature in redux , we have to use middleware(Thunk(Promise), Saga(Generator))
 */
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItem: [],
        
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartItem.push(action.payload.item)

        }
        
    }
})

export const {addToCart } = cartSlice.actions;
export default cartSlice.reducer;