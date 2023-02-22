import React, { useState, useEffect } from "react";
import axios from "axios";

const Candidates = ({ positionId, showToEvaluate, setShowToEvaluate }) => {
  const [candidates, setCandidates] = useState([]);
  const [showSingleCandidate, seShowSingleCandidate] = useState(false);
  const [showAllCandidates, setShowAllCandidates] = useState(true);
  const [currentCandidateId, setCurrentCandidateId] = useState(0);

  useEffect(() => {
    setShowAllCandidates(true);
  }, []);

  useEffect(() => {
    const renderCandidates = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/renderCandidates/${positionId}`
      );
      setCandidates(response.data.candidates);
    };
    renderCandidates();
  }, [positionId]);

  const renderCandidate = (id) => {
    setShowToEvaluate(false);
    console.log("This is the candidate ID we will use to grab their info", id);
  };

  return (
    <>
      {showToEvaluate ? (
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

      {showSingleCandidate ? (
        <>
          <h2>Single Candidates</h2>
        </>
      ) : null}
    </>
  );
};

export default Candidates;
