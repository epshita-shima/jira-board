import { configureStore } from "@reduxjs/toolkit";
import treeviewReducer from "./features/treeViews/treeviewSlice";
import { api } from "./api/apiSlice";
const store = configureStore({
  reducer: {
    treeview: treeviewReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
