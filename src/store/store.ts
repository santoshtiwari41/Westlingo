import { configureStore } from "@reduxjs/toolkit";

import bookingReducer from "./bookingSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
