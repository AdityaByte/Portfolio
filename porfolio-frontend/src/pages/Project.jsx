import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "../styles/pages/Project.css";

const NoProjectStyle = {
  width: "100vw",
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  gap: "5%",
}

const NoProjectH1Style = {
  fontSize: "3rem"
}

export const ProjectPage = () => {
  const backendApiURL = import.meta.env.VITE_BACKEND_API_URL;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(backendApiURL + "/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div>
      {projects.length === 0 ? (
        <div className="no-projects" style={NoProjectStyle}>
          <h2 style={NoProjectH1Style}>No Projects Available</h2>
          <p>Check back later for updates!</p>
        </div>
      ) : (
        <Carousel interval={2000} showThumbs={false} showStatus={false}>
          {projects.map((project) => (
            <div
              className="project-data"
              key={project.projectTitle}
              style={{ display: "flex" }}
            >
              <div className="left-div">
                <h1 className="project-name">{project.projectTitle}</h1>
                <p className="project-description">{project.projectDescription}</p>
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  {project.projectLink}
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  {project.githubLink}
                </a>
              </div>

              <div className="right-div">
                {project.file && project.file.data ? (
                  <img
                    src={`data:${project.file.type};base64,${project.file.data}`}
                    alt={project.file.name || "Project Image"}
                    className="project-img"
                  />
                ) : (
                  <p>No valid image available</p>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};
