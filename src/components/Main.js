import React from "react";
import Homepage from "./Home/Homepage";
import SignUp from "./Signup/SignUp";
import SignIn from "./SignIn/SignIn";
import DashboardHome from "./Dashboard/DashboardHome/DashboardHome";
import SinglePositionView from "./Dashboard/SinglePositionView/SinglePositionView";
import Test from "./Dashboard/SinglePositionView/EmailInviteForm";

import { Routes, Route } from "react-router-dom";

function Main() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<DashboardHome />}></Route>

        <Route
          path="/dashboard/position/:id"
          element={<SinglePositionView />}
        ></Route>

        <Route path="/testlink/" element={<Test />}></Route>
      </Routes>
    </div>
  );
}

export default Main;

//How to pass headers to an api request

//axios.METHOD(ROUTE_URL, { headers: { Authorization: 'Bearer myVeryLongJWT' } })
