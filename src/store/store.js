import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice"; // Import the profile slice reducer

// Create Redux store and add the profile slice
const store = configureStore({
  reducer: {
    profile: profileReducer, // Add the profile slice reducer here
  },
});

export default store;
