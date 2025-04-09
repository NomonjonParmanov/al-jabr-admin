import { api } from "./api";

export const TopicsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTopic: build.query({
      query: (chapterId) => `chapter/${chapterId}/topics`,
      providesTags: ["Topics"],
    }),

    createTopic: build.mutation({
      query: (body) => ({
        url: "/Topics",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Topics"],
    }),
    updateTopic: build.mutation({
      query: ({ id, body }) => ({
        url: `/topics/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Topics"],
    }),
    deleteTopic: build.mutation({
      query: (id) => ({
        url: `/delete_topics/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Topics"],
    }),
  }),
});

export const {
  useGetTopicQuery,
  useDeleteTopicMutation,
  useCreateTopicMutation,
  useUpdateTopicMutation,
} = TopicsApi;
