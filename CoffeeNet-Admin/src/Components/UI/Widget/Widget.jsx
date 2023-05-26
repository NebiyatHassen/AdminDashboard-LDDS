import "./Widget.scss";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import { useState, useEffect } from "react";

const Widget = ({ type }) => {
  const [totalUserData, settotalUserData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/v1/users/countUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      const users = json;
      settotalUserData(users);
    }
    fetchData();
  }, []);
  if (totalUserData) {
    let data;
    const diff = 20;
    switch (type) {
      case "Users":
        data = {
          title: <span style={{ color: "#000000" }}>Total Users</span>,
          amount: totalUserData.totalUsers,
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                color: "#404258",
                backgroundColor: "rgba(0, 128, 0, 0.2)",
              }}
            />
          ),
        };
        break;
      case "Plants":
        data = {
          title: <span style={{ color: "#000000" }}>Total Coffee Leaves</span>,
          amount: totalUserData.totalPlants,
          icon: (
            <YardOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
      case "Active Users":
        data = {
          title: <span style={{ color: "#03C988" }}>Active Users</span>,
          amount: totalUserData.activeUsers,
          icon: (
            <VerifiedUserIcon
              className="icon"
              style={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "green",
              }}
            />
          ),
        };
        break;
      case "Inactive Users":
        data = {
          title: <span style={{ color: "#FEA1A1" }}>Inactive Users</span>,
          amount: totalUserData.deactiveUsers,
          icon: (
            <PersonOffIcon
              className="icon"
              style={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;
      case "Severity":
        data = {
          title: "Severity",
          amount: totalUserData.severityCount,
          icon: (
            <PercentOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;
      default:
    }
    return (
      <div className="widget">
        <div className="left">
          <span className="title">
            {data.title === "Severity" ? (
              <h3 style={{ color: "black" }}>Severity</h3>
            ) : (
              data.title
            )}
          </span>
          <span className="counter">
            {data.isMoney && "$"} {data.amount}
          </span>
          <span className="link">{data.link}</span>
        </div>
        <div className="right">
          {data.title === "Severity" && (
            <div className="percentage positive">
              <KeyboardArrowUpIcon /> 15%
            </div>
          )}
          {data.icon}
        </div>
      </div>
    );
  }
};
export default Widget;
