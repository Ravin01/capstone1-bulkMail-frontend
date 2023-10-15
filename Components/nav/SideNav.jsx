import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./SideNav.css";

export const SideNav = () => {
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    const state = confirm("are you want to logout, Don't go");
    if (state) {
      setLogout(true);
    } else {
      setLogout(false);
    }
  };
  if (logout === true) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="sideNav-container">
      <div className="sideNav-header">
        <h2 className="logo" >Mail System</h2>
        <div className="sideNav-con">
          <div className="sideNav-icon">
          <h4>Inbox</h4>
          <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="sideNav-icon">
          <h4>Important </h4>
          <i className="fa-solid fa-star"></i>
          </div>
        </div>
      </div>
      <div className="sideNav-logout" onClick={handleLogout}>
        <p className="logout-btn">Logout</p>
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
    </div>
  );
};
