import { MediaChunksHandler } from "./MediaChunksHandler";
import { useEffect, useState } from "react";
export default function ScreenRecorderTest(props) {
  const { file, questionId, inviteId } = props;

  const [currentFile, setCurrentFile] = useState(null);
  const [uploader, setUploader] = useState(undefined);

  useEffect(() => {
    if (file) {
      setCurrentFile(file);
    }
  }, [file]);

  useEffect(() => {
    if (currentFile) {
      let percentage = undefined;

      const videoUploaderOptions = {
        fileName: "fileNameGoesHere",
        file: currentFile,
      };

      const uploader = new MediaChunksHandler(videoUploaderOptions);
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
  }, [currentFile]);

  console.log(inviteId);
  console.log(questionId);
  return null;
}
