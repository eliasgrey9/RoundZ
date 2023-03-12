import React from "react";
import style from "./addInterviewQuestionsForm.module.css";

const AddInterviewQuestionsForm = ({
  updateQuestionArray,
  currentQuestionVal,
  currentQuestionInputValue,
  title,
  showSaveAndPublishForm,
}) => {
  return (
    <div className={style.body}>
      <form className={style.addQuestionsForm}>
        <div className={style.formHeading}>
          <div className={style.colorCircle}></div>
          <div>{title}</div>
        </div>
        <div className={style.inputLabel}>Add Question:</div>
        <div>
          <input
            className={style.questionInput}
            onChange={currentQuestionVal}
            value={currentQuestionInputValue}
          />
        </div>
      </form>
      <div className={style.buttonsBelowForm}>
        <button
          className={style.addNextQuestionBtn}
          onClick={updateQuestionArray}
        >
          Add Question
        </button>

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
