import "./App.css";
import React from "react";

import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Post from "./pages/Post/Post";
import ManageProfile from "./pages/ManageProfile/ManageProfile";
import LeaderShipBoard from "./pages/LeaderShipBoard/LeaderShipBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/leadershipboard" element={<LeaderShipBoard />} />
          <Route exact path="/manageprofile" element={<ManageProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
