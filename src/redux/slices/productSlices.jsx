import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    products:[],
    selectedProduct : {},
    loading: false
}
const baseUrl  = "https://fakestoreapi.com"

export const getAllProducts = createAsyncThunk("getAllProduct", async()=>{
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniyelik gecikme
   const response = await axios
    .get(`${baseUrl}/products`)
    return response.data;
})

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setSelectedProduct: (state,action) =>{
            state.selectedProduct = action.payload
        }
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
export const {setSelectedProduct  } = productSlice.actions

export default productSlice.reducer