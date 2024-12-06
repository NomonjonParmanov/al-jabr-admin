import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./admin.scss";
import { useCreateQuestionMutation } from "../context/api/questionsApi";

const CreateDynamicForm = () => {
  const [formData, setFormData] = useState({
    answer: "",
    options: [""],
    options_url: [""],
    question_image_url: "",
    question_level: "easy",
    question_text: "",
    question_type: "multiple_choice",
    solution: "",
    solution_image_url: "",
    topic_id: "",
    id: "",
  });

  const [createQuestion] = useCreateQuestionMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, index, value) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [name]: updatedArray }));
  };

  const addOption = (name) => {
    setFormData((prev) => ({ ...prev, [name]: [...prev[name], ""] }));
  };

  const removeOption = (name, index) => {
    const updatedArray = [...formData[name]];
    updatedArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, [name]: updatedArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuestion(formData).unwrap();
      toast.success("Question created successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData({
        answer: "",
        options: [""],
        options_url: [""],
        question_image_url: "",
        question_level: "easy",
        question_text: "",
        question_type: "multiple_choice",
        solution: "",
        solution_image_url: "",
        topic_id: "",
      });
    } catch (err) {
      toast.error("Error creating question: " + err.message, {});
    }
  };

  return (
    <div className="create-form">
      <form onSubmit={handleSubmit}>
        <label>
          Answer:
          <input
            required
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
          />
        </label>

        <label>
          Options:
          {formData.options.map((option, index) => (
            <div key={index} className="dynamic-input">
              <input
                required
                type="text"
                value={option}
                onChange={(e) =>
                  handleArrayChange("options", index, e.target.value)
                }
              />
              <button type="button" onClick={() => addOption("options")}>
                +
              </button>
              {formData.options.length > 1 && (
                <button
                  className="remove"
                  type="button"
                  onClick={() => removeOption("options", index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
        </label>

        <label>
          Question Level:
          <select
            name="question_level"
            value={formData.question_level}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Question Type:
          <input
            type="text"
            name="question_type"
            value={formData.question_type}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Question Text:
          <textarea
            name="question_text"
            value={formData.question_text}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Question Image URL:
          <input
            type="text"
            name="question_image_url"
            value={formData.question_image_url}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Solution:
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Solution Image URL:
          <input
            type="text"
            name="solution_image_url"
            value={formData.solution_image_url}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Topic ID:
          <input
            type="text"
            name="topic_id"
            value={formData.topic_id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-button">
          Create
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateDynamicForm;
