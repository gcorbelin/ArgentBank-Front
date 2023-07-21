import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppGetState } from "../store";
import { selectAuth, selectUser } from "../selectors";

type userState = {
  data: userData | null;
  error: string | null;
  status: string;
};

type userData = {
  firstName: string;
  lastName: string;
};

const initialState = {
  data: null,
  error: null,
  status: "void",
} as userState;

// Async function
export function getUser() {
  return async function (dispatch: AppDispatch, getState: AppGetState) {
    const status = selectUser(getState()).status;
    console.log("status", status);
    if (status === "pending" || status === "updating") {
      return;
    }
    dispatch(actions.fetching());
    try {
      const localstorage_user = JSON.parse(localStorage.getItem("user") || "");
      const inMemoryToken = localstorage_user.body.token;

      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${inMemoryToken}`);

      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        }
      );
      const data = await response.json();
      console.log(data);
      switch (data.status) {
        case 200:
          // Success
          const userInfos = {
            firstName: data.body.firstName,
            lastName: data.body.lastName,
          };
          dispatch(actions.resolved(userInfos));
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
      console.log(error);
      dispatch(actions.rejected(error));
    }
  };
}

export async function updateUser(userInfos: userData) {
  // TODO: create async function updateUser (outside of slice) to call API "/user/profile" with JWT in header and an object {firstName:string, lastName:string} in the body
  // If 200: update state => call setUser
  // Else 400: format error
  // Else 500: a problem occured
}

// Slice
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => {
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
        draft.data = null;
        draft.status = "pending";
        return;
      }
    },
    resolved: {
      prepare: (data: userData) => {
        return {
          payload: {
            ...initialState,
            data,
          },
        };
      },
      reducer: (draft, action: PayloadAction<userState>) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "resolved";
          draft.data = action.payload.data;
          draft.error = null;
          return;
        }
        return;
      },
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
      reducer: (draft, action: PayloadAction<userState>) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "rejected";
          draft.data = null;
          draft.error = action.payload.error;
          return;
        }
        return;
      },
    },
  },
});

export const { actions } = user;
export const { resetUser } = user.actions;
export default user.reducer;
