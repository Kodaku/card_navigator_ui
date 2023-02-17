import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Card } from "../types";
import { cardsActions } from "./cards-slice";

export const replaceCurrentCard = (
  card: Card
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    if (card.card_name)
      dispatch(
        cardsActions.replaceCurrentCard({
          card: card,
        })
      );
  };
};
