import React, { useState, useEffect } from "react";
import axios from "axios";
import "./activePositions.css";
import { NavLink } from "react-router-dom";

const ActivePositions = () => {
  const [dataFromApi, setDataFromApi] = useState([]);
  useEffect(() => {
    const renderActiveJobs = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/jobs/findAllActiveJobs"
      );
      setDataFromApi(response.data);
    };
    renderActiveJobs();
  }, []);

  const changeStatusToClosed = (id) => {
    axios.put(`http://localhost:8080/api/jobs/changeJobStatusToClosed/${id}`);
    setDataFromApi(dataFromApi.filter((item) => item.id !== id));
  };

  return (
    <div className="activePositionsBody">
      <div>Active</div>

      <div>
        {dataFromApi.map((data) => (
          <div className="positionCard" key={data.id}>
            <div>
              <div>{data.title}</div>
              <div>{data.invitations} Invites</div>
            </div>

            <div>
              <button
                onClick={() => {
                  changeStatusToClosed(data.id);
                }}
              >
                Close Position
              </button>
              <NavLink
                to={`/dashboard/position/${data.id}`}
                className="dashboardSinglePosition"
              >
                <button>Go to position</button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivePositions;
