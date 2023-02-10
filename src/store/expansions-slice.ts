import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expansion, ExpansionInitialState } from "../types";

const initialState: ExpansionInitialState = {
  currentExpansion: {
    card_types: [],
    expansion_full_name: "",
    expansion_url: "",
  },
  expansions: [],
};

const expansionsSlice = createSlice({
  name: "expansions",
  initialState: initialState,
  reducers: {
    replaceExpansions(
      state,
      action: PayloadAction<{ expansions: Expansion[] }>
    ) {
      const expansions = action.payload.expansions;
      if (expansions) {
        state.expansions = expansions;
      }
    },
    getExpense(state, action: PayloadAction<{ expansionName: string }>) {
      const expansionName = action.payload.expansionName;
      const expansion = state.expansions.find(
        (expansion) => expansion.expansion_full_name === expansionName
      );
      if (expansion) {
        state.currentExpansion = expansion;
      }
    },
  },
});

const expansionsActions = expansionsSlice.actions;

export { expansionsActions, expansionsSlice };
