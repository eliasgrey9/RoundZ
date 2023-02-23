import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaPlayer from "./MediaPlayer";

const Candidates = ({ positionId, boolClicker }) => {
  const SHOW_All_CANDIDATES = "SHOW_All_CANDIDATES";
  const SHOW_SINGLE_CANDIDATE = "SHOW_SINGLE_CANDIDATE";

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [activeTab, setActiveTab] = useState(SHOW_All_CANDIDATES);

  const displayAllCandidates = () => setActiveTab(SHOW_All_CANDIDATES);
  const displaySingleCandidate = () => setActiveTab(SHOW_SINGLE_CANDIDATE);

  const isAllCandidatesActive = activeTab === SHOW_All_CANDIDATES;
  const isSinlgeCandidateActive = activeTab === SHOW_SINGLE_CANDIDATE;

  useEffect(() => {
    displayAllCandidates();
  }, [boolClicker]);

  useEffect(() => {
    const renderCandidates = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/renderCandidates/${positionId}`
      );
      setCandidates(response.data.candidates);
    };
    renderCandidates();
  }, [positionId]);

  const renderCandidate = async (id) => {
    displaySingleCandidate();
    const response = await axios.get(
      `http://localhost:8080/api/jobs/getCandidate/${id}`
    );
    setSelectedCandidate(response.data);
  };

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

      {isSinlgeCandidateActive ? (
        <>
          <h2>{selectedCandidate.name}</h2>
          <MediaPlayer />
        </>
      ) : null}
    </>
  );
};

export default Candidates;
