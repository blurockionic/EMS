// /src/store/teamSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../App";

const initialState = {
  teams: [],
  status: "idle",
  error: null,
};

export const createTeam = createAsyncThunk(
  "team/CreateNewTeam",
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${server}/team/CreateNewTeam`,
        teamData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async ({ id, teamData }, { rejectWithValue }) => {
    try {
      console.log("Update Team ID:", id);
      console.log("Updated Team Data:", teamData);

      const response = await axios.put(
        `${server}/team/updateTeam/${id}`,
        teamData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error response from server:", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${server}/team/deleteTeam/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTeams = createAsyncThunk(
  "team/allTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/team/allTeams`, {
        withCredentials: true,
      });
      return response?.data?.allTeamsData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.teams.findIndex(
          (team) => team.id === action.payload.id
        );
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = state.teams.filter(
          (team) => team.id !== action.payload.id
        );
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchTeams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
