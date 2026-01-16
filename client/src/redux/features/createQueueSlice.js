import { createSlice } from "@reduxjs/toolkit";

const createQueueSlice = createSlice({
  name: "createQueue",
  initialState: {
    formData: {
      name: "",
      startAt: "",
      endAt: "",
    },
  },
  reducers: {
    updateInput: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
  },
});

export const { updateInput } = createQueueSlice.actions;
export default createQueueSlice.reducer;
