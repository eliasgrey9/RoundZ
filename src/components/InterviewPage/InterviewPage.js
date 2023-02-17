import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./interviewPage.css";
import ScreenRecorder from "./ScreenRecorder";
import UploadMediaHandler from "./UploadMediaHandler";

const InterviewPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteId = queryParams.get("inviteId");
  const positionId = queryParams.get("positionId");
  const [positionData, setPositionData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [allowNextQuestion, setAllowNextQuestion] = useState(false);
  const [questionId, setQuestionId] = useState();

  useEffect(() => {
    const renderPositionData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${positionId}`
      );
      setPositionData(response.data);
      setQuestions(response.data.questions);
      setQuestionId(response.data.questions[0].id);
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

  return (
    <div>
      <div>
        {questions.length ? (
          questions[0].question
        ) : (
          <div>That's all for now!</div>
        )}
      </div>
      <ScreenRecorder
        allowNextQuestion={allowNextQuestion}
        nextQuestionBtn={nextQuestionBtn}
        submitAnswerBtn={submitAnswerBtn}
      />
      <UploadMediaHandler questionId={questionId} inviteId={inviteId} />
    </div>
  );
};

export default InterviewPage;
