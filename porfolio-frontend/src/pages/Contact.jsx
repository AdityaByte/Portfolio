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
            <input onChange={handleChange} type="text" name="fullname" value={data.fullname} placeholder="Enter Full Name" />
            <input onChange={handleChange} type="email" name="email" value={data.email} placeholder="Enter Email"/>
            <textarea onChange={handleChange} name="query" id="" cols="30" rows="10" value={data.query} placeholder="Query"></textarea>
            <ErrorMessage>{error}</ErrorMessage>
            <button type="submit">Contact me</button>
        </Form>
      </ContactDivParent> 
    </>);
}

const ContactDivParent = styled.div`
    width: "100vw";
    height: "90vh";
`;

const Title = styled.h1`
    
`;

const Form = styled.form`

`;

const ErrorMessage = styled.span`
    color: "red";
`;