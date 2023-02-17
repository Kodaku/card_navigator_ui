import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";
import { HOST } from "../constants";
import { WishList, WishListCard } from "../types";
import { wishListsActions } from "./wishlists-slice";

export const fetchWishLists = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(HOST + `/wish-lists`);

      const data = await response.data;
      return data as WishList[];
    };

    const wishLists = await fetchData();
    dispatch(
      wishListsActions.replaceWishLists({
        wishLists: wishLists || [],
      })
    );
  };
};

export const getWishList = (
  wishListName: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(HOST + `/wish-lists/${wishListName}`);
      const data = await response.data;
      return data as WishList;
    };

    const wishListResp = await getData();
    if (wishListResp.wish_list_name)
      dispatch(
        wishListsActions.getWishList({
          name: wishListResp.wish_list_name,
        })
      );
  };
};

export const addWishList = (
  wishList: WishList
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const addData = async () => {
      const response = await axios.post(HOST + `/wish-lists`, {
        wish_list_name: wishList.wish_list_name,
        cards: [],
      });
      const data = await response.data;
      console.log(data);
      return data as WishList;
    };

    const wishListResp = await addData();
    dispatch(
      wishListsActions.addWishList({
        wishList: wishListResp,
      })
    );
  };
};

export const deleteWishList = (
  wishListName: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const deleteData = async () => {
      const response = await axios.get(
        HOST + `/wish-lists/delete/${wishListName}`
      );
      const data = await response.data;
      console.log(data);
      // return data;
    };
    await deleteData();
    dispatch(
      wishListsActions.removeWishList({
        name: wishListName,
      })
    );
  };
};

export const addCardToWishList = (
  wishListName: string,
  card: WishListCard,
  quantity: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const addCard = async () => {
      const response = await axios.post(
        HOST + `/wish-lists/cards/${wishListName}`,
        {
          card_name: card.card_name,
          card_img_url: card.card_img_url,
          quantity: quantity,
        }
      );
      const data = await response.data;
      console.log(data);
      return data as WishList;
    };
    const wishListResp = await addCard();
    dispatch(
      wishListsActions.addCardToWishList({
        name: wishListName,
        card: card,
      })
    );
    dispatch(
      wishListsActions.getWishList({ name: wishListResp.wish_list_name })
    );
  };
};

export const removeCardFromWishList = (
  wishListName: string,
  cardName: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const removeCard = async () => {
      const response = await axios.get(
        HOST + `/wish-lists/delete/card/${wishListName}/${cardName}`
      );
      const data = await response.data;
      console.log(data);
    };
    await removeCard();
    dispatch(
      wishListsActions.removeCardFromWishList({
        name: wishListName,
        cardName: cardName,
      })
    );
    dispatch(wishListsActions.getWishList({ name: wishListName }));
  };
};
