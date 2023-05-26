import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

export default function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (email && password.length >= 8) {
      fetch("http://localhost:3001/api/v1/admins/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const res = await response.json();
            toast.error(res.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
          return response.json();
        })
        .then((data) => {
          const { token } = data;
          localStorage.setItem("token", token);
          window.location.href = "/home";
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (password.length <= 8) {
      setPasswordError(true);
    }
    const emailPattern =
      /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailPattern.test(email);

    if (!isValidEmail) {
      setEmailError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ position: "relative", overflow: "hidden", height: "20vh" }}>
        <div style={{ marginTop: "50px", position: "absolute" }}>
          <svg
            width="100%"
            height="355px"
            viewBox="0 0 1920 355"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="Apple-TV"
                transform="translate(0.000000, -402.000000)"
                fill="#ECF2FF"
              >
                <path
                  d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z"
                  id="Path"
                ></path>
              </g>
            </g>
          </svg>
        </div>

        <img
          src={require("../../assets/leaves.jpeg")}
          style={{ position: "", top: 0, width: "100%", height: "auto" }}
          alt="greenleaves"
        />
      </div>

      <container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img
              src={require("../../assets/coffeenet.png")}
              alt="AI Logo"
              style={{ width: 150, height: 130,  }}
            />
          </div>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              onChange={() => setEmailError(false)}
              helperText={emailError ? "Please Enter a Valid EmailAddress" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              onChange={() => setPasswordError(false)}
              helperText={passwordError ? "Password is required" : ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: "#296656",
                color: "white",
                borderRadius: "20px",
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </container>
    </ThemeProvider>
  );
}
