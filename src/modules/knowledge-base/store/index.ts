
import { configureStore } from "@reduxjs/toolkit";
import helpdeskCategoryReducer from "./helpdeskCategorySlice";

export const store = configureStore({
  reducer: {
    helpdeskCategory: helpdeskCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
