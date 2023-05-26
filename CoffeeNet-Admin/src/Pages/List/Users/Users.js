import "./Users.scss";
import { useState } from "react";
import Datatable from "../../../Components/UI/Datatable/UserDatatable";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import Container from "../../../Components/UI/Container/Container";
import Modal from "../../../Components/UI/Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const [newUser, setNewUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalData, setModalData] = useState(null);

  const handleModalSubmit = async (newData) => {
    const { firstName, lastName, userName, email, password, passwordConfirm } =
      newData;
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3001/api/v1/users/signup", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        return response.json();
      })
      .then((data) => {
        setNewUser(newData);
        toast.success("New User Added Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            User Informations
          </div>
          <div className="container-body">
            <div className="container-body__tables">
              <Modal onSubmit={handleModalSubmit} />
              <Datatable newUser={newUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Users;
