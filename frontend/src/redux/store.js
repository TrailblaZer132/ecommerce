import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "./features/favorites/favoriteSlice";
import cartSliceReducer from "./features/cart/cartSlice";
import shopSlice from "./features/shop/shopSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import { sellerAplicationApi } from "./api/sellerApplicationsApiSlice"; // Import the new slice

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopSlice,
    [sellerAplicationApi.reducerPath]: sellerAplicationApi.reducer, // Add the new slice reducer
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, sellerAplicationApi.middleware), // Add the new slice middleware
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
