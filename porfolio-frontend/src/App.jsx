import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Typewriter from "react-typewriter-effect";
import codeIcon from "./assets/icons/code-svg.svg";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resume from "./pages/Resume";
import { ProjectPage } from "./pages/Project";
import { Admin } from "./pages/Admin";
import { Success } from "./pages/Success";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SkillsSection from "./pages/Skills";
import { ContactPage } from "./pages/Contact";

const App = () => {

  return (
    <Router>
      <Routes>  

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <ContactPage />
            </>
          }
          />

        <Route 
          path="/skill"
          element={
            <>
              <Navbar />
              <SkillsSection />
            </>
          }
        />   

        <Route 
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin/success"
          element={<Success />}
        />
        
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="parent">
                <div className="glassy-overlay"></div>
                <div className="container">
                  <div className="left-div">
                    <Typewriter
                      textStyle={{
                        fontSize: "2.5rem",
                        color: "#d1d5db",
                        fontWeight: "600",
                      }}
                      startDelay={100}
                      cursorColor="white"
                      multiText={[
                        "Hi, Welcome to my Portfolio",
                        "I'm Aditya Pawar, Aspiring full-stack developer from India",
                      ]}
                      multiTextDelay={1000}
                      typeSpeed={50}
                      deleteSpeed={30}
                    />
                    <button>Hire Me!</button>
                  </div>
                  <div className="right-div">
                    <button>
                      <img src={codeIcon} alt="" width={30} height={30} />
                      <h1>Full Stack Developer</h1>
                    </button>
                  </div>
                </div>
                <Footer />
              </div>
            </>
          }
        />
        
        <Route path="/resume" element={
          <>
            <Navbar />
            <Resume />
          </>
        } />

        <Route path="/project" element={
          <>
            <Navbar />
            <ProjectPage />
          </>
        } />

      </Routes>
    </Router>
  );
};

export default App;