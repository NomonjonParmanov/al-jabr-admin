import React from "react";
import Latex from "react-latex-next";
import { useGetQuestionsQuery } from "../context/api/questionsApi";
import "./admin.scss";
import { NavLink } from "react-router-dom";
const GetQuestions = () => {
  const { data } = useGetQuestionsQuery();
  const mappedQuestions = data?.map((question, index) => {
    try {
      const parsedText = JSON.parse(question.question_text);
      const parsedAnswer = JSON.parse(question.answer);
      return (
        <div key={index} className="questions">
          <Latex>{parsedText.uz}</Latex>
          <Latex>Answer {parsedAnswer.uz}</Latex>
          <Latex>{parsedText.ru}</Latex>
          <Latex>Answer {parsedAnswer.ru}</Latex>
        </div>
      );
    } catch (error) {}
  });

  return (
    <section className="container1">
      <button>
        <NavLink to={"/create"}>Create Questions</NavLink>
      </button>
      <div className="question-card">{mappedQuestions}</div>
    </section>
  );
};

export default GetQuestions;
