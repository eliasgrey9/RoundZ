import React from "react";
import style from "./singleCandidate.module.css";
import arrowForward from "../../../assets/arrowForward.svg";
import { MdArrowBackIosNew } from "react-icons/md";

const SingleCandidate = ({
  selectedCandidate,
  params,
  playAnswerToQuestion,
  questions,
  displayAllCandidates,
}) => {
  console.log(selectedCandidate.name);
  return (
    <>
      <div className={style.section1}>
        <div className={style.buttonAndHeading}>
          <button onClick={displayAllCandidates} className={style.backBtn}>
            <MdArrowBackIosNew />
            Back
          </button>
          <div className={style.heading}>{selectedCandidate.name}</div>
        </div>
      </div>
      <div className={style.listContainer}>
        <div className={style.headingAndSubHeading}>
          <div className={style.heading}>
            Completed {selectedCandidate.interviewedAt}
          </div>
          <div className={style.subHeading}>{params.title}</div>
        </div>
        <div>
          {questions.map((q, i) => (
            <div className={style.questionsList} key={q.id}>
              <div
                className={
                  i % 2 ? style.questionRowColor1 : style.questionRowColor2
                }
              >
                <div>{q.question}</div>
                <div onClick={() => playAnswerToQuestion(i)}>
                  <img
                    className={style.selectQuestion}
                    src={arrowForward}
                  ></img>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleCandidate;
