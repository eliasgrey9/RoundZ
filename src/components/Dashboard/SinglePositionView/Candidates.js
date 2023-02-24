import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaPlayer from "./MediaPlayer";

const Candidates = ({ positionId, boolClicker }) => {
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
    displayAllCandidates();
  }, [boolClicker]);

  useEffect(() => {
    const renderCandidates = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/renderCandidates/${positionId}`
      );
      setCandidates(response.data.candidates);

      const positionQuestions = await axios.get(
        `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${positionId}`
      );
      setQuestions(positionQuestions.data.questions);
    };
    renderCandidates();
  }, [positionId]);

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
      `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${positionId}`
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

  console.log("selectedCandidate", selectedCandidate);

  return (
    <>
      {isAllCandidatesActive ? (
        <>
          <h2>All Candidates</h2>
          <div>
            {candidates.map((candidate) => (
              <div key={candidate.id}>
                <button
                  onClick={() => {
                    renderCandidate(candidate.id);
                  }}
                >
                  {candidate.name}
                </button>
              </div>
            ))}
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
    </>
  );
};

export default Candidates;
