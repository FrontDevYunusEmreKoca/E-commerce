import { createSlice } from '@reduxjs/toolkit';

const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const initialState = {
  products: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

const writeFromBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const basketSlices = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find(p => p.id === product.id);
      
      if (existingProduct) {
        existingProduct.count += product.count; // Miktarı ekleyin
      } else {
        state.products.push({ ...product });
      }
      
      writeFromBasketToStorage(state.products);
    },
    removeFromBasket: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      writeFromBasketToStorage(state.products);
    },
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
    calculateAmountBasket: (state) => {
      state.totalAmount = state.products.reduce((total, product) => total + product.price * (product.count || 1), 0);
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, setDrawer, calculateAmountBasket } = basketSlices.actions;

export default basketSlices.reducer;
