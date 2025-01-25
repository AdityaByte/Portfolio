import React from "react";
import { Worker } from "@react-pdf-viewer/core"; // PDF.js worker
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Resume = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div className="resume-container" style={{ backgroundColor: "#8A34A6", display: "flex", alignItems: "center", justifyContent: "center", padding: "2%"}}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <div style={{ height: "90vh" , width: "95%", borderRadius: "8px"}}>
                    <Viewer
                        fileUrl="resume.pdf"
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </div>
            </Worker>
        </div>
    );
};

export default Resume;
