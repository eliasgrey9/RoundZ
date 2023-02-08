import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./interviewPage.css";
import ScreenRecorder from "./ScreenRecorder";

const InterviewPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteId = queryParams.get("inviteId");
  const positionId = queryParams.get("positionId");
  const [positionData, setPositionData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [allowNextQuestion, setAllowNextQuestion] = useState(false);

  useEffect(() => {
    const renderPositionData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${positionId}`
      );
      setPositionData(response.data);
      setQuestions(response.data.questions);
    };
    renderPositionData();
  }, [positionId]);

  const nextQuestionBtn = () => {
    setAllowNextQuestion(false);
    setQuestions(questions.slice(1));
  };

  const submitAnswerBtn = () => {
    setAllowNextQuestion(true);
  };

  console.log("allowNextQuestion", allowNextQuestion);
  console.log("questions", questions);

  return (
    <div>
      <h3>
        {questions.length ? (
          questions[0].question
        ) : (
          <h3>That's all for now!</h3>
        )}
      </h3>
      <ScreenRecorder
        allowNextQuestion={allowNextQuestion}
        nextQuestionBtn={nextQuestionBtn}
        submitAnswerBtn={submitAnswerBtn}
      />
    </div>
  );
};

export default InterviewPage;
