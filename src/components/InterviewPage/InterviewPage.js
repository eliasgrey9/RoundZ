import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ScreenRecorder from "./ScreenRecorder";
import UploadMediaHandler from "./UploadMediaHandler";
import Navbar from "./Navbar/Navbar";
import style from "./interviewPage.module.css";
import Confetti from "react-confetti";

const InterviewPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteId = queryParams.get("inviteId");
  const positionId = queryParams.get("positionId");
  const [positionData, setPositionData] = useState({});
  const [questions, setQuestions] = useState([{ placeholder: "placeholder" }]);
  const [allowNextQuestion, setAllowNextQuestion] = useState(false);
  const [fileName, setFileName] = useState("");
  const [questionId, setQuestionId] = useState(0);
  const [candidateId, setCandiateId] = useState(0);

  useEffect(() => {
    const renderPositionData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${positionId}`
      );
      setPositionData(response.data);
      setQuestions(response.data.questions);
    };
    const getCandidateId = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/getCandidateId/${inviteId}`
      );
      setCandiateId(response.data[0].id);
    };

    getCandidateId();
    renderPositionData();
  }, [positionId, inviteId]);

  useEffect(() => {
    if (questions.length > 0) {
      setQuestionId(questions[0].id);

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
  const updateCandidateInterviewStatus = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/jobs/updateCandidateInterviewStatus/${candidateId}`
    );
    console.log("RESPONSE", response);
  };
  //   Activates a request to update the candidate to complete status along with current time
  if (!questions.length) {
    updateCandidateInterviewStatus();
  }

  return (
<div>
      <Navbar />
      <div className={style.questionSection}>
        {questions.length ? (
          <div className={style.questionHeading}>{questions[0].question}</div>
        ) : (
          <>
            <Confetti recycle={false} />
            <div className={style.congratulations}>Congratulations!</div>
          </>
        )}
      </div>
      {questions.length ? (
        <div className={style.recorderContainer}>
          <ScreenRecorder
            className={style.recorder}
            allowNextQuestion={allowNextQuestion}
            nextQuestionBtn={nextQuestionBtn}
            submitAnswerBtn={submitAnswerBtn}
            fileName={fileName}
            inviteId={inviteId}
            questionId={questionId}
            positionId={positionId}
          />

          <UploadMediaHandler questionId={questionId} positionId={positionId} />
        </div>
      ) : (
        <>
          <div className={style.endOfInterviewMessage}>
            Your interview has been submitted!
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewPage;
