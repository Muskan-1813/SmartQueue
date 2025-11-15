import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchOrgById,
  fetchOrgQueues,
} from '../../services/orgService';

const initialState = {
  selectedOrg: null,
  orgQueues: [],
  status: 'idle',
  error: null,
};

export const getOrganization = createAsyncThunk(
  'org/get',
  async (orgId) => {
    const response = await fetchOrgById(orgId);
    return response.data;
  }
);

export const getOrgQueues = createAsyncThunk('org/queues', async (orgId) => {
  const response = await fetchOrgQueues(orgId);
  return response.data;
});

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganization.fulfilled, (state, action) => {
        state.selectedOrg = action.payload;
      })
      .addCase(getOrgQueues.fulfilled, (state, action) => {
        state.orgQueues = action.payload;
      });
  },
});

export default orgSlice.reducer;

