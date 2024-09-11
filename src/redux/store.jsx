import { configureStore } from '@reduxjs/toolkit'
import appSlices from './slices/appSlices'
import  productSlice from './slices/productSlices'
import basketSlices from './slices/basketSlices'

export const store = configureStore({
  reducer: {
    app: appSlices,
    product:productSlice,
    basket:basketSlices
  },
}) 