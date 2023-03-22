import React, { useRef, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import UploadMediaHandler from "./UploadMediaHandler";
import { useLocation } from "react-router-dom";
import style from "./interviewPage.module.css";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";

window.Buffer = window.Buffer || require("buffer").Buffer;

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video className={style.recorder} ref={videoRef} autoPlay controls />;
};

const ScreenRecorder = ({
  nextQuestionBtn,
  submitAnswerBtn,
  allowNextQuestion,
  fileName,
  questionId,
  positionId = { positionId },
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteId = queryParams.get("inviteId");
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState();
  const [currentFileName, setCurrentFileName] = useState();

  useEffect(() => {
    setCurrentFileName(fileName);
  }, [fileName]);

  const handleUpload = async (blob) => {
    const response = await fetch(blob);
    let myBlobData = await response.blob();

    const myfile = new File([myBlobData], "webm");
    setFile(myfile);
  };

  return (
    <>
      <ReactMediaRecorder
        onStop={handleUpload}
        video
        render={({
          previewStream,
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
        }) => (
          <div className={style.screenAndControls}>
            {isUploaded ? <div>File successfully uploaded!</div> : null}
            <div className={style.controls}>
              <div className={style.stopAndRecordBtns}>
                <button className={style.recordBtn} onClick={startRecording}>
                  <BsFillCameraReelsFill />
                </button>
                <button className={style.stopBtn} onClick={stopRecording}>
                  <FaStop />
                </button>
              </div>
              <div className={style.nextSubmitBtn}>
                {allowNextQuestion ? (
                  <button
                    className={style.nextSubmitBtn}
                    onClick={nextQuestionBtn}
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    className={style.nextSubmitBtn}
                    onClick={submitAnswerBtn}
                  >
                    Submit Answer
                  </button>
                )}
              </div>
            </div>

            <div>
              {status === "recording" ? (
                <VideoPreview stream={previewStream} />
              ) : (
                <video
                  className={style.recorder}
                  src={mediaBlobUrl}
                  autoPlay
                  controls
                ></video>
              )}
            </div>
          </div>
        )}
      />

      {fileName && questionId ? (
        <UploadMediaHandler
          file={file}
          fileName={currentFileName}
          questionId={questionId}
          positionId={positionId}
        />
      ) : null}
    </>
  );
};

export default ScreenRecorder;
