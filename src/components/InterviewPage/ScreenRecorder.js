import React, { useRef, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import UploadMediaHandler from "./UploadMediaHandler";
import { useLocation } from "react-router-dom";

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
  return <video ref={videoRef} width={650} height={650} autoPlay controls />;
};

const ScreenRecorder = ({
  nextQuestionBtn,
  submitAnswerBtn,
  allowNextQuestion,
  fileName,
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
          <div>
            {isUploaded ? <div>File successfully uploaded!</div> : null}

            <p>{status}</p>
            <button onClick={startRecording}>startRecording</button>
            <button onClick={stopRecording}>stopRecording</button>
            {allowNextQuestion ? (
              <button onClick={nextQuestionBtn}>Next Question</button>
            ) : (
              <button onClick={submitAnswerBtn}>Submit Answer</button>
            )}
            {status === "recording" ? (
              <VideoPreview stream={previewStream} />
            ) : (
              <video
                width={650}
                height={650}
                src={mediaBlobUrl}
                autoPlay
                controls
              ></video>
            )}
          </div>
        )}
      />

      {fileName ? (
        <UploadMediaHandler file={file} fileName={currentFileName} />
      ) : null}
    </>
  );
};

export default ScreenRecorder;
