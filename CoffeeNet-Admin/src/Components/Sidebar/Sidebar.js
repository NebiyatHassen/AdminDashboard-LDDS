import "./Sidebar.scss";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

import YardOutlinedIcon from "@mui/icons-material/YardOutlined";

import { Link } from "react-router-dom";

import Cookies from "universal-cookie";

const cookies = new Cookies();

function LogoutHandler() {
  localStorage.removeItem("token");
  window.location.href = "/";
}
function Sidebar({ sidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "side-opened" : "closed"}`}>
      <div className="top">
        <div className="logo">
          <img src={require("../../assets/coffeeLeaf.jpg")} alt="coffeeNet" />
        </div>
        <Typography className="sidebar-title" variant="h6"></Typography>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" className="link">
            <li>
              <DashboardIcon className="icon" />
              <Typography className="page-title">Dashboard</Typography>
            </li>
          </Link>
          <br />
          <br />
          <hr />
          <br />
          <p className="title">USERS</p>

          <Link to="/Users" className="link">
            <li>
              <Person2OutlinedIcon className="icon" />
              <Typography className="page-title">Users</Typography>
            </li>
          </Link>
        
          <Link to="/Admins" className="link">
            <li>
              <AdminPanelSettingsIcon className="icon" />
              <Typography className="page-title">Admins</Typography>
            </li>
          </Link>
          <br />
          <br />
          <hr />
          <br />
          <p className="title">LISTS</p>
          <Link to="/Plants" className="link">
            <li>
              <YardOutlinedIcon className="icon" />
              <Typography className="page-title">Leaves</Typography>
            </li>
          </Link>
      <br/>
      <hr/>
      <br />
          <p className="title">PROFILE</p>
          <Link to="/Profiles" className="link">
            <li>
              <AccountCircleIcon className="icon" />
              <Typography className="page-title">Profile</Typography>
            </li>
          </Link>
        
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
