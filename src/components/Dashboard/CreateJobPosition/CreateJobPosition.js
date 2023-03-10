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

  const updateTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const currentQuestionVal = (e) => {
    e.preventDefault();
    setCurrentQuestionInputValue(e.target.value);
  };

  const updateQuestionArray = (e) => {
    e.preventDefault();
    questionArray.push({ question: currentQuestionInputValue });
    setCurrentQuestionInputValue("");
    displayQuestions.push(currentQuestionInputValue);
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
        .then(() => setQuestionArray([]))
        .then(() => setDisplayQuestions([]));
      ///END API REQUEST
    } else {
      return;
    }
  };

  return (
    <div>
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

      <form onSubmit={submitForm}>
        <input
          value={title}
          onChange={updateTitle}
          placeholder="Job Position Title"
        ></input>
        <div>
          <input
            onChange={currentQuestionVal}
            placeholder="Ask a question!"
            value={currentQuestionInputValue}
          />
          <button onClick={updateQuestionArray}>+</button>
        </div>
        {displayQuestions.map((q) => {
          return <li key={Math.random() * -50}>{q}</li>;
        })}
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default CreateJobPosition;
