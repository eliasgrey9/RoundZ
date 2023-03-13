import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./activePositions.module.css";
import { NavLink } from "react-router-dom";
import { VscClose } from "react-icons/vsc";

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
    <div className={style.body}>
      <div className={style.allCards}>
        {dataFromApi.map((data) => (
          <div className={style.positionCard} key={data.id}>
            <div className={style.leftSideOfCard}>
              <div className={style.cardTitle}>{data.title}</div>
              <NavLink to={`/dashboard/position/${data.id}`}>
                <div className={style.viewInterviewDetails}>
                  View Interview Details
                </div>
              </NavLink>

              <div className={style.invites}>{data.invitations} Invites</div>
            </div>
            <div className={style.rightSideOfCard}>
              <VscClose
                onClick={() => {
                  changeStatusToClosed(data.id);
                }}
                className={style.closePositionX}
              />
              <button className={style.shareBtn}>Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivePositions;
