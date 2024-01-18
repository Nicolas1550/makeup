import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  userId?: string;
  username?: string;
  email?: string;
}

interface UserDetailsState {
  userDetails: UserDetails | null;
  isLoading: boolean;
}

const initialState: UserDetailsState = {
  userDetails: null,
  isLoading: false,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    fetchUserDetailsStart: (state) => {
      state.isLoading = true;
    },
    fetchUserDetailsSuccess: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      state.isLoading = false;
    },
    fetchUserDetailsError: (state) => {
      state.isLoading = false;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const {
  fetchUserDetailsStart,
  fetchUserDetailsSuccess,
  fetchUserDetailsError,
  clearUserDetails,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
