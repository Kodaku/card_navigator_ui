import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";
import { HOST } from "../constants";
import { Expansion } from "../types";
import { expansionsActions } from "./expansions-slice";

export const fetchExpansions = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(HOST + `/expansions`);

      const data = await response.data;
      return data as Expansion[];
    };

    const expenses = await fetchData();
    dispatch(
      expansionsActions.replaceExpansions({
        expansions: expenses || [],
      })
    );
  };
};

export const getExpansion = (
  expansionName: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(HOST + `/expansions/${expansionName}`);
      const data = await response.data;
      return data as Expansion;
    };

    const expansionResp = await getData();
    if (expansionResp.expansion_full_name)
      dispatch(
        expansionsActions.getExpense({
          expansionName: expansionResp.expansion_full_name,
        })
      );
  };
};
