import { createSlice } from "@reduxjs/toolkit";

const orgSlice = createSlice({
  name: "org",
  initialState: {
    org: null,
  },
  reducers: {
    setOrgs: (state, action) => {
      state.orgs = action.payload;
    },
  },
});

export const { setOrgs } = orgSlice.actions;
export default orgSlice;
