import "./Home.scss";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Navbar from "../../Components/UI/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Widget from "../../Components/UI/Widget/Widget";
import Container from "../../Components/UI/Container/Container";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { PieChart, Pie, Cell } from "recharts";

function Home(role) {
  const [totalUserData, settotalUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    const data1 = [
      { name: "Active Users", value: totalUserData.activeUsers },
      { name: "Inactive Users", value: totalUserData.deactiveUsers },
      { name: "Total Coffee Leaves", value: totalUserData.totalPlants },
      { name: "Total Users", value: totalUserData.totalUsers },
      { name: "Severity", value: totalUserData.severityCount },
    ];
    const COLORS = ["#03C988", "#FEA1A1", "#206A5D", "#404258", "#959595"];
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
    return (
      <div
        className={`home ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="home-container">
          <Navbar toggleSidebar={toggleSidebar} />
          <Container>
            <div className="container-body">
              <div className="container-widgets">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget type="Users" className="card" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget type="Plants" className="card" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget type="Active Users" className="card" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget type="Inactive Users" className="card" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget type="Severity" className="card" />
                  </Grid>
                  <Grid>
                    <PieChart
                      width={400}
                      height={380}
                      style={{ float: "left" }}
                      margin={{ left: 90, top: 30 }}
                    >
                      <Pie
                        data={data1}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {data1.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
