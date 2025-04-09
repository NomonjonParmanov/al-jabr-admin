import React, { useState } from "react";
import { useGetClassesQuery } from "../context/classApi";
// import { useGetChapterQuery } from "../context/chapterApi";
// import { useGetTopicQuery } from "../context/topicsApi";
// import { useGetQuestionsQuery } from "../context/questionApi";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const questions = [
  {
    id: 1,
    titleUz: "juft son",
    titleRu: "чётное число",
    variants: [5, 6, 7, 8],
    answer: 6,
    yechim: 3,
  },
  {
    id: 2,
    titleUz: "toq son",
    titleRu: "нечётное число",
    variants: [1, 2, 3, 4],
    answer: 3,
    yechim: 2,
  },
  {
    id: 3,
    titleUz: "maksimal son",
    titleRu: "максимальное число",
    variants: [10, 20, 30, 40],
    answer: 40,
    yechim: 4,
  },
];

const GetQuestions = () => {
  const [language, setLanguage] = useState("Tilni tanlang");
  const { data } = useGetClassesQuery();
  console.log(data);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  const question = questions?.map((el) => (
    <div key={el.id} className="card">
      <div className="title-row">
        <p>{language === "ru" ? el.titleRu : el.titleUz}</p>
        <button className="edit-btn">
          <FaEdit />
        </button>
      </div>

      <div className="variants">
        {el.variants.map((variant, index) => (
          <span key={index}>{variant}</span>
        ))}
      </div>

      <p>To‘g‘ri javob: {el.answer}</p>

      <div className="solution-row">
        <p>Yechim: {el.yechim}</p>
        <button className="delete-btn">
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  ));

  return (
    <section className="get">
      <div className="filter">
        <select value={language} onChange={handleLanguageChange}>
          <option value="">Tilni tanlang</option>
          <option value="uz">UZ</option>
          <option value="ru">RU</option>
        </select>
        <select name="" id="">
          <option value="">Sinfni tanlang</option>
        </select>
        <select name="" id="">
          <option value="">chapterni tanlang</option>
        </select>
        <select name="" id="">
          <option value="">topicsni tanlang</option>
        </select>
      </div>
      <div className="cards">{question}</div>
    </section>
  );
};

export default GetQuestions;
