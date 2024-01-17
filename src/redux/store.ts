import { configureStore } from "@reduxjs/toolkit";
import boardviewReducer from "./features/boards/boardSlice";
import userViewReducer from "./features/user/userInfoSlice";
import notificationReducer from "./features/notification/notificationSlice";
import { api } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    boardview: boardviewReducer,
    userView: userViewReducer,
    notificationView: notificationReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
