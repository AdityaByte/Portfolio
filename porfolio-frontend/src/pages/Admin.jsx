import React from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

export const Admin = () => {

    const [data, setData] = useState({
        username: "",
        password: "",
      });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };

    const handleForm = async (e) => {
        e.preventDefault();

        const apiURL = import.meta.env.VITE_BACKEND_API_URL;        
        try {
            console.log(apiURL);
            const response = await fetch(apiURL+"/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Response:", result);
                navigate("/admin/success");
            } 
            else {
                console.log(data)
                console.log(response)
                console.error("Failed to send data");
            }  
        }
        catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <>
            <div className="admin-container">
                <form onSubmit={handleForm} method="get">
                    <h1>Admin Credentials</h1>
                    <input onChange={handleChange} value={data.username} name="username" type="text" placeholder="Username" required/>
                    <input onChange={handleChange} value={data.password} name="password" type="password" placeholder="password" required/>
                    <input type="submit"/>
                </form>
            </div>
        </>
    );
}