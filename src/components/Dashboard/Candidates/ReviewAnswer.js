import React from "react";
import style from "./reviewAnswer.module.css";
import MediaPlayer from "./MediaPlayer";
import { MdArrowBackIosNew } from "react-icons/md";

const ReviewAnswer = ({ answer, displaySingleCandidate, onNext }) => {
  return (
    <>
      <div className={style.section1}>
        <div className={style.buttonAndHeading}>
          <button onClick={displaySingleCandidate} className={style.backBtn}>
            <MdArrowBackIosNew />
            Back
          </button>
          <div className={style.heading}>{answer.question.question}</div>
        </div>
      </div>

      <div className={style.mediaPlayerContainer}>
        <div className={style.mediaPlayer}>
          <MediaPlayer S3Url={answer.answer} />
        </div>
        <div>
          <button onClick={onNext}>Next</button>
        </div>
      </div>
    </>
  );
};

export default ReviewAnswer;
