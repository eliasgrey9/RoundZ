import React from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import S3FileUpload from "react-s3/lib/ReactS3";

const MediaPlayer = (S3Url) => {
  useReactMediaRecorder({ video: true });

  return (
    <div>
      <video src={S3Url} controls autoPlay loop />
    </div>
  );
};

export default MediaPlayer;
