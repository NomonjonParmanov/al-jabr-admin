import React from "react";

const Topics = () => {
  return (
    <section className="topics">
      <form action="">
        <h1>Create topics</h1>
        <select name="chapter" id="chapter">
          <option value="chapter">Chapterni tanlang</option>
        </select>{" "}
        <select name="class" id="class">
          <option value="class">Sinfni tanlang</option>
        </select>
        <div className="topics__language">
          <div className="topics__uz">
            <input type="text" required placeholder="topics name uz" />
            <input type="text" required placeholder="topics title uz" />
          </div>{" "}
          <div className="topics__ru">
            <input type="text" required placeholder="topics name ru" />
            <input type="text" required placeholder="topics title ru" />
          </div>
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default Topics;
