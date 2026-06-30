import { configureStore } from '@reduxjs/toolkit';
import hmsReducer from './slices/hmsSlice';

export const store = configureStore({
  reducer: {
    hms: hmsReducer,
  },
});
