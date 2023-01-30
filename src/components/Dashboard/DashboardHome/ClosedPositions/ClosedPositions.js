import React, { useState, useEffect } from "react";
import axios from "axios";
import "./closedPositions.css";

const ClosedPositions = () => {
  const [dataFromApi, setDataFromApi] = useState([]);

  const deletePosition = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/jobs/delete/${id}`
    );
    setDataFromApi(dataFromApi.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const renderClosedJobs = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/jobs/findAllClosedJobs"
      );
      setDataFromApi(response.data);
    };
    renderClosedJobs();
  }, []);

  const changeStatusToOpen = (id) => {
    axios.put(`http://localhost:8080/api/jobs/changeJobStatusToOpen/${id}`);
    setDataFromApi(dataFromApi.filter((item) => item.id !== id));
  };

  return (
    <div className="closedPositionsBody">
      <div>Closed</div>

      <div>
        {dataFromApi.map((data) => (
          <div className="positionCard" key={data.id}>
            <div>
              <div>{data.title}</div>
              <div>{data.invitations} Invites</div>
            </div>

            <div>
              <button onClick={() => deletePosition(data.id)}>
                Delete Position
              </button>
              <button onClick={() => changeStatusToOpen(data.id)}>
                Re-open Position
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosedPositions;
