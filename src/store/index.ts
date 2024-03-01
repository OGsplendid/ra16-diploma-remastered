import { configureStore } from "@reduxjs/toolkit";
import { localhostApi } from "./localhost.api";
import { localhostReducer } from "./localhost.slice";

export const store = configureStore({
  reducer: {
    [localhostApi.reducerPath]: localhostApi.reducer,
    shoesShop: localhostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localhostApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
