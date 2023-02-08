import React, { useRef, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";



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
  return (
    <>
      <ReactMediaRecorder
        video
        render={({
          previewStream,
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
        }) => (
          <div>
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
      <div></div>
    </>
  );
};

export default ScreenRecorder;
