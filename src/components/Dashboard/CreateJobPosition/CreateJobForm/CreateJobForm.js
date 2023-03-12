import React from "react";
import style from "./createJobForm.module.css";
import { Link } from "react-router-dom";
const CreateJobForm = ({
  showAddQuestionForm,
  title,
  description,
  updateDescription,
  updateTitle,
}) => {
  return (
    <div>
      <form className={style.form}>
        <div className={style.cancelOrNext}>
          <Link to={"/dashboard"}>
            <div className={style.cancelLink}>Cancel</div>
          </Link>

          <button className={style.nextBtn} onClick={showAddQuestionForm}>
            Next
          </button>
        </div>
        <div className={style.inputLabel}>Job Title</div>
        <input
          className={style.titleInput}
          value={title}
          onChange={updateTitle}
        ></input>
        <div className={style.inputLabel}>Description</div>

        <div>
          <textarea
            className={style.descriptionInput}
            value={description}
            onChange={updateDescription}
            placeholder="Write a summary and any details the candidates should know of the job position here."
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
