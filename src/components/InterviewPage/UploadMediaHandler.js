import { MediaChunksHandler } from "./MediaChunksHandler";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScreenRecorderTest(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteId = queryParams.get("inviteId");

  const { file, fileName, questionId } = props;
  const [uploader, setUploader] = useState(undefined);

  useEffect(() => {
    if (file) {
      let percentage = undefined;

      const videoUploaderOptions = {
        fileName: fileName,
        file: file,
      };

      const myProps = {
        questionId: questionId,
        inviteId: inviteId,
      };

      const uploader = new MediaChunksHandler(videoUploaderOptions, myProps);
      setUploader(uploader);

      uploader
        .onProgress(({ percentage: newPercentage }) => {
          // to avoid the same percentage to be logged twice
          if (newPercentage !== percentage) {
            percentage = newPercentage;
            console.log(`${percentage}%`);
          }
        })
        .onError((error) => {
          console.error(error);
        });

      uploader.start();
    }
  }, [file]);

  return null;
}
