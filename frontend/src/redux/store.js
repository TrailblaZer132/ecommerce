import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "./features/favorites/favoriteSlice";
import cartSliceReducer from "./features/cart/cartSlice";
import shopSlice from "./features/shop/shopSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import { sellerAplicationApi } from "./api/sellerApplicationsApiSlice";
import { chatApi } from "./api/chatApiSlice"; // Import the chatApi

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopSlice,
    [sellerAplicationApi.reducerPath]: sellerAplicationApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer, // Add the chatApi reducer
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      sellerAplicationApi.middleware,
      chatApi.middleware
    ), // Add the chatApi middleware
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
