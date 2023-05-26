import "./Modal.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
const Modal = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleClickOpen = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstNameError(false);
    setLastNameError(false);
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setOpen(true);
  };

  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstNameError(false);
    setLastNameError(false);
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    const usernameRegex = /^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
    const isValiduser = usernameRegex.test(username);
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
    if (!username.trim()) {
      setUsernameError(true);
      hasError = true;
    } else if (!isValiduser) {
      setUsernameError(true);
      hasError = true;
    } else {
      setUsernameError(false);
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
    if (!password.trim()) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(true);
      hasError = true;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(true);
      hasError = true;
    } else {
      setConfirmPasswordError(false);
    }

    // If no errors, submit form
    if (!hasError) {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        userName: username,
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
      };
      onSubmit(userData);
      setOpen(false);
    }
  };

  return (
    <div className="dialog-modal ">
      <Button
        color="primary"
        onClick={handleClickOpen}
        variant="outlined"
        className="add__user"
        style={{ margin: 10, color: "white", backgroundColor: "#296656" }}
      >
        <PersonAddAlt1Icon /> 
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        className="dialog-modal__box "
        PaperProps={{ sx: { width: "30%", height: "80%" } }}
      >
        <DialogTitle style={{ color: "#000000", fontWeight: "bolder" }}>
          Add New User
        </DialogTitle>
        <DialogContent className="content">
          <div className="input">
            <TextField
              label="First Name"
              variant="outlined"
              style={{ width: "110%" }}
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={firstNameError}
              helperText={firstNameError && "Please enter a valid first name"}
              inputProps={{ maxLength: 50 }}
            />
          </div>

          <div className="input">
            <TextField
              label="Last Name"
              variant="outlined"
              style={{ width: "110%" }}
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={lastNameError}
              helperText={lastNameError && "Please enter a valid last name"}
              inputProps={{ maxLength: 50 }}
            />
          </div>

          <div className="input">
            <TextField
              label="Username"
              variant="outlined"
              style={{ width: "110%" }}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              helperText={usernameError && "Please enter a valid username"}
              inputProps={{ maxLength: 50 }}
            />
          </div>

          <div className="input">
            <TextField
              label="Email"
              variant="outlined"
              style={{ width: "110%" }}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError && "Please enter a valid email"}
              inputProps={{ maxLength: 50 }}
            />
          </div>

          <div className="input">
            <TextField
              label="Password"
              variant="outlined"
              style={{ width: "110%" }}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={
                passwordError && password.length < 8
                  ? "Please enter a valid password (min. 8 characters)"
                  : ""
              }
              inputProps={{ maxLength: 50, minLength: 8 }}
            />
          </div>

          <div className="input">
            <TextField
              label="Confirm Password"
              variant="outlined"
              style={{ width: "110%" }}
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              helperText={
                confirmPasswordError
                  ? "Please enter a valid password (min. 8 characters) and make sure it matches the password above"
                  : " "
              }
              inputProps={{ maxLength: 50 }}
            />
          </div>
        </DialogContent>

        <DialogActions className="action">
          <Button
            onClick={handleSubmit}
            style={{ color: "Green", fontWeight: "bolder" }}
          >
            <DoneIcon style={{ color: "green" }} />
            Save
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
  );
};

export default Modal;
