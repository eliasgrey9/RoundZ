import React from "react";
import style from "./saveAndPublishForm.module.css";

const SaveAndPublishForm = ({
  submitForm,
  title,
  description,
  questionArray,
}) => {
  return (
    <div className={style.body}>
      <div className={style.summary}>
        <div className={style.title}>{title}</div>
        <div className={style.description}>{description}</div>
        <div className={style.title}>Interview Questions</div>

        <ol>
          {questionArray.map((q) => (
            <li className={style.questions}>{q.question}</li>
          ))}
        </ol>
      </div>

      <button onClick={submitForm} className={style.saveBtn}>
        Save and Publish
      </button>
    </div>
  );
};

export default SaveAndPublishForm;
