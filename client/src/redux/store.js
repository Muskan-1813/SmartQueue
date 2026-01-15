import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/loginSlice.js'
import  userReducer  from './features/userSlilce.js';
export const store = configureStore({
        reducer:{
            login:loginReducer,
            user:userReducer
        }
    })
