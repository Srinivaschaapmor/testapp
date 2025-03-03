import { createSlice } from "@reduxjs/toolkit";

// Initial state for profile
const initialState = {
  profile: null, // Store decoded JWT profile here
};

// Create slice
const profileSlice = createSlice({
  name: "profile", // Name of the slice
  initialState,
  reducers: {
    // Action to set the profile (JWT decoded info)
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    // Action to clear the profile
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

// Export the actions to dispatch
export const { setProfile, clearProfile } = profileSlice.actions;

// Export the reducer
export default profileSlice.reducer;
