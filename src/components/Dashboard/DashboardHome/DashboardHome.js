import React, { useState } from "react";
import style from "./dashboardHome.module.css";
import ClosedPositions from "./ClosedPositions/ClosedPositions";
import ActivePositions from "./ActivePositions/ActivePositions";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { useParams } from 'react-router-dom';

const DashboardHome = () => {
  const [status, setStatus] = useState(true);

    const { userId } = useParams();
  


  return (
    <div className={style.body}>
      <Navbar userId={userId} />
      <div className={style.dashboardControls}>
        <div className={style.leftSideDashboardControls}>
          <div className={style.heading}>My Dashboard</div>

          <div>
            <div className={style.statusLinks}>
              <div
                className={status === true ? style.underLineActive : null}
                onClick={() => setStatus(true)}
              >
                Active
              </div>

              <div
                className={status === false ? style.underLineActive : null}
                onClick={() => setStatus(false)}
              >
                Closed
              </div>
            </div>
          </div>
        </div>
        <div className={style.rightSideDashboardControls}>
          <Link to={`/dashboard/createJobPosition/${userId}`}>
            <button className={style.createBtn}>
              <TbPlus />
              <div>Create</div>
            </button>
          </Link>
        </div>
      </div>
      {status ? <ActivePositions setStatus={setStatus} userId={userId} /> : <ClosedPositions setStatus={setStatus} userId={userId} />}
    </div>
  );
};
export default DashboardHome;
