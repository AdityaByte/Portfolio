import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "../styles/pages/Project.css";

export const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/projects")
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
      <Carousel
        interval={2000}
        showThumbs={false}
        showStatus={false}
      >
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
    </div>
  );
};




// import React, { useEffect, useState } from "react";
// import "../styles/pages/Project.css"
// import img from "../assets/images/center-img-bw.png";

// export const ProjectPage = () => {

//     const [projects, setProjects] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:4000/projects")
//             .then((response) => response.json())
//             .then((data) => {
//                 setProjects(data);
//             })
//             .catch((error) => {console.error("error fetching projects", error)})
//     })

//     return (
//         <>
//             <div className="parent-project">
//                 {projects.map((project) => (
//                     <div className="project-data">
//                         <div key={project.projectTitle} className="left-div">
//                             <h1 className="project-name">{project.projectTitle}</h1>
//                             <p className="project-description">{project.projectDescription}</p>
//                             <a href={project.ProjectLink} className="project-link">{project.projectLink}</a>
//                             <a href={project.GithubLink} className="github-link">{project.githubLink}</a>
//                         </div>
//                         <div className="right-div">
//                             <img src={img} alt="" className="project-img"/>
//                         </div>
//                     </div>
//                 ))}
//                 {/* <div className="project-data">
//                     {projects.map((project) => (
//                         <div key={project.projectTitle} className="left-div">
//                             <h1 className="project-name">{project.projectTitle}</h1>
//                             <p className="project-description">{project.projectDescription}</p>
//                             <a href={project.ProjectLink} className="project-link">{project.ProjectLink}</a>
//                             <a href={project.GithubLink} className="github-link">{project.GithubLink}</a>
//                         </div>
//                     ))} */}
//                     {/* <div className="left-div">
//                             <h1 className="project-name">Hello world</h1>
//                             <p className="project-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, iusto. Eveniet porro voluptate quos culpa quia nisi cumque quis reiciendis.</p>
//                             <a className="project-link">Project Link</a>
//                             <a className="github-link">Github link</a>
//                         </div> */}
//                     {/* <div className="right-div">
//                         <img src={img} alt="" className="project-img"/>
//                     </div> */}
//                 {/* </div> */}
//             </div>
//         </>
//     );
// }


// import React, { useState, useEffect } from "react";
// import { Carousel } from "antd";
// import img from "../assets/images/center-img-bw.png"
// import "../styles/pages/Project.css";

// export const ProjectPage = () => {

//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//       fetch("http://localhost:4000/projects")
//           .then((response) => response.json())
//           .then((data) => {
//               setProjects(data);
//           })
//           .catch((error) => {console.error("error fetching projects", error)})
//   })

//   return (
//     <>
//       <Carousel className="parent-project" autoplay>
//         {projects.map((project) => (
//           <div className="project-data" style={{display: "flex"}}>
//             <div key={project.projectTitle} className="left-div">
//               <h1 className="project-name">{project.projectTitle}</h1>
//               <p className="project-description">{project.projectDescription}</p>
//               <a href={project.ProjectLink} className="project-link">{project.projectLink}</a>
//               <a href={project.GithubLink} className="github-link">{project.githubLink}</a>
//             </div>
//             <div className="right-div">
//               <img src={img} alt="" className="project-img"/>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </>
//   );
// };
