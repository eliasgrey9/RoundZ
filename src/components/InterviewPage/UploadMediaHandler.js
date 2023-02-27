import { MediaChunksHandler } from "./MediaChunksHandler";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ScreenRecorderTest(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteId = queryParams.get("inviteId");

  const { file, fileName, questionId, positionId } = props;
  const [uploader, setUploader] = useState(undefined);
  const [candidateId, setCandidateId] = useState(0);

  useEffect(() => {
    const renderCandidate = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/getCandidateId/${inviteId}`
      );
      response.data.map((c) => {
        setCandidateId(c.id);
      });
    };
    renderCandidate();
  }, [inviteId]);

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
        candidateId: candidateId,
        positionId: positionId,
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
