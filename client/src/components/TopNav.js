import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function TopNav() {
    return (
        <>
            <div id="topnav">
                <NavLink exact to="/">
                    <img id="logo-image" src="def_repr.png" alt="Def Repr Logo"/>
                </NavLink>


                <form>
                    <input id="search-bar" type="search" placeholder="Search"/>
                    <button className="search-btn" type="submit">
                        <i className="ti ti-search"></i>
                    </button>
                </form> 

                <div id="topnav-buttons">
                    <NavLink exact to="/">
                        <button className="navbar-btn" title="My Feed">
                            <i className="navbar-btn-icon ti ti-home"></i>
                        </button>
                    </NavLink>
                    <NavLink exact to="/my-posts">
                        <button className="navbar-btn" title="My Posts">
                            <i className="navbar-btn-icon ti ti-notebook"></i>
                        </button>
                    </NavLink>
                    <NavLink exact to="/create-post">
                        <button className="navbar-btn" title="Create Post">
                            <i className="navbar-btn-icon ti ti-pencil"></i>
                        </button>
                    </NavLink>
                    <NavLink exact to="/login">
                        <button className="navbar-btn" title="Logout">
                            <i className="navbar-btn-icon ti ti-logout"></i>
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default TopNav;