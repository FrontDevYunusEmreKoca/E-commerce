import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    products:[],
    selectedProduct : {},
    loading: false
}
const baseUrl  = "https://fakestoreapi.com"

export const getAllProducts = createAsyncThunk("getAllProduct", async()=>{
   const response = await axios
    .get(`${baseUrl}/products`)
    return response.data;
})

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{

    },
    extraReducers : (builder) => {
        //serverdan bekleme asamasi
        builder.addCase(getAllProducts.pending,(state)=>{
            state.loading=true
        } )
        //serverdan urunler geldi
        builder.addCase(getAllProducts.fulfilled, (state,action)=>{
            state.loading=false;
            state.products=action.payload // products initialState
        })
    }
})

// Action creators are generated for each case reducer function
export const {  } = productSlice.actions

export default productSlice.reducer