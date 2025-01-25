import React, { useEffect, useState } from "react";

export const ProjectPage = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/projects")
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
            })
            .catch((error) => {console.error("error fetching projects", error)})
    })

    return (
        <>
            <div className="project-data">
                <div className="left-div">
                    <img src="" alt="" className="project-img"/>
                </div>
                {projects.map((project) => (
                    <div key={project.projectTitle} className="right-div">
                        <h1 className="project-name">{project.projectTitle}</h1>
                        <p className="project-description">{project.projectDescription}</p>
                        <a href={project.ProjectLink} className="project-link">Visit Project</a>
                        <a href={project.GithubLink} className="github-link">Github link</a>
                    </div>
                ))}
            </div>
        </>
    );
}