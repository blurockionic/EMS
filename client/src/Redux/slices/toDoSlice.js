
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

export const createToDoList = createAsyncThunk(
  "todo/createToDoList",
  async (formData, { rejectWithValue }) => {
    try {

      const response = await axios.post(`${server}/todo/createToDo`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else return rejectWithValue("No response from server");
    }
  }
);

export const fetchAllToDos =  createAsyncThunk("todo/fetchToDoList", async() =>{
  try {
      const response = await axios.get(`${server}/toDo/fetchToDoList`,{withCredentials:true});
      return response.data;
  } catch (error) {   
   return ("No response from server", error);
  }
});

const toDoSlice = createSlice({
    name: "toDo",
    initialState: {
      allToDos: [],
      status: "idle",
      error: null,
    },

    extraReducers: (builder) => {
      builder
        // Create project cases
        .addCase(createToDoList.pending, (state) => {
          state.status = "loading";
          console.log("Pending state: loading");
        })
        .addCase(createToDoList.fulfilled, (state, action) => {
          state.status = "succeeded";
          console.log("checking what is inside todo action", action.payload)
        })
        .addCase(createToDoList.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          console.log("Rejected state: failed");
        console.log("Error payload:", action.payload); 
        })
        //fetching 
        .addCase(fetchAllToDos.pending, (state) => {
          state.status = "loading";
          console.log("Pending state: loading");
        })
        .addCase(fetchAllToDos.fulfilled, (state, action) => {
          state.status = "succeeded";
          // console.log("checking what is inside todo list", action.payload.allToDos)
          state.allToDos = action.payload.allToDos
          console.log("i am inside state alltodos",state.allToDos);
        })
        .addCase(fetchAllToDos.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          console.log("Rejected state: failed");
        console.log("Error payload:", action.payload); 
        });
    },
  });

export default toDoSlice.reducer;
