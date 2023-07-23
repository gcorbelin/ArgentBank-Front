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
      dispatch(actions.rejected(error));
    }
  };
}

export function updateUser(userInfos: userData) {
  return async function (dispatch: AppDispatch, getState: AppGetState) {
    const status = selectUser(getState()).status;
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
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({
            firstName: userInfos.firstName,
            lastName: userInfos.lastName,
          }),
          redirect: "follow",
        }
      );
      const data = await response.json();
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
      dispatch(actions.rejected(error));
    }
  };
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
