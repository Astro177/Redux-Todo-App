import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import { baseApi } from "./api/api";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
