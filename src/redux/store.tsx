import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth";
import userReducer from "@/redux/features/user";

export const store = configureStore({
  reducer: { authReducer, userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
