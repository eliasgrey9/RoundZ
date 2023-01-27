import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [openPositionCreator, setOpenPositionCreator] = useState(true);
  const [currentQuestionInputValue, setCurrentQuestionInputValue] =
    useState("");
  const [questionArray, setQuestionArray] = useState([]);
  const [title, setTitle] = useState("");

  const openPositionCreatorBtn = () => {
    setOpenPositionCreator(false);
  };

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
  };

  const submitForm = (e) => {
    e.preventDefault();
    const result = { questions: [...questionArray], title, status: true };
    console.log(result);
    setTitle("");
  };

  return (
    <div className="dashboardBody">
      {openPositionCreator ? (
        <>
          <div className="section1">
            <div>Status</div>
            <div>
              <button>Active</button>
              <button>Closed</button>
            </div>
          </div>
          <div className="section2">
            New<button onClick={openPositionCreatorBtn}>+</button>
          </div>
        </>
      ) : (
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
            ></input>
            <button onClick={updateQuestionArray}>+</button>
          </div>

          {questionArray.map((q) => {
            <p>{q}</p>;
          })}

          <input type="submit"></input>
        </form>
      )}
    </div>
  );
};
export default Dashboard;
