import React from "react";
import "./singlePositionView.css";
import { useParams } from "react-router-dom";
import Candidates from "./Candidates";

const SinglePositionView = () => {
  const params = useParams();

  return (
    <div className="singlePositionBody">
      <div></div>

      <>
        <Candidates positionId={params.id} />
      </>
    </div>
  );
};

export default SinglePositionView;
