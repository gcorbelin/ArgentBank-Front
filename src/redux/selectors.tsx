import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

// Overrides useSelector hook for typescript
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Create selectors
export const selectAuth = (state: RootState) => {
  return state.authReducer;
};
export const selectUser = (state: RootState) => {
  return state.userReducer;
};
