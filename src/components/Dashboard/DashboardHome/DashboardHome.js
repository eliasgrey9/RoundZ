import React, { useState } from "react";
import style from "./dashboardHome.module.css";
import ClosedPositions from "./ClosedPositions/ClosedPositions";
import ActivePositions from "./ActivePositions/ActivePositions";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { TbPlus } from "react-icons/tb";

const DashboardHome = () => {
  const [status, setStatus] = useState(true);

  return (
    <div className={style.body}>
      <Navbar />
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
          <Link to={"/dashboard/createJobPosition"}>
            <button className={style.createBtn}>
              <TbPlus />
              <div>Create</div>
            </button>
          </Link>
        </div>
      </div>
      {status ? <ActivePositions /> : <ClosedPositions />}
    </div>
  );
};
export default DashboardHome;
