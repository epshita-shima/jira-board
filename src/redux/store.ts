import { configureStore } from "@reduxjs/toolkit";
import boardviewReducer from "./features/boards/boardSlice";
import { api } from "./api/apiSlice";
const store = configureStore({
  reducer: {
    boardview: boardviewReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
