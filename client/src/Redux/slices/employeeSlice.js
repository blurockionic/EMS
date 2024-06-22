// src/redux/employeeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../App';

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async () => {
  const response = await axios.get(`${server}/employee/all`, { withCredentials: true });
  return response.data.data;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    data: [],
    dataForSearch: [],
    activeTeamTab: 'Employee Details',
    status: 'idle',
    error: null,
  },
  reducers: {
    setEmployeeData: (state, action) => {
      state.data = action.payload;
      state.dataForSearch = action.payload;
    },
    filterEmployeeData: (state, action) => {
      const searchTerm = action.payload.trim().toLowerCase();
      state.data = state.dataForSearch.filter((item) =>
        item.employeeName.trim().toLowerCase().includes(searchTerm)
      );
    },
    setActiveTeamTab: (state, action) => {
      state.activeTeamTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.dataForSearch = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setEmployeeData, filterEmployeeData, setActiveTeamTab } = employeeSlice.actions;

export default employeeSlice.reducer;
