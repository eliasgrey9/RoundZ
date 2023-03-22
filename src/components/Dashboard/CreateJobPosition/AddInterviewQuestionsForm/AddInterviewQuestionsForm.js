import React from "react";
import style from "./addInterviewQuestionsForm.module.css";
import { FaPlus } from "react-icons/fa";

const AddInterviewQuestionsForm = ({
  updateQuestionArray,
  currentQuestionVal,
  currentQuestionInputValue,
  title,
  showSaveAndPublishForm,
  questionArray,
}) => {
  return (
    <div className={style.body}>
      <form className={style.form}>
        <div className={style.formHeading}>
          <div className={style.colorCircle}></div>
          <div>{title}</div>
        </div>
        <div className={style.inputLabel}>
          Question # {questionArray.length + 1}
        </div>
        <div className={style.questionAndBtn}>
          <input
            className={style.questionInput}
            onChange={currentQuestionVal}
            value={currentQuestionInputValue}
          />
          <button
            className={style.addNextQuestionBtn}
            onClick={updateQuestionArray}
          >
            <FaPlus />
          </button>
        </div>
      </form>
      <div className={style.buttonsBelowForm}>
        <button
          onClick={showSaveAndPublishForm}
          className={style.finishQuestionsBtn}
        >
          Finish Questions
        </button>
      </div>
    </div>
  );
};

export default AddInterviewQuestionsForm;
