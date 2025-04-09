import React, { useState, useEffect } from "react";
import { useGetClassesQuery } from "../context/classApi";
import { useGetChapterQuery } from "../context/chapterApi";
import { useGetTopicQuery } from "../context/topicsApi";

const VariantInputs = ({ values, handleChange }) => {
  return Object.keys(values).map((key, index) => (
    <input
      key={index}
      type="text"
      placeholder={key.replace(/([a-z])([A-Z])/g, "$1 $2")}
      value={values[key]}
      onChange={handleChange}
      required={index < 8}
    />
  ));
};

const VariantSelects = ({ uzVariants, ruVariants }) => {
  return (
    <>
      <select name="" id="" required>
        <option value="">Tog‘ri javobni tanlang 1</option>
        {uzVariants}
      </select>
      <select name="" id="" required>
        <option value="">Выберите правильный ответ 1</option>
        {ruVariants}
      </select>
      <select name="" id="">
        <option value="">Tog‘ri javobni tanlang 2</option>
        {uzVariants}
      </select>
      <select name="" id="">
        <option value="">Выберите правильный ответ 2</option>
        {ruVariants}
      </select>
      <select name="" id="">
        <option value="">Tog‘ri javobni tanlang 3</option>
        {uzVariants}
      </select>
      <select name="" id="">
        <option value="">Выберите правильный ответ 3</option>
        {ruVariants}
      </select>
    </>
  );
};

