import "./Plants.scss";
import { useState } from "react";
import Datatable from "../../../Components/UI/Datatable/PlantDatatable";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import Container from "../../../Components/UI/Container/Container";
function Plants() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className={`user ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="user-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
          <div className="container-title" style={{ color: "#000000" }}>
            Leaves Informations
          </div>
          <div className="container-body">
            <div className="container-body__tables">
              <Datatable />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Plants;
