import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    formData: {
      username: "",
      email: "",
      role: "",
      password: "",
    },
  },
  reducers: {
    updateSignup: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
  },
});

export const { updateSignup } = signUpSlice.actions;
export default signUpSlice.reducer;
