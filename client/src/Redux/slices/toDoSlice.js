import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createToDoList =  createAsyncThunk("todo/createToDoList", async(formData, {rejectWithValue}) =>{
    try {
        const response = await axios.post(`${server}/toDo/createToDo`, formData,{headers:{'Content-Type': 'application/json'},withCredentials:true,});
        return response.data;
        console.log("checking createdtodo response data",response.data);
    } catch (error) {
        if(error.response){
            return rejectWithValue(error.response.data);
        }
        else return rejectWithValue("No response from server");
    }
});

const toDoSlice = createSlice({
    name: "toDo",
    initialState: {
      allToDo: [],
      status: "idle",
      error: null,
    },

    extraReducers: (builder) => {
      builder
        // Create project cases
        .addCase(createToDoList.pending, (state) => {
          state.status = "loading";
        })
        .addCase(createToDoList.fulfilled, (state, action) => {
          state.status = "succeeded";
          console.log("checking what is inside todo action", action.payload)
        })
        .addCase(createToDoList.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });

  export default toDoSlice.reducer;

