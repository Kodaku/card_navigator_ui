import { configureStore } from "@reduxjs/toolkit";
import { expansionsSlice } from "./expansions-slice";

export const store = configureStore({
  reducer: {
    expansions: expansionsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
