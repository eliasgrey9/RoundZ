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

  useEffect(() => {
    const renderPositionData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/getAllQuestionsFromPosition/${positionId}`
      );
      setPositionData(response.data);
    };
    renderPositionData();
  }, [positionId]);

  return (
    <div>
      <ScreenRecorder />
      {/* <div>
        {positionData.questions &&
          positionData.questions.map((q) => (
            <div key={q.id}>
              <form>
                <div>{q.question}</div>
              </form>
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default InterviewPage;
