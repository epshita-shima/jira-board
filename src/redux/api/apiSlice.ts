import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-list-server-production-e6e8.up.railway.app/",
  }),
  tagTypes: ["alltask"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/task",
      providesTags: ["alltask"],
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/task",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["alltask"],
    }),
    singleTask: builder.query({
      query: (id) => `/task/${id}`,
    }),
    updateTask: builder.mutation({
      query(data) {
        console.log(data);
        const { _id, ...body } = data;
        return {
          url: `/task/${_id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["alltask"],
    }),

    closeTask: builder.mutation({
      query(data) {
        console.log(data);
        const { _id, ...body } = data;
        return {
          url: `/close/${_id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["alltask"],
    }),
    openTask: builder.mutation({
      query(data) {
        console.log(data);
        const { _id, ...body } = data;
        return {
          url: `/open/${_id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["alltask"],
    }),

    deleteTask: builder.mutation({
      query(id) {
        console.log(id);
        return {
          url: `/task/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["alltask"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useSingleTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useCloseTaskMutation,
  useOpenTaskMutation,
  useDeleteTaskMutation,
} = api;
