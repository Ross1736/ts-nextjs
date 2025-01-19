import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  name: string;
}

const initialState: UserState = {
  name: "Maria",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
    },
    clearUser: () => {
      initialState.name = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
