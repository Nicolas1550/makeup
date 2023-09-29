import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserDetailsError,
} from "./userDetailsSlice";

export const fetchUserDetails = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (userId: string, thunkAPI) => {
    thunkAPI.dispatch(fetchUserDetailsStart());
    try {
      const { data } = await axios.get(
        `http://localhost:3003/api/users/${userId}`
      );
      thunkAPI.dispatch(fetchUserDetailsSuccess(data));
    } catch (error) {
      console.error("Error fetching user details:", error);
      thunkAPI.dispatch(fetchUserDetailsError());
    }
  }
);
