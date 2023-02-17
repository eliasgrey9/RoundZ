import React, { useRef, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import ScreenRecorderTest from "./UploadMediaHandler";
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
}) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState();
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

      {file ? <ScreenRecorderTest file={file} /> : null}
    </>
  );
};

export default ScreenRecorder;
