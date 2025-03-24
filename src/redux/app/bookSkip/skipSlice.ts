import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Skip } from "./skipApi";

interface SkipState {
  selectedSkip: Skip | null;
}

const initialState: SkipState = {
  selectedSkip: null,
};

const skipSlice = createSlice({
  name: "skip",
  initialState,
  reducers: {
    addSkip: (state, action: PayloadAction<Skip>) => {
      state.selectedSkip = action.payload;
    },
    removeSkip: (state) => {
      state.selectedSkip = null;
    },
  },
});

export const { addSkip, removeSkip } = skipSlice.actions;
export default skipSlice.reducer;
