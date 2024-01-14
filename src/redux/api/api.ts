import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        return {
          url: `/tasks`,
          method: "GET",
          params: { priority },
        };
      },
      providesTags: ["todo"],
    }),
    addTodos: builder.mutation({
      query: (data) => {
        return {
          url: "/tasks",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["todo"],
    }),
    updateTodo: builder.mutation({
      query: (options) => {
        return {
          url: `/tasks/${options?.id}`,
          method: "PUT",
          body: options?.data,
        };
      },
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => {
        return {
          url: `/task/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = baseApi;
