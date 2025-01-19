import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  value: number;
}

const initialState: InitialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (e) => {
      e.value += 1;
    },
    decrement: (e) => {
      e.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
