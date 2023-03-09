import React from "react";
import Homepage from "./Home/Homepage";
import SignUp from "./Signup/SignUp";
import SignIn from "./SignIn/SignIn";
import DashboardHome from "./Dashboard/DashboardHome/DashboardHome";
import SinglePositionView from "./Dashboard/SinglePositionView/SinglePositionView";
import InterviewPage from "./InterviewPage/InterviewPage";
import { Routes, Route } from "react-router-dom";
import CreateJobPosition from "./Dashboard/CreateJobPosition/CreateJobPosition";

function Main() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<DashboardHome />}></Route>
        <Route
          path="/dashboard/createJobPosition"
          element={<CreateJobPosition />}
        ></Route>

        <Route
          path="/dashboard/position/:id"
          element={<SinglePositionView />}
        ></Route>

        <Route path="/interview" element={<InterviewPage />}></Route>
      </Routes>
    </div>
  );
}

export default Main;

//How to pass headers to an api request
//axios.METHOD(ROUTE_URL, { headers: { Authorization: 'Bearer myVeryLongJWT' } })
