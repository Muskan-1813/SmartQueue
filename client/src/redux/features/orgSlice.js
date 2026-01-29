import { createSlice } from "@reduxjs/toolkit";

const orgSlice = createSlice({
  name: "orgs",
  initialState: {
    orgs: [],
  },
  reducers: {
    setOrgs: (state, action) => {
      state.orgs = action.payload;
    },
  },
});

export const { setOrgs } = orgSlice.actions;
export default orgSlice;
