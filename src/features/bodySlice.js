import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBodyData = createAsyncThunk("body/fetchBodyData", async ({ url }, thunkApi) => {
    try {
        const data = await fetch(url);
        const json = await data.json();
        return json;
    }
    catch(err) {
        console.log(err)
    }

})

const bodySlice = createSlice({
    name: 'body',
    initialState: {
        resData: [],
        filteredDatas: [],
        apiResp: true,
        isLoading: false,
        errorMessage: "Something Went Wrong",
        isError:false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBodyData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchBodyData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.resData = action.payload.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            state.filteredDatas = action.payload.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        })
         builder.addCase(fetchBodyData.rejected, (state, action) => {
            state.isLoading = false;
           state.isError=true

   })
    }
   
})

export default bodySlice.reducer;