import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./closedPositions.module.css";
import { BsTrash3 } from "react-icons/bs";

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
    <div className={style.body}>
      <div className={style.allCards}>
        {dataFromApi.map((data) => (
          <div className={style.positionCard} key={data.id}>
            <div className={style.leftSideOfCard}>
              <div className={style.cardTitle}>{data.title}</div>
              <div className={style.invites}>{data.invitations} Invites</div>
            </div>

            <div className={style.rightSideOfCard}>
              <BsTrash3
                className={style.trashCan}
                onClick={() => deletePosition(data.id)}
                Delete
                Position
              />
              <button
                className={style.reActivateBtn}
                onClick={() => changeStatusToOpen(data.id)}
              >
                Reactivate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosedPositions;
