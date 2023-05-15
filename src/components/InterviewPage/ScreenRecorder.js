import React, { useRef, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import UploadMediaHandler from "./UploadMediaHandler";
import { useLocation } from "react-router-dom";
import style from "./interviewPage.module.css";

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
  submitAnswerBtn,
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
  const [recordBtnState, setRecordBtnState] = useState('Record');
  const [showStopBtn, setShowStopBtn] = useState(true)

  useEffect(() => {
    setCurrentFileName(fileName);
  }, [fileName]);

  const handleUpload = async (blob) => {
    const response = await fetch(blob);
    let myBlobData = await response.blob();

    const myfile = new File([myBlobData], "webm");
    setFile(myfile);
    setRecordBtnState('Retake')
    setShowStopBtn(false)

  };

  const showStopBtnOnStart = () =>  {
setShowStopBtn(true)
  }

  const submittingAnAnswer = () => {
    submitAnswerBtn()
    setRecordBtnState('Record')

  }

  return (
    <>
      <ReactMediaRecorder
        onStop={handleUpload}
        onStart={showStopBtnOnStart}
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
                  {recordBtnState}
                </button>

                {showStopBtn ?  <button className={style.stopBtn} onClick={stopRecording}>
                Stop recording
                </button>: <button
                    className={style.submitBtn}
                    onClick={submittingAnAnswer}
                  >
                    Submit Answer
                  </button>}

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
