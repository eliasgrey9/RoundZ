import React from "react";
import { Link } from "react-router-dom";
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
      <div>
        <ol>
          {questionArray.map((q) => (
            <div key={q.uuid}>
            <li className={style.questions}>{q.question}</li></div>
          ))}
        </ol>
        </div>
      </div>
        <button onClick={submitForm} className={style.saveBtn}>
          Save and Publish
        </button>
    </div>
  );
};

export default SaveAndPublishForm;
