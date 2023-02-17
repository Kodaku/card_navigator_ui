import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardsInitialState } from "../types";

const initialState: CardsInitialState = {
  currentCard: {
    card_code: "",
    card_name: "",
    card_type: "",
    img_url: "",
  },
};

const cardsSlice = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {
    replaceCurrentCard(state, action: PayloadAction<{ card: Card }>) {
      const card = action.payload.card;
      if (card) {
        state.currentCard = card;
      }
    },
  },
});

const cardsActions = cardsSlice.actions;

export { cardsActions, cardsSlice };