const Questions = () => {
  const [isMCQChecked, setIsMCQChecked] = useState(false);
  const [isOpenChecked, setIsOpenChecked] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedImageOption, setSelectedImageOption] = useState("");
  const [selectedImageOption2, setSelectedImageOption2] = useState("");
  const [values, setValues] = useState({
    variant1Uz: "",
    variant1Ru: "",
    variant2Uz: "",
    variant2Ru: "",
    variant3Uz: "",
    variant3Ru: "",
    variant4Uz: "",
    variant4Ru: "",
    variant5Uz: "",
    variant5Ru: "",
  });

  const { data: classes } = useGetClassesQuery();
  const { data: chapters } = useGetChapterQuery(selectedClass, {
    skip: !selectedClass,
  });
  const { data: topics } = useGetTopicQuery(selectedChapter, {
    skip: !selectedChapter,
  });

  useEffect(() => {
    setSelectedTopic(""); // Reset topic when chapter changes
  }, [selectedChapter]);

  const uzVariants = Object.entries(values)
    .filter(([key, value]) => key.includes("Uz") && value.trim() !== "")
    .map(([key, value]) => (
      <option key={key} value={value}>
        {value}
      </option>
    ));

  const ruVariants = Object.entries(values)
    .filter(([key, value]) => key.includes("Ru") && value.trim() !== "")
    .map(([key, value]) => (
      <option key={key} value={value}>
        {value}
      </option>
    ));

  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [placeholder.replace(/\s+/g, "")]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Values:", {
      ...values,
      selectedClass,
      selectedChapter,
      selectedTopic,
      type: isMCQChecked ? "MCQ" : "Open",
    });
  };

  return (
    <section className="questions">
      <form onSubmit={handleSubmit}>
        {isMCQChecked && <h1>MCQ</h1>}
        {isOpenChecked && <h1>Open</h1>}

        <div className="selects">
          {/* Class Selection */}
          <select
            name="class"
            id="class"
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedChapter("");
              setSelectedTopic("");
            }}
          >
            <option value="">Sinfni tanlang</option>
            {classes?.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name?.uz || cls.name?.ru}
              </option>
            ))}
          </select>

          {/* Chapter Selection */}
          <select
            name="chapter"
            id="chapter"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={!selectedClass}
          >
            <option value="">Chapter tanlang</option>
            {chapters?.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.name?.uz || chapter.name?.ru}
              </option>
            ))}
          </select>

          {/* Topic Selection */}
          <select
            name="topics"
            id="topics"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            disabled={!selectedChapter}
          >
            <option value="">Topics tanlang</option>
            {topics?.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        <div className="check">
          <input
            type="checkbox"
            id="mcq"
            checked={isMCQChecked}
            onChange={() => {
              setIsMCQChecked(!isMCQChecked);
              setIsOpenChecked(false);
            }}
          />
          <label htmlFor="mcq">MCQ</label>

          <input
            type="checkbox"
            id="open"
            checked={isOpenChecked}
            onChange={() => {
              setIsOpenChecked(!isOpenChecked);
              setIsMCQChecked(false);
            }}
          />
          <label htmlFor="open">Open</label>
        </div>

        {isMCQChecked && (
          <>
            <div className="check">
              <input
                type="radio"
                id="noImage"
                checked={selectedImageOption === "noImage"}
                onChange={() => setSelectedImageOption("noImage")}
              />
              <label htmlFor="noImage">Rasmsiz savollar</label>

              <input
                type="radio"
                id="imageQuestion"
                checked={selectedImageOption === "imageQuestion"}
                onChange={() => setSelectedImageOption("imageQuestion")}
              />
              <label htmlFor="imageQuestion">
                Rasmli savol <span>(rasmsiz javob)</span>
              </label>

              <input
                type="radio"
                id="imageBoth"
                checked={selectedImageOption === "imageBoth"}
                onChange={() => setSelectedImageOption("imageBoth")}
              />
              <label htmlFor="imageBoth">
                Rasmli savol <span>(rasmli javob)</span>
              </label>
            </div>

            <div className="inputs">
              {selectedImageOption === "noImage" && (
                <>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Name uz"
                    required
                  ></textarea>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Name ru"
                    required
                  ></textarea>
                </>
              )}
              {selectedImageOption === "imageQuestion" && (
                <>
                  <input type="link" placeholder="Rasm link" required />
                  <input type="link" placeholder="Rasm link" required />
                </>
              )}
              {selectedImageOption === "imageBoth" && (
                <>
                  <input type="link" placeholder="Rasm link" required />
                  <input type="link" placeholder="Rasm link" required />
                </>
              )}
              <VariantInputs values={values} handleChange={handleChange} />
            </div>

            <div className="select">
              {(selectedImageOption === "noImage" ||
                selectedImageOption === "imageQuestion" ||
                selectedImageOption === "imageBoth") && (
                <>
                  <VariantSelects
                    uzVariants={uzVariants}
                    ruVariants={ruVariants}
                  />
                  <textarea
                    cols="30"
                    rows="10"
                    placeholder="Yechim yo'li uz"
                  ></textarea>
                  <textarea
                    cols="30"
                    rows="10"
                    placeholder="Yechim yo'li ru"
                  ></textarea>
                </>
              )}
            </div>
          </>
        )}

        {isOpenChecked && (
          <div className="open">
            <div className="check2">
              <input
                type="radio"
                id="imageBoth2"
                checked={selectedImageOption2 === "imageBoth2"}
                onChange={() => setSelectedImageOption2("imageBoth2")}
              />
              <label htmlFor="imageBoth2">Rasmli savol</label>
              <input
                type="radio"
                id="noImage2"
                checked={selectedImageOption2 === "noImage2"}
                onChange={() => setSelectedImageOption2("noImage2")}
              />
              <label htmlFor="noImage2">Rasmsiz savol</label>
            </div>

            <div className="inputs">
              <input type="text" placeholder="O'zbekcha savol" required />
              <input type="text" placeholder="Ruscha savol" required />
            </div>
            {selectedImageOption2 === "imageBoth2" && (
              <input
                type="link"
                className="link"
                placeholder="Rasm link"
                required
              />
            )}
            <input
              type="text"
              className="link"
              placeholder="Javob yozish"
              required
            />
            <div className="inputs">
              <textarea
                name=""
                id=""
                cols="30"
                required
                rows="10"
                placeholder="Yechim yo'li uz"
              ></textarea>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                required
                placeholder="Yechim yo'li ru"
              ></textarea>
            </div>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Questions;
