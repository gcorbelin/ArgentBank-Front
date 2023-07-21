import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppGetState } from "../store";
import { selectAuth } from "../selectors";

type AuthState = {
  isAuth: boolean;
  status: string;
  error: string | null;
};

const initialState = {
  isAuth: false,
  status: "void",
  error: null,
} as AuthState;

// Middleware
export function logIn({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) {
  return async function (dispatch: AppDispatch, getState: AppGetState) {
    const status = selectAuth(getState()).status;
    if (status === "pending" || status === "updating") {
      return;
    }
    dispatch(actions.fetching());
    try {
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          email: userName,
          password: password,
        }),
        redirect: "follow",
      });
      const data = await response.json();
      switch (data.status) {
        case 200:
          // Success
          dispatch(actions.resolved());
          localStorage.setItem("user", JSON.stringify(data));
          break;
        case 400:
          // Invalid fields
          dispatch(actions.rejected(data.message));
          break;
        case 500:
          // Internal server error
          dispatch(actions.rejected(data.message));
          break;
        default:
          // Unhandled
          break;
      }
    } catch (error: any) {
      dispatch(actions.rejected(error));
    }
  };
}

// Slice
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem("user");
      return initialState;
    },
    fetching: (draft) => {
      if (draft.status === "void") {
        draft.status = "pending";
        return;
      }
      if (draft.status === "rejected") {
        draft.error = null;
        draft.status = "pending";
        return;
      }
      if (draft.status === "resolved") {
        draft.isAuth = false;
        draft.status = "pending";
        return;
      }
    },
    resolved: (draft) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.status = "resolved";
        draft.isAuth = true;
        draft.error = null;
        return;
      }
      return;
    },
    rejected: {
      prepare: (error: string) => {
        return {
          payload: {
            ...initialState,
            error,
          },
        };
      },
      reducer: (draft, action: PayloadAction<AuthState>) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "rejected";
          draft.isAuth = false;
          draft.error = action.payload.error;
          return;
        }
        return;
      },
    },
  },
});

export const { actions } = auth;
export const { logOut } = actions;
export default auth.reducer;
