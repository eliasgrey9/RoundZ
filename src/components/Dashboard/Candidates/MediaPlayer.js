import React, { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const MediaPlayer = ({ S3Url }) => {
  useReactMediaRecorder({ video: true });
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(S3Url);
  }, [S3Url]);
  console.log(url);
  return (
    <div>
      <video src={url} controls autoPlay loop />
    </div>
  );
};

export default MediaPlayer;
