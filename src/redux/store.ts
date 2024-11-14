import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cartSlice';
import productSlice from './features/productSlice';
import wishlistSlice from './features/wishlistSlice';
import courseReducer from './features/courseSlice';

const store = configureStore({
    reducer: {
        courses: courseReducer,
        products: productSlice,
        cart: cartSlice,
        wishlist: wishlistSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
