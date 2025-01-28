import React from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import styled from "styled-components";

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
            <AdminContainer>
                <AdminForm onSubmit={handleForm} method="get">
                    <AdminH1>Admin Credentials</AdminH1>
                    <AdminInput onChange={handleChange} value={data.username} name="username" type="text" placeholder="Username" required/>
                    <AdminInput onChange={handleChange} value={data.password} name="password" type="password" placeholder="password" required/>
                    <input style={SubmitButton} type="submit"/>
                </AdminForm>
            </AdminContainer>
        </>
    );
}
const AdminContainer = styled.div`
    width: 100vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    @media (max-width: 768px) {
        height: 90vh;
        padding: 10px;
    }
`;

const AdminForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 50%;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        width: 80%;
        height: 60%;
        justify-content: space-evenly;
    }
`;

const AdminH1 = styled.h1`
    color: white;
    font-size: 3rem;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const AdminInput = styled.input`
    width: 80%;
    height: 40px;
    border: 2px solid #475569;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: rgba(71, 85, 105, 0.1);
    color: #f1f5f9;
    outline: none;

    &:focus {
        border-color: #38bdf8;
        box-shadow: 0 0 5px #38bdf8;
    }

    &::placeholder {
        color: #94a3b8; 
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const SubmitButton = {
    width: "50%",
    padding: "10px 20px",
    background: "#94a3b8",
    borderRadius: "10px",
    fontSize: "small",
    color: "#334155",
    fontWeight: 800,
};
