import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Create a slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
  },
  reducers: {
    //TODO
  },
});

// Config the store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Export default store
export default store;

// Export the action
export const userAction = userSlice.actions;
