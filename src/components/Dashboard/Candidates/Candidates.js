import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaPlayer from "./MediaPlayer";
import { useParams } from "react-router-dom";
import style from "./candidates.module.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import arrowForward from "../../../assets/arrowForward.svg";

const Candidates = () => {
  const params = useParams();
  const SHOW_All_CANDIDATES = "SHOW_All_CANDIDATES";
  const SHOW_SINGLE_CANDIDATE = "SHOW_SINGLE_CANDIDATE";

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [activeTab, setActiveTab] = useState(SHOW_All_CANDIDATES);
  const [questions, setQuestions] = useState([]);
  const [mediaPlayerUrl, setMediaPlayerUrl] = useState("");
  const [candidateAnswers, setCandidateAnswers] = useState([]);

  const displayAllCandidates = () => setActiveTab(SHOW_All_CANDIDATES);
  const displaySingleCandidate = () => setActiveTab(SHOW_SINGLE_CANDIDATE);

  const isAllCandidatesActive = activeTab === SHOW_All_CANDIDATES;
  const isSingleCandidateActive = activeTab === SHOW_SINGLE_CANDIDATE;

  useEffect(() => {
    const renderCandidates = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/renderCandidates/${params.id}`
      );
      setCandidates(response.data.candidates);

      const positionQuestions = await axios.get(
        `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${params.id}`
      );
      setQuestions(positionQuestions.data.questions);
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

    response.data.answers.forEach((a) => {
      if (a.questionId === questions[0].id) {
        setMediaPlayerUrl(a.answer);
      }
    });

    const positionQuestions = await axios.get(
      `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${params.id}`
    );
    setQuestions(positionQuestions.data.questions);
  };

  useEffect(() => {
    candidateAnswers.forEach((a) => {
      if (a.questionId === questions[0].id) {
        setMediaPlayerUrl(a.answer);
      }
    });
  }, [questions]);

  const changeQuestion = () => {
    const tempArr = [...questions];
    const firstElement = tempArr.shift();
    tempArr.push(firstElement);

    setQuestions(tempArr);
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

          {isAllCandidatesActive ? (
            <div className={style.heading}>{params.title}</div>
          ) : (
            <div className={style.heading}>{selectedCandidate.name}</div>
          )}
        </div>
      </div>
      {isAllCandidatesActive ? (
        <>
          <div className={style.candidatesList}>
            {candidates.map((candidate, i) => (
              <div
                className={i % 2 ? style.columnColor1 : style.columnColor2}
                key={candidate.id}
              >
                <div
                  className={i % 2 ? style.columnColor1 : style.columnColor2}
                >
                  {candidate.name}
                </div>
                <div
                  className={i % 2 ? style.columnColor1 : style.columnColor2}
                >
                  {candidate.status ? (
                    <div>Completed</div>
                  ) : (
                    <div>Incomplete</div>
                  )}
                </div>
                <div
                  className={i % 2 ? style.columnColor1 : style.columnColor2}
                >
                  {candidate.interviewedAt === null ? (
                    <div>N/A</div>
                  ) : (
                    <div>{candidate.interviewedAt}</div>
                  )}
                </div>

                <div
                  className={
                    (i % 2 ? style.columnColor1 : style.columnColor2,
                    style.selectCandidate)
                  }
                  onClick={() => {
                    renderCandidate(candidate.id);
                  }}
                >
                  <img
                    className={
                      (i % 2 ? style.columnColor1 : style.columnColor2,
                      style.selectCandidate)
                    }
                    src={arrowForward}
                  ></img>
                </div>
              </div>
            ))}
            <div className={style.closeAndDeleteBtns}>
              <Link to={"/dashboard"}>
                <button
                  onClick={changeStatusToClosed}
                  className={style.closeBtn}
                >
                  Close Position
                </button>
              </Link>

              <Link to={"/dashboard"}>
                <button onClick={deletePosition} className={style.deleteBtn}>
                  Delete Position
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : null}

      {isSingleCandidateActive ? (
        <>
          <h2>Candidate {selectedCandidate.name}</h2>
          <h3>{questions[0].question}</h3>
          <button onClick={changeQuestion}>Next question</button>

          <MediaPlayer S3Url={mediaPlayerUrl} />
        </>
      ) : null}
    </div>
  );
};

export default Candidates;
