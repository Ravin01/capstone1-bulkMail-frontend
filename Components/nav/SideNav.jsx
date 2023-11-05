/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./SideNav.css";
import { useSelector } from "react-redux/es/hooks/useSelector";


export const SideNav = ({nav, closeNav}) => {

  const count = useSelector((state) => state.mailCounts);

  const importantCount = useSelector((state)=> state.importantCount);

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
            <h4><Link to='/mail' className="sideNav-link">Inbox : </Link></h4>
            <div className="sideNav-count">
            {count}
            <i className="fa-solid fa-envelope"></i>
            </div>
          </div>
          <div className="sideNav-icon">
          <h4><Link to='/important' className="sideNav-link">Important</Link></h4>
          <div className="sideNav-count">
            {importantCount}
            <i className="fa-solid fa-star"></i>
          </div>
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
