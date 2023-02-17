import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishList, WishListCard, WishListInitialState } from "../types";

const initialState: WishListInitialState = {
  wishLists: [],
  currentWishList: {
    wish_list_name: "",
    cards: [],
  },
};

const wishListsSlice = createSlice({
  name: "wish-lists",
  initialState: initialState,
  reducers: {
    replaceWishLists(state, action: PayloadAction<{ wishLists: WishList[] }>) {
      const wishLists = action.payload.wishLists;
      if (wishLists) {
        state.wishLists = wishLists;
      }
    },
    addWishList(state, action: PayloadAction<{ wishList: WishList }>) {
      const wishList = action.payload.wishList;
      state.wishLists.push({
        wish_list_name: wishList.wish_list_name,
        cards: [],
      });
    },
    updateWishList(state, action: PayloadAction<{ wishList: WishList }>) {
      const newWishList = action.payload.wishList;
      const oldWishListIndex = state.wishLists.findIndex(
        (wishList) => wishList.wish_list_name === newWishList.wish_list_name
      );
      state.wishLists[oldWishListIndex] = newWishList;
      console.log("New WishList: ", state.wishLists[oldWishListIndex]);
    },
    getWishList(state, action: PayloadAction<{ name: string }>) {
      const name = action.payload.name;
      const wishList = state.wishLists.find(
        (wishList) => wishList.wish_list_name === name
      );
      if (wishList) {
        state.currentWishList = wishList;
      }
    },
    removeWishList(state, action: PayloadAction<{ name: string }>) {
      const name = action.payload.name;
      state.wishLists = state.wishLists.filter(
        (wishList) => wishList.wish_list_name !== name
      );
    },
    removeCardFromWishList(
      state,
      action: PayloadAction<{ name: string; cardName: string }>
    ) {
      const name = action.payload.name;
      const cardName = action.payload.cardName;
      const wishListIndex = state.wishLists.findIndex(
        (wishList) => wishList.wish_list_name === name
      );
      const wishList = state.wishLists[wishListIndex];
      wishList.cards.filter((card) => card.card_name !== cardName);
      state.wishLists[wishListIndex] = wishList;
    },
    addCardToWishList(
      state,
      action: PayloadAction<{ name: string; card: WishListCard }>
    ) {
      const name = action.payload.name;
      const card = action.payload.card;
      const wishListIndex = state.wishLists.findIndex(
        (wishList) => wishList.wish_list_name === name
      );
      const wishList = state.wishLists[wishListIndex];
      wishList.cards.push(card);
      state.wishLists[wishListIndex] = wishList;
    },
  },
});

const wishListsActions = wishListsSlice.actions;

export { wishListsActions, wishListsSlice };
