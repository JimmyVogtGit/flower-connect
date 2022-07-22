import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "../assets/css/Logout.css";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .delete("http://localhost:5000/logout", { withCredentials: true })
      .then(() => {
        window.setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };
  return (
    <div>
      <button type="button" className="btn-logout" onClick={logout}>
        <LogoutIcon sx={{ color: "red" }} />
      </button>
    </div>
  );
}

export default Logout;
