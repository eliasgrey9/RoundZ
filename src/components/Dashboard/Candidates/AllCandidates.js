import React from "react";
import style from "./allCandidates.module.css";
import arrowForward from "../../../assets/arrowForward.svg";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

const AllCandidates = ({
  candidates,
  renderCandidate,
  changeStatusToClosed,
  deletePosition,
  params,
}) => {

  return (
    <div>
      <div className={style.buttonAndHeading}>
        <Link to={`/dashboard/${params.userId}`}>
          <button className={style.backToDashboardBtn}>
            <MdArrowBackIosNew />
            Dashboard
          </button>
        </Link>
        <div className={style.heading}>{params.title}</div>
      </div>

      <div className={style.candidatesList}>
        {candidates.map((candidate, i) => (
          <div
            className={i % 2 ? style.rowColor1 : style.rowColor2}
            key={candidate.id}
          >
            <div className={i % 2 ? style.rowColor1 : style.rowColor2}>
              <div className={style.name}>{candidate.name}</div>
            </div>
            <div className={i % 2 ? style.rowColor1 : style.rowColor2}>
              {candidate.status ? (
                <div className={style.status}>Completed</div>
              ) : (
                <div className={style.status}>Incomplete</div>
              )}
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
              {candidate.status ? (
                <img
                  className={
                    (i % 2 ? style.rowColor1 : style.rowColor2,
                    style.selectCandidate)
                  }
                  src={arrowForward}
                ></img>
              ) : (
                <div
                  className={
                    (i % 2 ? style.rowColor1 : style.rowColor2,
                    style.selectCandidate)
                  }
                >
                  <BsClockHistory className={style.pendingClock} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div className={style.closeAndDeleteBtns}>
          <Link to={`/dashboard/${params.userId}`}>
            <button onClick={changeStatusToClosed} className={style.closeBtn}>
              Close Position
            </button>
          </Link>

          <Link to={`/dashboard/${params.userId}`}>
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
