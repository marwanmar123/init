import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalPrice: 0,
    totalItems: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProd: (state, action) => {
            const { product, quantity, price } = action.payload; // Include price
            const existingItemIndex = state.items.findIndex(item => item.product._id === product._id);
            if (existingItemIndex !== -1) {
                state.items[existingItemIndex].quantity += quantity;
            } else {
                state.items.push({ product, quantity, price }); // Include price
            }
            state.totalPrice += price * quantity; // Calculate price based on quantity
            state.totalItems += quantity;
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item.product._id === productId);
            if (item) {
                const prevQuantity = item.quantity;
                const diff = quantity - prevQuantity;
                item.quantity = quantity;
                state.totalPrice += diff * item.price; // Adjust total price based on price and quantity
                state.totalItems += diff;
            }
        },
        removeItem: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.product._id === productId);
            if (itemIndex !== -1) {
                state.totalPrice -= state.items[itemIndex].price * quantity; // Adjust total price
                state.items.splice(itemIndex, 1);
                state.totalItems -= quantity;
            }
        },
        clearCart: state => {
            state.items = [];
            state.totalPrice = 0;
            state.totalItems = 0;
        },
        updateCartCount: (state) => {
            state.totalItems = state.items.length;
        },
    },
});
export const { addProd, updateCartCount, updateQuantity, removeItem, clearCart } = cartSlice.actions;

// Memoized selector for calculating total price
export const selectTotalPrice = createSelector(
    state => state.cart.items,
    items => items.reduce((total, item) => total + item.quantity * item.product.price, 0)
);

export const selectItems = state => state.cart.items;
export const selectCartCount = state => state.cart.totalItems;

export default cartSlice.reducer;
