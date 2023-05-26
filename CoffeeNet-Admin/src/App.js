import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Pages/List/Users/Users";
import Admins from "./Pages/List/Admins/Admins";
import Datatable from "./Components/UI/Datatable/UserDatatable";
import Login from "./Pages/Login/Login";
import Plants from "././Pages/List/Plants/Plants";
import Profiles from "./Pages/List/Profiles/Profiles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route
              path="home"
              element={isAuthenticated() ? <Home /> : <Login />}
            />
            <Route
              path=""
              element={isAuthenticated() ? <Datatable /> : <Login />}
            />
            <Route
              path="plants"
              element={isAuthenticated() ? <Plants /> : <Login />}
            />
            <Route path="users">
              <Route
                index
                element={isAuthenticated() ? <Users /> : <Login />}
              />
            </Route>
            <Route path="Admins">
              <Route
                index
                element={isAuthenticated() ? <Admins /> : <Login />}
              />
            </Route>
            <Route path="Profiles">
              <Route
                index
                element={isAuthenticated() ? <Profiles /> : <Login />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
