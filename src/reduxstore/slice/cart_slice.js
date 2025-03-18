import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload; 
    },

    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find(
        item =>
          item.product_id === product.product_id &&
          item.selected_variation?.variation_id === product.selected_variation?.variation_id
      );

      if (existingProduct) {
        
        existingProduct.quantity += 1;
      } else {
        
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    decreaseQuantity: (state, action) => {
      const { product_id, variation_id } = action.payload;

      const existingProduct = state.cart.find(
        item =>
          item.product_id === product_id &&
          item.selected_variation?.variation_id === variation_id
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Decrease quantity
          existingProduct.quantity -= 1;
        } else {
          // Remove product from cart if quantity becomes 0
          state.cart = state.cart.filter(
            item =>
              !(
                item.product_id === product_id &&
                item.selected_variation?.variation_id === variation_id
              )
          );
        }
      }
    },

    removeFromCart: (state, action) => {
      const { product_id, variation_id } = action.payload;

      // Remove only the specific variation of the product
      state.cart = state.cart.filter(
        item =>
          !(
            item.product_id === product_id &&
            item.selected_variation?.variation_id === variation_id
          )
      );
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart,setCart,emptyCart,  removeFromCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
