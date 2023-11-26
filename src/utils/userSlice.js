import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (action, payload) => {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
