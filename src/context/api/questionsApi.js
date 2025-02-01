import { api } from "./index";

export const questionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query({
      query: (params) => ({
        url: "/getquestions",
        params,
      }),
      providesTags: ["Question"],
    }),
    getQuestionById: build.query({
      query: (id) => ({
        url: `/questions/${id}`,
      }),
      providesTags: ["Question"],
    }),
    createQuestion: build.mutation({
      query: (body) => ({
        url: "/questions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Question"],
    }),
    deleteQuestion: build.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),
    updateQuestion: build.mutation({
      query: ({ id, body }) => ({
        url: `/questions/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Question"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = questionApi;
