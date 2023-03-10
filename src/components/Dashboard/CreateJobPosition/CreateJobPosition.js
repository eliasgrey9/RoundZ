import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./createJobPosition.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";

const CreateJobPosition = () => {
  const [currentQuestionInputValue, setCurrentQuestionInputValue] =
    useState("");
  const [displayQuestions, setDisplayQuestions] = useState([]);
  const [questionArray, setQuestionArray] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const SAVE_AND_PUBLISH = "SAVE_AND_PUBLISH";
  const ADD_QUESTION_FORM = "ADD_QUESTION_FORM";
  const CREATE_JOB_POSITION_FORM = "CREATE_JOB_POSITION_FORM";

  const [activeForm, setActiveForm] = useState(CREATE_JOB_POSITION_FORM);

  const showCreateJobPositionForm = () =>
    setActiveForm(CREATE_JOB_POSITION_FORM);
  const showAddQuestionForm = () => setActiveForm(ADD_QUESTION_FORM);
  const showSaveAndPublishForm = () => setActiveForm(SAVE_AND_PUBLISH);

  const isActiveFormCreateJobPosition = activeForm === CREATE_JOB_POSITION_FORM;
  const isActiveFormAddQuestion = activeForm === ADD_QUESTION_FORM;
  const isActiveFormSaveAndPublish = activeForm === SAVE_AND_PUBLISH;

  const updateTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const updateDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const currentQuestionVal = (e) => {
    e.preventDefault();
    setCurrentQuestionInputValue(e.target.value);
  };

  const updateQuestionArray = (e) => {
    e.preventDefault();
    if (currentQuestionInputValue.length) {
      questionArray.push({ question: currentQuestionInputValue });
      setCurrentQuestionInputValue("");
      displayQuestions.push(currentQuestionInputValue);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (questionArray.length > 0 && !(title === "")) {
      const result = { questions: [...questionArray], title, status: true };
      //API REQUEST///
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };

      fetch("http://localhost:8080/api/jobs/create", requestOptions)
        .then((response) => response.json())
        // .then((data) => console.log(data, "data"))
        .then(() => setTitle(""))
        .then(() => setDescription(""))
        .then(() => setQuestionArray([]))
        .then(() => setDisplayQuestions([]));
      ///END API REQUEST
    } else {
      return;
    }
  };

  return (
    <div className={style.body}>
      <Navbar />
      <div className={style.section1}>
        <div className={style.buttonAndHeading}>
          <Link to={"/dashboard"}>
            <button className={style.backToDashboardBtn}>
              <MdArrowBackIosNew />
              Dashboard
            </button>
          </Link>
          <div className={style.heading}>Create Job Position</div>
        </div>
      </div>
      <div className={style.section2}>
        {isActiveFormCreateJobPosition ? (
          <form className={style.jobForm}>
            <div className={style.cancelOrNext}>
              <Link to={"/dashboard"}>
                <div className={style.cancelLink}>Cancel</div>
              </Link>

              <button className={style.nextBtn} onClick={showAddQuestionForm}>
                Next
              </button>
            </div>
            <div className={style.inputLabel}>Title</div>
            <input
              className={style.titleInput}
              value={title}
              onChange={updateTitle}
              placeholder="Job Position Title"
            ></input>
            <div className={style.inputLabel}>Description</div>

            <div>
              <input
                className={style.descriptionInput}
                value={description}
                onChange={updateDescription}
                placeholder="Job Description"
              ></input>
            </div>
          </form>
        ) : null}

        {isActiveFormAddQuestion ? (
          <form onSubmit={updateQuestionArray}>
            <div>
              <input
                onChange={currentQuestionVal}
                placeholder="Ask a question!"
                value={currentQuestionInputValue}
              />
              <input
                className={style.addNextQuestionBtn}
                type="submit"
                value="Add Next Question"
              ></input>
            </div>
          </form>
        ) : null}

        {isActiveFormSaveAndPublish ? (
          <form onSubmit={submitForm}>
            <input type="submit"></input>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default CreateJobPosition;
