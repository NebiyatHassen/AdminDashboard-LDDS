import "./Profiles.scss";
import { useState, useEffect } from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Navbar from "../../../Components/UI/Navbar/Navbar";
import Container from "../../../Components/UI/Container/Container";
import { TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Button from "@mui/material/Button";
import EditNoteIcon from '@mui/icons-material/EditNote';
function Profile() {
  const [username, setUsername] = useState();
  const [profilePic, setProfilePic] = useState(require("../../../assets/icon-admin.jpg"));


  const [newUsername, setNewUsername] = useState(username);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/v1/users/profileUserName",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      const user = json.data.currentUser;
      setUsername(user.userName);
    }
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleUpdate = () => {
    if (!newUsername.trim()) {
      setUsernameError(true);
      return;
    }
    setUsername(newUsername);
    setProfilePic(newProfilePic);
    setIsEditMode(false);
  };

  const handleProfilePicChange = (event) => {
    setNewProfilePic(event.target.files[0]);
  };

  const handleEdit = () => {
    setNewUsername(username);
    setNewProfilePic(profilePic);
    setIsEditMode(true);
  };
  const handleCancel = () => {
    setUsernameError(false);
    setNewUsername(username);
    setNewProfilePic(profilePic);
    setIsEditMode(false);
  };
  return (
    <div className={`user ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="user-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Container>
        <div  style={{ textAlign: 'center' ,marginTop:150}}>
     {isEditMode ? (
        <div className='form'style={{marginRight:180}}>
          <TextField type="file" onChange={handleProfilePicChange} style={{margin:20,marginLeft:115,width:345}} />
          <TextField type="text" value={newUsername} 
          onChange={(e) => {
            setNewUsername(e.target.value);
            setUsernameError(false);
          }}
          required
          pattern="[a-zA-Z0-9]{3,50}"
          error={usernameError}
            helperText={usernameError && "Please enter a valid username"}
          style={{width:345,marginLeft:100,fontWeight:'bolder'}}
        />
      
        
          
          
          <div style={{marginLeft:120,margin:10}}>
          <Button onClick={handleUpdate} style={{color:"Green",fontWeight:'bolder'}}>
            < DoneAllIcon style={{color:"green"}}/> 
       Save
          </Button>

          <Button onClick={handleCancel} style={{color:"Red", fontWeight:'bolder'}} >
            <CancelIcon style={{color:"red"}}/>
          Cancel
          </Button>
          </div>
         
        </div>
      ) : (
        <div>
          <img src={profilePic} alt="Profile" width="150" height="150" style={{ borderRadius: '50%' }} />
          <h2>{username}</h2>
          {/* <Button onClick={handleEdit} style={{color:"Green",fontWeight:'bolder'}}>
            < EditNoteIcon style={{color:"green"}}/> 
   Edit Profile
          </Button> */}

        </div>
      )}
    </div>
          <div className="container-body">
            <div className="container-body__tables"></div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Profile;







