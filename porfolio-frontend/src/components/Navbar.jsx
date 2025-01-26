import React, { useEffect } from "react";
import accountSvg from "../assets/svgs/account.svg";
import searchIcon from "../assets/icons/search-icon.svg";
import "../styles/components/Navbar.css";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";
import { useState } from "react";
import { CloseOutlined } from '@ant-design/icons';
import { Modal } from "antd";

const Navbar = () => {


    const linkedInLink = "https://www.linkedin.com/in/aditya-pawar-557a56332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";

    // Drawer state management
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState("40vw");

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const showDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setDrawerWidth("70vw")
                
            }
            else {
                setDrawerWidth("40vw")
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <nav className="nav-container">

            <div className="left-content">
                <button aria-label="Open Menu" title="Open Menu" onClick={showDrawer}>
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
                <button aria-label="Profile" title="Open Profile" onClick={showModal}>
                    <img src={accountSvg} alt="User Profile" />
                </button>
            </div>

            {/* Drawer component */}
            <Drawer
                placement="left"
                open={drawerOpen}
                onClose={closeDrawer}
                closable={true}
                width={drawerWidth}
                height="100vh"
                bodyStyle={{ padding: 0, backgroundColor: "#8A34A6" }}
                closeIcon={<CloseOutlined style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', color: '#64748b', fontWeight: "bold", padding: "10px", borderRadius: "10px", border: "2px solid #64748b"}} />}
            >
                <div className="drawer" style={{height: "100%", color: "#fff" }}>
                    <h1 style={{ textAlign: "center", padding: "20px" }}>Menu</h1>
                    <ul style={{ listStyle: "none"}}>
                        {/* <li>Home</li>
                        <li>Resume</li>
                        <li>Projects</li>
                        <li>Contact me</li>
                        <li>About me</li> */}
                        <NavLink className={({ isActive }) => (isActive ? "active-link-2" : "li")} to="/" >Home</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? "active-link-2" : "li")} to="/resume" >Resume</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? "active-link-2" : "li")} to="/project" >Projects</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? "active-link-2" : "li")} to="/contact" >Contact me</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? "active-link-2" : "li")} to="/about" >About me</NavLink>
                    </ul>
                </div>
            </Drawer>

            <Modal
                title="aditya.dev"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width="80vw"
                height="80vh"
                style={{padding: "0"}}
            >
                <div className="popup">
                    <div className="left-div"></div>
                    <div className="right-div">
                        <h1>Aditya Pawar</h1>
                        <h2>20 years</h2>
                        <a href="https://github.com/AdityaByte">@AdityaByte-Github</a><br />
                        <a href={linkedInLink}>@AdityaPawar-Linkedin</a>
                    </div>
                </div>
            </Modal>

        </nav>
    );
};

export default Navbar;
