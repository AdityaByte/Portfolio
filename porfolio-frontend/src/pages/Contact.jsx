import React, { useState } from "react";
import styled from "styled-components";

export const ContactPage = () => {

    const backendaApiURL = import.meta.env.VITE_BACKEND_API_URL;

    const [data, setData] = useState({
        "fullname": "",
        "email": "",
        "query": "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const checkValueOfForm = async (e) => {

        if (data.fullname.trim().length <= 6) {
            setError("Enter a valid full name");
            return;
        }

        setError("");
        await handleContactForm(e);   
    }

    const handleContactForm = async (e) => {
        e.preventDefault();

        try{

            const response = await fetch(backendaApiURL + "/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                console.log("Getting some error in the backend", response);
                setError("Getting some error in the backend");
                return;
            }

            const result = await response.json();
            alert("Query sent successfully....");
            setData({ fullname: "", email: "", query: "" });
        }
        catch(error) {
            console.log("Getting some error while handling form => ",error);
            setError("Something went wrong, please try again later.");
        }
    };

    return (<>
      <ContactDivParent>
        <Title>
            Contact me
        </Title>
        <Form onSubmit={checkValueOfForm} method="POST">
            <Input onChange={handleChange} type="text" name="fullname" value={data.fullname} placeholder="Enter Full Name" />
            <Input onChange={handleChange} type="email" name="email" value={data.email} placeholder="Enter Email"/>
            <TextArea onChange={handleChange} name="query" id="" cols="30" rows="10" value={data.query} placeholder="Query"></TextArea>
            <ErrorMessage>{error}</ErrorMessage>
            <button style={ButtonStyle} type="submit">Submit</button>
        </Form>
      </ContactDivParent> 
    </>);
}

const ContactDivParent = styled.div`
    width: 100vw;
    height: 90vh;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2%;
`;

const Title = styled.h1`
    font-size: 3rem;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Form = styled.form`
    height: 60%;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    @media (max-width: 768px) {
        height: 80%;
        width: 90%;
    }
`;

const ErrorMessage = styled.span`
    color: "red";
`;

const Input = styled.input`
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 10px;
    background: rgba(100, 116, 139, 0.1);
    border: 1px solid #64748b;
    color: #f1f5f9;
    outline: none;

    &::placeholder {
        color: #64748b;
    }

    &:focus {
        border-color: #fff;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const TextArea = styled.textarea`
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 10px;
    background: rgba(100, 116, 139, 0.1);
    border: 1px solid #64748b;
    color: #f1f5f9;
    outline: none;
    resize: none;

    &::placeholder {
        color: #64748b;
    }

    &:focus {
        border-color: #fff;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const ButtonStyle = {
    fontSize: "1rem",
    padding: "10px 20px",
    borderRadius: "10px",
    backgroundColor: "#334155",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#f1f5f9",
}