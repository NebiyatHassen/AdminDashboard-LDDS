import "./UserDatatable.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PreviewIcon from "@mui/icons-material/Preview";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Modal from "@material-ui/core/Modal";

export default function Datatable({ newUser }) {
  const [newdata, setData] = useState([]);
  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/v1/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      const users = json.data.users;
      const filteredUsers = users.map((user, i) => {
        return {
          id: i + 1,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          fullName: user.firstName + " " + user.lastName,
          status: user.status,
        };
      });
      setData(filteredUsers);
    }
    fetchData();
  }, [newUser, deleteUser]);
  const columns = [
    { field: "id", headerName: "NO", width: 60, cellClassName: "cell" },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      cellClassName: "cell",
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer", textDecoration: "" }}
          onClick={() => handleOpenPopUp(params.row)}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      cellClassName: "cell",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      cellClassName: "cell",
    },
    { field: "email", headerName: "Email", width: 200, cellClassName: "cell" },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      cellClassName: "cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const handleClickOpen = () => {
          setoriginalEmail(params.row.email);
          setSelectedRow(params.row);
          setFirstName(params.row.firstName);
          setLastName(params.row.lastName);
          setEmail(params.row.email);
          setStatus(params.row.status);
          setModalOpen(true);
          setFirstNameError(false);
          setLastNameError(false);
          setUsernameError(false);
          setEmailError(false);
        };

        const handleOpen = () => {
          setSelectedRow(params.row);
          setOpen(true);
        };
        return (
          <div>
            <button style={{ border: "white" }}>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                style={{ color: "green" }}
                onClick={() => handleClickOpen(params.row)}
              />
            </button>

            <button style={{ border: "white" }}>
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                style={{ color: "red" }}
                onClick={() => handleOpen(params.row)}
              />
            </button>
            <button>
              <GridActionsCellItem
                icon={<PreviewIcon />}
                label="Done"
                style={{ color: "black", border: "white" }}
                onClick={() => handleOpenPopUp(params.row)}
              />
            </button>
          </div>
        );
      },
    },
  ];
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleOpenPopUp = (row) => {
    setSelectedRow(row);
    setOpenPopUp(true);
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setoriginalEmail] = useState("");
  const [status, setStatus] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async () => {
    const nameRegex = /^[a-zA-Z]+$/;
    const usernameRegex = /^[a-zA-z0-9]+$/;
    const isvalidname = nameRegex.test(firstName);
    const isValidLast = nameRegex.test(lastName);
    const emailPattern =
      /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailPattern.test(email);

    let hasError = false;
    if (!firstName.trim()) {
      setFirstNameError(true);
      hasError = true;
    } else if (!isvalidname) {
      setFirstNameError(true);
      hasError = true;
    } else {
      setFirstNameError(false);
    }
    if (!lastName.trim()) {
      setLastNameError(true);
      hasError = true;
    } else if (!isValidLast) {
      setLastNameError(true);
      hasError = true;
    } else {
      setLastNameError(false);
    }

    if (!email.trim()) {
      setEmailError(true);
      hasError = true;
    } else if (!isValidEmail) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }
    if (!hasError) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:3001/api/v1/admins/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          status: status,
          originalEmail: originalEmail,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data from the API");
          }
          return response.json();
        })
        .then((data) => {
          setModalOpen(false);
          const updatedUser = {
            status,
            id: selectedRow.id,
            firstName,
            lastName,
            fullName: firstName + " " + lastName,
            email,
          };
          const newData = newdata.map((item) =>
            item.id === updatedUser.id ? updatedUser : item
          );
          setData(newData);
          toast.success("User Updated Successfully");
        })
        .catch((error) => {
          console.error(error);
        });

      setModalOpen(false);
    }
  };
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3001/api/v1/users/${selectedRow.email}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        return response.json();
      })
      .then((data) => {
        setDeleteUser(data.users);
        toast.success("User Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete user");
      });
    setOpen(false);
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };
  const [open, setOpen] = useState(false);
  const handleClosee = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 500, width: "100%", margin: 7 }}>
      <DataGrid
        rows={newdata}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        className="datatable"
      />

      <div className="dialog-modal ">
        <Dialog
          open={isModalOpen}
          onClose={handleClose}
          className="dialog-modal__box "
          PaperProps={{ sx: { width: "30%", height: "63%" } }}
        >
          <DialogTitle style={{ color: "#2A2F4F", fontWeight: "bolder" }}>
            Update User Information
          </DialogTitle>
          {selectedRow && (
            <DialogContent className="content">
              <div className="input">
                <TextField
                  label="First Name"
                  variant="outlined"
                  style={{ width: "110%" }}
                  required
                  defaultValue={selectedRow.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={firstNameError}
                  helperText={
                    firstNameError && "Please enter a valid first name"
                  }
                  inputProps={{ readOnly: true, maxLength: 50 }}
                />
              </div>
              <div className="input">
                <TextField
                  label="Last Name"
                  variant="outlined"
                  style={{ width: "110%" }}
                  required
                  defaultValue={selectedRow.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={lastNameError}
                  helperText={lastNameError && "Please enter a valid last name"}
                  inputProps={{ maxLength: 50 }}
                />
              </div>
              <div className="input">
                <TextField
                  label="email"
                  variant="outlined"
                  type="email"
                  required
                  style={{ width: "110%" }}
                  defaultValue={selectedRow.email}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                  helperText={emailError && "Please enter a valid email"}
                  inputProps={{ maxLength: 50 }}
                />
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    required
                    defaultValue={selectedRow.status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Deactive">Deactive</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </DialogContent>
          )}
          <DialogActions className="action">
            <Button
              onClick={handleSubmit}
              style={{ color: "Green", fontWeight: "bolder" }}
            >
              <DoneIcon style={{ color: "green" }} />
              Submit
            </Button>
            <Button
              onClick={handleClose}
              style={{ color: "Red", fontWeight: "bolder" }}
            >
              <ClearIcon style={{ color: "red" }} />
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <div className="dialog-modal">
          <Dialog
            open={open}
            onClose={handleClosee}
            className="dialog-modal__box"
            PaperProps={{ sx: { width: "30%", height: "19%" } }}
          >
            <DialogContent className="content">
              <div className="input">
                <label style={{ color: "black", fontWeight: "bolder" }}>
                  Do you want to delete this user?
                </label>
              </div>
            </DialogContent>
            <DialogActions className="action">
              <Button
                onClick={handleDelete}
                style={{ color: "green", fontWeight: "bolder" }}
              >
                {<DoneIcon style={{ color: "green" }} />}
                Yes
              </Button>
              <Button
                onClick={handleClosee}
                style={{ color: "red", fontWeight: "bolder" }}
              >
                {<ClearIcon style={{ color: "red" }} />}
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <Modal
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "50%", backgroundColor: "#fff", padding: "20px" }}>
          {selectedRow && (
            <div>
              <h4>Full Name:</h4>
              <h5>
                {selectedRow.firstName} {selectedRow.lastName}
              </h5>
              <h4>Email:</h4>
              <h5>{selectedRow.email}</h5>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
