import { configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./cards-slice";
import { expansionsSlice } from "./expansions-slice";
import { wishListsSlice } from "./wishlists-slice";

export const store = configureStore({
  reducer: {
    expansions: expansionsSlice.reducer,
    wishLists: wishListsSlice.reducer,
    cards: cardsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
