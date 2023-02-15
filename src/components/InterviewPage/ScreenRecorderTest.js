import { Uploader } from "./UploaderPiece";
import { useEffect, useState } from "react";

export default function App() {
  const [file, setFile] = useState(undefined);
  const [uploader, setUploader] = useState(undefined);

  useEffect(() => {
    if (file) {
      let percentage = undefined;

      const videoUploaderOptions = {
        fileName: "foo",
        file: file,
      };
      const uploader = new Uploader(videoUploaderOptions);
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
          setFile(undefined);
          console.error(error);
        });

      uploader.start();
    }
  }, [file]);

  const onCancel = () => {
    if (uploader) {
      uploader.abort();
      setFile(undefined);
    }
  };

  return (
    <div className="App">
      <h1>Upload your file</h1>
      <div>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target?.files?.[0]);
          }}
        />
      </div>
      <div>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
