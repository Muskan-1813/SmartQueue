import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
    name:"queue",
    initialState:{
        queue:[]
    },
    reducers:{
        setQueue:(state,action)=>{
            state.queue = action.payload;
        },
        enqueue:(state,action)=>{
            state.queue.push(action.payload);
        },
        dequeue:(state)=>{
          state.queue.shift();
        }
    }
});

export const {setQueue,enqueue,dequeue} = queueSlice.actions;
export default queueSlice.reducer;