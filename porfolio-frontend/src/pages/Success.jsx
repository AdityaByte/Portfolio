import React, { useState } from "react";
import "../styles/pages/Success.css"

export const Success = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    projectLink: "",
    githubLink: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("projectLink", data.projectLink);
    formData.append("githubLink", data.githubLink);
    if (file) formData.append("file", file);

    try {
      const response = await fetch(apiUrl + "/addProject", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
      }

      alert("Project submitted successfully...");
    } catch (error) {
      console.log(error);
      alert("Error occurred. Check console.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add Your Project</h1>
      <form onSubmit={handleForm} className="project-form">
        <input
          placeholder="Title"
          onChange={handleChange}
          type="text"
          name="title"
          value={data.title}
          className="form-input"
        />
        <textarea
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={data.description}
          className="form-textarea"
        />
        <input
          placeholder="Project Link"
          onChange={handleChange}
          type="url"
          value={data.projectLink}
          name="projectLink"
          className="form-input"
        />
        <input
          placeholder="GitHub Link"
          onChange={handleChange}
          type="url"
          value={data.githubLink}
          name="githubLink"
          className="form-input"
        />
        <input
          id="file-upload"
          onChange={handleFileChange}
          type="file"
          name="file"
          accept="image/*"
          className="file-input"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};