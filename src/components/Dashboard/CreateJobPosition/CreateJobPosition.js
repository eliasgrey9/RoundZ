import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./createJobPosition.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import AddInterviewQuestionsForm from "./AddInterviewQuestionsForm/AddInterviewQuestionsForm";
import CreateJobForm from "./CreateJobForm/CreateJobForm";
import SaveAndPublishForm from "./SaveAndPublishForm/SaveAndPublishForm";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const CreateJobPosition = () => {
  const navigate = useNavigate();

  const [currentQuestionInputValue, setCurrentQuestionInputValue] =
    useState("");
  const [displayQuestions, setDisplayQuestions] = useState([]);
  const [questionArray, setQuestionArray] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liquidHeading, setLiquidHeading] = useState("");
  const { userId } = useParams();


  const SAVE_AND_PUBLISH = "SAVE_AND_PUBLISH";
  const ADD_QUESTION_FORM = "ADD_QUESTION_FORM";
  const CREATE_JOB_POSITION_FORM = "CREATE_JOB_POSITION_FORM";

  const [activeForm, setActiveForm] = useState(CREATE_JOB_POSITION_FORM);

  const showCreateJobPositionForm = () =>
    setActiveForm(CREATE_JOB_POSITION_FORM);

  const showAddQuestionForm = () => {
    if (title && description) {
      setActiveForm(ADD_QUESTION_FORM);
    }
  };

  const showSaveAndPublishForm = () => {
    if (questionArray.length) {
      setActiveForm(SAVE_AND_PUBLISH);
    }
  };

  const isActiveFormCreateJobPosition = activeForm === CREATE_JOB_POSITION_FORM;
  const isActiveFormAddQuestion = activeForm === ADD_QUESTION_FORM;
  const isActiveFormSaveAndPublish = activeForm === SAVE_AND_PUBLISH;

  useEffect(() => {
    if (isActiveFormAddQuestion) {
      setLiquidHeading("Add Interview Questions");
    }
    if (isActiveFormCreateJobPosition) {
      setLiquidHeading("Create Job Position");
    }
    if (isActiveFormSaveAndPublish) {
      setLiquidHeading("Publish Job Position");
    }
  }, [activeForm]);

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
      questionArray.push({ question: currentQuestionInputValue, uuid: uuidv4() });
      setCurrentQuestionInputValue("");
      displayQuestions.push(currentQuestionInputValue);
    }
  };



  const submitForm = async (e) => {
    e.preventDefault();

    
    if (questionArray.length > 0 && !(title === "")) {
      const result = { questions: [...questionArray], title, status: true, userId:userId };


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
        .then(() => setDisplayQuestions([]))
        .then(()=> navigate(`/dashboard/${userId}`));
      ///END API REQUEST
    } else {
      <div>Form not submitted</div>;
      return;
    }
  };

  return (
    <div className={style.body}>
      <Navbar userId={userId} />
        <div className={style.buttonAndHeading}>
          <Link to={`/dashboard/${userId}`}>
            <button className={style.backToDashboardBtn}>
              <MdArrowBackIosNew />
              Dashboard
            </button>
          </Link>

          <div className={style.heading}>{liquidHeading}</div>
        </div>
      <div className={style.section2}>
        {isActiveFormCreateJobPosition ? (
          <CreateJobForm
            updateDescription={updateDescription}
            updateTitle={updateTitle}
            showAddQuestionForm={showAddQuestionForm}
            title={title}
            description={description}
          />
        ) : null}

        {isActiveFormAddQuestion ? (
          <AddInterviewQuestionsForm
            title={title}
            updateQuestionArray={updateQuestionArray}
            currentQuestionVal={currentQuestionVal}
            currentQuestionInputValue={currentQuestionInputValue}
            showSaveAndPublishForm={showSaveAndPublishForm}
            questionArray={questionArray}
          />
        ) : null}

        {isActiveFormSaveAndPublish ? (
          <SaveAndPublishForm
            submitForm={submitForm}
            title={title}
            description={description}
            questionArray={questionArray}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CreateJobPosition;
