import React from "react";
import userIcon from "../assets/images/user-icon.png";
import searchIcon from "../assets/icons/search-icon.svg";
import "../styles/components/Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav-container">

            <div className="left-content">
                <button aria-label="Open Menu" title="Open Menu">
                    <span className="menu-bar"></span>
                    <span className="menu-bar"></span>
                </button>
                <h2>aditya.dev</h2>
            </div>

            <div className="center-content">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    Home
                </NavLink>
                <NavLink to="/resume" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    Resume
                </NavLink>
                <NavLink to="/project" className={({ isActive }) => (isActive ? "active-link" : "")}>
                    Project
                </NavLink>
                <div className="search-container">
                    <img src={searchIcon} alt="Search" width={25} height={25} />
                    <input type="text" placeholder="Search" aria-label="Search Input" />
                </div>
            </div>

            <div className="right-content">
                <button aria-label="Profile" title="Open Profile">
                    <img src={userIcon} alt="User Profile" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
