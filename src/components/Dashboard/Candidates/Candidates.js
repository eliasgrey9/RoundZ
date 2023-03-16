import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./candidates.module.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import AllCandidates from "./AllCandidates";
import SingleCandidate from "./SingleCandidate";
import ReviewAnswer from "./ReviewAnswer";
import { current } from "@reduxjs/toolkit";

const Candidates = () => {
  const params = useParams();
  const SHOW_All_CANDIDATES = "SHOW_All_CANDIDATES";
  const SHOW_SINGLE_CANDIDATE = "SHOW_SINGLE_CANDIDATE";
  const REVIEW_ANSWER = "REVIEW_ANSWER";

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [activeTab, setActiveTab] = useState(SHOW_All_CANDIDATES);
  const [answerUrl, setAnswerUrl] = useState("");
  const [candidateAnswers, setCandidateAnswers] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(-1);

  const displayAllCandidates = () => setActiveTab(SHOW_All_CANDIDATES);
  const displaySingleCandidate = () => setActiveTab(SHOW_SINGLE_CANDIDATE);
  const displayReviewAnswer = () => setActiveTab(REVIEW_ANSWER);

  const isAllCandidatesActive = activeTab === SHOW_All_CANDIDATES;
  const isSingleCandidateActive = activeTab === SHOW_SINGLE_CANDIDATE;
  const isReviewAnswerActive = activeTab === REVIEW_ANSWER;

  useEffect(() => {
    const renderCandidates = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/renderCandidates/${params.id}`
      );
      setCandidates(response.data.candidates);
    };
    renderCandidates();
  }, [params.id]);

  const renderCandidate = async (id) => {
    displaySingleCandidate();
    const response = await axios.get(
      `http://localhost:8080/api/jobs/getCandidate/${id}`
    );
    setSelectedCandidate(response.data);
    setCandidateAnswers(response.data.answers);
  };

  const changeStatusToClosed = async () => {
    const response = await axios.put(
      `http://localhost:8080/api/jobs/changeJobStatusToClosed/${params.id}`
    );
  };

  const deletePosition = async () => {
    const response = await axios.delete(
      `http://localhost:8080/api/jobs/delete/${params.id}`
    );
  };

  const playAnswerToQuestion = (i) => {
    setCurrentQuestionIdx(i);
    displayReviewAnswer(REVIEW_ANSWER);
  };

  const questions = candidateAnswers.map((a) => a.question);
  const question = questions[currentQuestionIdx];
  const answer = candidateAnswers[currentQuestionIdx];

  return (
    <div className={style.body}>
      <Navbar />

      {isAllCandidatesActive ? (
        <AllCandidates
          candidates={candidates}
          renderCandidate={renderCandidate}
          changeStatusToClosed={changeStatusToClosed}
          deletePosition={deletePosition}
          params={params}
        />
      ) : null}

      {isSingleCandidateActive ? (
        <SingleCandidate
          selectedCandidate={selectedCandidate}
          params={params}
          playAnswerToQuestion={playAnswerToQuestion}
          questions={questions}
          displayAllCandidates={displayAllCandidates}
        />
      ) : null}
      {isReviewAnswerActive ? (
        <ReviewAnswer
          onNext={() => {
            if (questions.length - 1 === currentQuestionIdx) {
              setCurrentQuestionIdx(0);
            } else {
              setCurrentQuestionIdx(currentQuestionIdx + 1);
            }
          }}
          answer={answer}
          params={params}
          displaySingleCandidate={displaySingleCandidate}
        />
      ) : null}
    </div>
  );
};

export default Candidates;
