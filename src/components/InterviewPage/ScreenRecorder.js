import React, { useRef, useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import S3FileUpload from "react-s3/lib/ReactS3";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

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

  const bucket = {
    bucketName: S3_BUCKET,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  };

  const handleUpload = async (blob) => {
    const extension = ".webm";

    const file = new File([blob], "InterviewSubmission", {
      type: "video/webm",
      path: "videos",
    });

    await uploadFilesToS3(extension, "videos", file, "InterviewSubmission");
  };

  const uploadFilesToS3 = async (extension, path, file, fileName) => {
    const params = {
      body: file,
      type: "video/webm",
      key: path + "/" + fileName + extension,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    await S3FileUpload.uploadFile(params, bucket).then((data) => {
      console.log("data", data);
    });
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
      <div></div>
    </>
  );
};

export default ScreenRecorder;
