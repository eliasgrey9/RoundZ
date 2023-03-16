import React from "react";
import style from "./allCandidates.module.css";
import arrowForward from "../../../assets/arrowForward.svg";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const AllCandidates = ({
  candidates,
  renderCandidate,
  changeStatusToClosed,
  deletePosition,
  params,
}) => {
  return (
    <div>
      <div className={style.section1}>
        <div className={style.buttonAndHeading}>
          <Link to={"/dashboard"}>
            <button className={style.backToDashboardBtn}>
              <MdArrowBackIosNew />
              Dashboard
            </button>
          </Link>
          <div className={style.heading}>{params.title}</div>
        </div>
      </div>

      <div className={style.candidatesList}>
        {candidates.map((candidate, i) => (
          <div
            className={i % 2 ? style.rowColor1 : style.rowColor2}
            key={candidate.id}
          >
            <div className={i % 2 ? style.rowColor1 : style.rowColor2}>
              {candidate.name}
            </div>
            <div className={i % 2 ? style.rowColor1 : style.rowColor2}>
              {candidate.status ? <div>Completed</div> : <div>Incomplete</div>}
            </div>
            <div className={i % 2 ? style.rowColor1 : style.rowColor2}>
              {candidate.interviewedAt === null ? (
                <div>N/A</div>
              ) : (
                <div>{candidate.interviewedAt}</div>
              )}
            </div>

            <div
              className={
                (i % 2 ? style.rowColor1 : style.rowColor2,
                style.selectCandidate)
              }
              onClick={() => {
                if (candidate.status) {
                  renderCandidate(candidate.id);
                } else {
                  console.log("They haven't finished their interview!");
                }
              }}
            >
              <img
                className={
                  (i % 2 ? style.rowColor1 : style.rowColor2,
                  style.selectCandidate)
                }
                src={arrowForward}
              ></img>
            </div>
          </div>
        ))}
        <div className={style.closeAndDeleteBtns}>
          <Link to={"/dashboard"}>
            <button onClick={changeStatusToClosed} className={style.closeBtn}>
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
    </div>
  );
};

export default AllCandidates;
