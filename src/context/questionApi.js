import { api } from "./api";

export const QuestionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query({
      query: (params) => ({
        url: "/getquestions?limit=10&offset=0&language=uz",
        params,
      }),
      providesTags: ["Questions"],
    }),
    getQuestion: build.query({
      query: (id) => ({
        url: `/questions/${id}`,
      }),
      providesTags: ["Questions"],
    }),
    createQuestion: build.mutation({
      query: (body) => ({
        url: "/Questions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Questions"],
    }),
    updateQuestion: build.mutation({
      query: ({ id, body }) => ({
        url: `/question/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Questions"],
    }),
    deleteQuestion: build.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useDeleteQuestionMutation,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} = QuestionsApi;
