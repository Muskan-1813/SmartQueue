import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  login,
  registerOrg,
  registerUser,
} from '../../services/authService';

const userKey = 'smartqueue_user';

const persistSession = (user) => {
  if (user) localStorage.setItem(userKey, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(userKey);
};

const initialState = {
  user: JSON.parse(localStorage.getItem(userKey) || 'null'),
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (payload) => {
  const response = await login(payload);
  return response.data;
});

export const registerUserAccount = createAsyncThunk(
  'auth/registerUser',
  async (payload) => {
    const response = await registerUser(payload);
    return response.data;
  }
);

export const registerOrgAccount = createAsyncThunk(
  'auth/registerOrg',
  async (payload) => {
    const response = await registerOrg(payload);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      clearSession();
    },
    setCredentials(state, action) {
      state.user = action.payload.user;
      persistSession(state.user);
    },
  },
  extraReducers: (builder) => {
    const fulfilled = (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.error = null;
      persistSession(state.user);
    };

    const pending = (state) => {
      state.status = 'loading';
      state.error = null;
    };

    const rejected = (state, action) => {
      state.status = 'failed';
      // Extract meaningful error message from axios error
      let errorMessage = 'An error occurred';
      
      if (action.error.message) {
        if (action.error.message.includes('Network Error') || action.error.code === 'ERR_NETWORK' || action.error.code === 'ECONNREFUSED') {
          errorMessage = 'Network error: Could not connect to server. Please check if the backend is running.';
        } else if (action.error.response?.data?.message) {
          errorMessage = action.error.response.data.message;
        } else if (action.error.response?.status === 400) {
          errorMessage = 'Invalid credentials';
        } else if (action.error.response?.status === 401) {
          errorMessage = 'Unauthorized';
        } else if (action.error.response?.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = action.error.message;
        }
      }
      
      state.error = errorMessage;
      console.error('[AUTH] Login error:', {
        message: errorMessage,
        originalError: action.error,
        response: action.error.response?.data,
      });
    };

    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, fulfilled)
      .addCase(loginUser.rejected, rejected)
      .addCase(registerUserAccount.pending, pending)
      .addCase(registerUserAccount.fulfilled, fulfilled)
      .addCase(registerUserAccount.rejected, rejected)
      .addCase(registerOrgAccount.pending, pending)
      .addCase(registerOrgAccount.fulfilled, fulfilled)
      .addCase(registerOrgAccount.rejected, rejected);
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;

