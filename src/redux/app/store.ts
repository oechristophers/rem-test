import { configureStore } from '@reduxjs/toolkit';
import { skipApi } from './bookSkip/skipApi'; 
import generalApiSlice from './api/generalSlice';
import skipSlice from "@/redux/app/bookSkip/skipSlice"

export const store = configureStore({
  reducer: {
    skips: skipSlice,
    [generalApiSlice.reducerPath]: generalApiSlice.reducer, // Add generalApiSlice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(skipApi.middleware, generalApiSlice.middleware), // Add middlewares for both API slices
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
