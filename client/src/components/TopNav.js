import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import "../index.css";

function TopNav({handleLogout}) {
  function handleLogoutClick() {
    fetch("http://127.0.0.1:5555/logout", 
    { method: "DELETE" }).then((r) => {
      if (r.ok) {
        r.json().then(() => handleLogout())
      }
    });
  }

  return (
    <>
      <div id="topnav">
        <NavLink exact to="/">
          <img id="logo-image" src="def_repr.png" alt="Def Repr Logo" />
        </NavLink>

        <div id="topnav-buttons">
          <NavLink exact to="/">
            <button className="navbar-btn" title="My Feed">
              <i className="navbar-btn-icon ti ti-home"></i>
            </button>
          </NavLink>
          {/* <NavLink exact to="/posts">
            <button className="navbar-btn" title="My Posts">
              <i className="navbar-btn-icon ti ti-notebook"></i>
            </button>
          </NavLink> */}
          <NavLink exact to="/create-post">
            <button className="navbar-btn" title="Create Post">
              <i className="navbar-btn-icon ti ti-pencil"></i>
            </button>
          </NavLink>
          <NavLink exact to="/about">
            <button className="navbar-btn" title="About Us">
              <i className="navbar-btn-icon ti ti-info-circle"></i>
            </button>
          </NavLink>
          <NavLink exact to="/login">
            <button
              className="navbar-btn"
              title="Logout"
              onClick={handleLogoutClick}
            >
              <i className="navbar-btn-icon ti ti-logout"></i>
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default TopNav;
