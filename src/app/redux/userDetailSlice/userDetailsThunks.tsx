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
        `http://localhost:3002/api/users/${userId}`
      );
      console.log("User details from server:", data);

      thunkAPI.dispatch(fetchUserDetailsSuccess(data));
      console.log("Dispatching action with data:", data);

    } catch (error) {
      console.error("Error fetching user details:", error);
      thunkAPI.dispatch(fetchUserDetailsError());
    }
  }
);
