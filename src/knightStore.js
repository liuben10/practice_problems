import { configureStore } from '@reduxjs/toolkit';
import knightStoreReducer from './knightStoreSlice.js';

export default configureStore({
  reducer: {
    knightStore: knightStoreReducer
  },
})