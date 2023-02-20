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
  const [questions, setQuestions] = useState([{ test: "test" }]);
  const [allowNextQuestion, setAllowNextQuestion] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const renderPositionData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${positionId}`
      );
      setPositionData(response.data);
      setQuestions(response.data.questions);
    };

    renderPositionData();
  }, [positionId, inviteId]);

  useEffect(() => {
    if (questions.length > 0) {
      const stringAndConcatQuestionIdAndInviteId =
        JSON.stringify(questions[0].id) + inviteId;

      setFileName(stringAndConcatQuestionIdAndInviteId);
    }
  }, [questions]);

  const nextQuestionBtn = () => {
    setQuestions(questions.slice(1));
    setAllowNextQuestion(false);
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
        fileName={fileName}
      />
    </div>
  );
};

export default InterviewPage;
