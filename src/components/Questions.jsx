import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useCreateQuestionMutation } from "../context/api/questionsApi";
import "./admin.scss"; // Global SCSS import
import { NavLink } from "react-router-dom";

const CreateQuestion = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      options: [{ ru: "", uz: "" }], // Defaultda 1 ta input bo‘ladi
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const [createQuestion, { isLoading, error }] = useCreateQuestionMutation();

  const onSubmit = async (data) => {
    const formattedData = {
      answer: [{ ru: data.answer_ru, uz: data.answer_uz }],
      options: data.options,
      options_url: [data.options_url],
      question_image_url: data.question_image_url,
      question_language: data.question_language,
      question_level: data.question_level,
      question_text: { ru: data.question_text_ru, uz: data.question_text_uz },
      question_type: data.question_type,
      question_video_url: data.question_video_url,
      solution: { ru: data.solution_ru, uz: data.solution_uz },
      solution_image_url: data.solution_image_url,
      topic_id: data.topic_id,
    };

    try {
      await createQuestion(formattedData).unwrap();
      alert("Savol muvaffaqiyatli qo'shildi!");
      reset();
    } catch (err) {
      console.error("Xatolik:", err);
    }
  };

  return (
    <section className="container">
      <button>
        <NavLink to={"/"}>Savollarni ko'rish</NavLink>
      </button>
      <h2>Yangi Savol Qo'shish</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>question_text_ru:</label>
        <input {...register("question_text_ru")} required />

        <label>question_text_uz:</label>
        <input {...register("question_text_uz")} required />

        <label>answer_ru:</label>
        <input {...register("answer_ru")} required />

        <label>answer_uz:</label>
        <input {...register("answer_uz")} required />

        <label>options:</label>
        {fields.map((item, index) => (
          <div key={item.id} className="option-input">
            <input
              {...register(`options.${index}.ru`)}
              placeholder="RU"
              required
            />
            <input
              {...register(`options.${index}.uz`)}
              placeholder="UZ"
              required
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => remove(index)}
            >
              ❌
            </button>
          </div>
        ))}

        <button
          type="button"
          className="add-btn"
          onClick={() => append({ ru: "", uz: "" })}
        >
          + Qo‘shish
        </button>

        <label>question_image_url:</label>
        <input {...register("question_image_url")} />

        <label>question_video_url:</label>
        <input {...register("question_video_url")} />

        <label>solution_ru:</label>
        <input {...register("solution_ru")} />

        <label>solution_uz:</label>
        <input {...register("solution_uz")} />

        <label>topic_id:</label>
        <input {...register("topic_id")} required />

        <label>question_language:</label>
        <select {...register("question_language")}>
          <option value="english">Ingliz</option>
          <option value="russian">Rus</option>
          <option value="uzbek">O‘zbek</option>
        </select>

        <label>question_level:</label>
        <select {...register("question_level")}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>

        <label>question_type:</label>
        <select {...register("question_type")}>
          <option value="multiple_choice">multiple_choice</option>
          <option value="open_ended">open_ended</option>
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Yuklanmoqda..." : "Savol Qo'shish"}
        </button>
      </form>

      {error && <p className="error">Xatolik: {error.message}</p>}
    </section>
  );
};

export default CreateQuestion;
