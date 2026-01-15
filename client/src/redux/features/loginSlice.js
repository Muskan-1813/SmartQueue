import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    formData: {
      email: "",
      password: "",
    },
  },
  reducers: {
    updateInput: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
  },
});

export const { updateInput, updatePassword } = loginSlice.actions;
export default loginSlice.reducer;
