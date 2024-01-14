import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TTodo = {
  _id: string;
  task: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item._id !== action.payload);
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const status = state.todos.find((item) => item._id === action.payload);
      if (status) {
        status.isCompleted = !status.isCompleted;
        state.todos.sort(
          (a, b) => (a.isCompleted ? 1 : 0) - (b.isCompleted ? 1 : 0)
        );
      }
    },
  },
});

export const { addTodo, removeTodo, toggleStatus } = todoSlice.actions;

export default todoSlice.reducer;
