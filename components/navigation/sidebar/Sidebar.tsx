import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div>
    <Link to="/organization/dashboard">Dashboard</Link>
    <Link to="/organization/calendar">Calendar</Link>
  </div>
);

export default Sidebar;
