import React, { useState } from "react";

export const Success = () => {

    const [data, setData] = useState({
        title : "",
        description : "",
        projectLink : "",
        githubLink: "",
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

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
            const response = await fetch(apiUrl+"/addProject", {
                method: "POST",
                body: formData,
            })

            if (!response.ok){
                throw new Error("Http error ! ${response.status}")
            }

            alert("Project submitted successfully...")
        }
        catch (error) {
            console.log(error)
            alert("Error occured check console")
        }

    };


    return (
        <>
            <form onSubmit={handleForm}>
                <input placeholder="title" onChange={handleChange} type="text" name="title" value={data.title}/>
                <textarea placeholder="description" onChange={handleChange} name="description" value={data.description} cols="30" rows="10"></textarea>
                <input placeholder="project link" onChange={handleChange} type="url" value={data.projectLink} name="projectLink" />
                <input placeholder="github link" onChange={handleChange} type="url" value={data.githubLink} name="githubLink" />
                <input placeholder="file-image" onChange={handleFileChange} type="file" value={data.file} name="file" accept="image/*"/>
                <input type="submit" />
            </form>
        </>
    );
}