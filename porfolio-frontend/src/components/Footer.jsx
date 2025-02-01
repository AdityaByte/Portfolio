import React from "react";
import "../styles/components/Footer.css";

const Footer = () => {

    const linkedinURL = import.meta.env.VITE_LINKEDIN_URL

    return (
        <>
        <footer>
            <a href="#link">@aditya.dev</a>
            <div>
                <a href="https://www.facebook.com">FB</a>
                <a href="">IN</a>
                <a href="">TW</a>
                <a href={linkedinURL}>IN</a>
            </div>
        </footer>
        </>
    );
}

export default Footer;