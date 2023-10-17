/* eslint-disable react/prop-types */
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./SideNav.css";

export const SideNav = ({nav, closeNav}) => {

  
  // logout
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setLogout(true)
  };

// close Nav
const handleCancelSideNav = () =>{
  closeNav()
}

  // Navigate to login
  if (logout === true) {
    return <Navigate to={"/login"} />;
  }

  
  return (
    <div className={nav}>
      <div className="sideNav-header">
        <div className="logo-header">
        <h2 className="logo">Mail System</h2>
        <i className="fa-solid fa-x sideNav-cancel" onClick={handleCancelSideNav}></i>
        </div>
        <div className="sideNav-con">
          <div className="sideNav-icon">
            <h4>Inbox</h4>
            <i className="fa-solid fa-envelope "></i>
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
