import React from "react";
import { Box, Paper } from "@mui/material";
import "../styles/resumetemplate1.css"; // Import your CSS file for styles

const Data = ({ resumeData }) => {
    return (
        <Paper elevation={3} className="resume-container">
            <Box p={2}>
                {/* Name Heading */}
                <h1 className="name-heading">{resumeData.name}</h1>

                {/* User Details (Email and Phone) */}
                <div className="user-detail">
                    <div className="data">
                        <strong>Email:</strong> {resumeData.email}
                    </div>
                    <div className="data">
                        <strong>Phone:</strong> {resumeData.phone}
                    </div>
                </div>

                {/* Experience Section */}
                <h2 className="section-heading">Experience:</h2>
                {resumeData.experience.map((exp, index) => (
                    <div key={index}>
                        <h3>{exp.position} at {exp.company} ({exp.duration})</h3>
                        <ul>
                            {exp.responsibilities.map((responsibility, idx) => (
                                <li key={idx}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Education Section */}
                <h2 className="section-heading">Education:</h2>
                {resumeData.education.map((edu, index) => (
                    <div key={index}>
                        <p>{edu.degree} - {edu.institution} ({edu.year})</p>
                    </div>
                ))}

                {/* Skills Section */}
                <h2 className="section-heading">Skills:</h2>
                <ul>
                    {resumeData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>

                {/* Projects Section */}
                <h2 className="section-heading">Projects:</h2>
                {resumeData.projects.map((project, index) => (
                    <div key={index}>
                        <p>{project.name} ({project.year}) - {project.description}</p>
                    </div>
                ))}

                {/* Achievements Section */}
                <h2 className="section-heading">Achievements:</h2>
                <ul>
                    {resumeData.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </Box>
        </Paper>
    );
};

export default Data;
