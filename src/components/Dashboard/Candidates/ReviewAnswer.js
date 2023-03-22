import React from "react";
import style from "./reviewAnswer.module.css";
import MediaPlayer from "./MediaPlayer";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const ReviewAnswer = ({ answer, displaySingleCandidate, onNext }) => {
  return (
    <>
      <div className={style.buttonAndHeading}>
        <button onClick={displaySingleCandidate} className={style.backBtn}>
          <MdArrowBackIosNew />
          Back
        </button>
        <div className={style.heading}>{answer.question.question}</div>
      </div>

      <div className={style.mediaPlayerContainer}>
        <div className={style.mediaPlayer}>
          <MediaPlayer className={style.mediaPlayer} S3Url={answer.answer} />
        </div>
        <div className={style.btnContainer}>
          <button className={style.nextBtn} onClick={onNext}>
            Next
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewAnswer;
