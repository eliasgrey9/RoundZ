import React from "react";
import { useParams, useLocation } from "react-router-dom";

import "./interviewPage.css";

const InterviewPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteId = queryParams.get("inviteId");
  const positionId = queryParams.get("positionId");

  console.log("positionId", positionId);
  console.log("inviteId", inviteId);

  return <div>INTERVIEW PAGE</div>;
};

export default InterviewPage;
