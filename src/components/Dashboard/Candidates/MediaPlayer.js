import React, { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import style from "./reviewAnswer.module.css";

const MediaPlayer = ({ S3Url }) => {
  useReactMediaRecorder({ video: true });
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(S3Url);
  }, [S3Url]);
  console.log(url);
  return (
    <div>
      <video className={style.mediaPlayer} src={url} controls autoPlay />
    </div>
  );
};

export default MediaPlayer;
