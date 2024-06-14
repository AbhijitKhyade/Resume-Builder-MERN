import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import Template1 from '../components/ResumeTemplates/Template1';
import { useSelector } from 'react-redux';

const ResumeViewer = () => {
  const profile = useSelector((state) => state.profileDetails);
  const [pdfDataUri, setPdfDataUri] = useState(null);
  const [resumeData, setResumeData] = useState({
    name: `${profile.firstName} ${profile.lastName}`,
    email: `${profile.email}`,
    phone: `${profile.mobile}`,
    experience: [
      {
        position: "Software Engineer",
        company: "Tech Company Inc.",
        duration: "2016 - Present",
        responsibilities: [
          "Developed scalable web applications using...",
          "Collaborated with cross-functional teams..."
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Example",
        year: "2015"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "SQL"],
    projects: [
      {
        name: "Project A",
        description: "Developed a responsive web application...",
        year: "2023"
      }
    ],
    achievements: [
      "Award for Best Performance in Software Development, 2022",
      "Published paper on advanced web technologies in international journal"
    ]
  });

  useEffect(() => {
    // When resumeData changes, generate and update PDF
    generatePdf();
  }, [resumeData]);

  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const { R, G, B } = rgb(0, 0, 0);
    const fontSize = 12;
    const lineHeight = 18;

    let y = 750;

    const drawText = (text, x, y, style = {}) => {
      const defaultStyle = {
        fontSize: 12,
        color: rgb(0, 0, 0),
        ...style
      };
      page.drawText(text, { x, y, size: defaultStyle.fontSize, color: defaultStyle.color });
    };

    // Draw Name with .name-heading style
    drawText(resumeData.name, 50, y, { fontSize: 18, color: rgb(1 / 1, 0 / 1, 1 / 1), fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 });
    y -= lineHeight;

    // Draw Email and Phone with .user-detail and .data styles
    drawText(`Email: ${resumeData.email}`, 50, y, { fontSize: 12, color: rgb(0, 0, 0) });
    y -= lineHeight;
    drawText(`Phone: ${resumeData.phone}`, 50, y, { fontSize: 12, color: rgb(0, 0, 0) });
    y -= lineHeight * 2;

    // Experience Section
    drawText("Experience:", 50, y, { fontSize: 14, color: rgb(1, 0, 0) });
    y -= lineHeight;
    resumeData.experience.forEach((exp, index) => {
      drawText(`${exp.position} at ${exp.company} (${exp.duration})`, 70, y, { fontSize: 12, color: rgb(0, 0, 0) });
      y -= lineHeight;
      exp.responsibilities.forEach(responsibility => {
        drawText(`- ${responsibility}`, 90, y, { fontSize: 12, color: rgb(0, 0, 0) });
        y -= lineHeight;
      });
    });
    y -= lineHeight * 2;

    // Education Section
    drawText("Education:", 50, y, { fontSize: 14, color: rgb(1, 0, 0) });
    y -= lineHeight;
    resumeData.education.forEach((edu, index) => {
      drawText(`${edu.degree} - ${edu.institution} (${edu.year})`, 70, y, { fontSize: 12, color: rgb(0, 0, 0) });
      y -= lineHeight;
    });
    y -= lineHeight * 2;

    // Skills Section
    drawText("Skills:", 50, y, { fontSize: 14, color: rgb(1, 0, 0) });
    y -= lineHeight;
    resumeData.skills.forEach(skill => {
      drawText(`- ${skill}`, 70, y, { fontSize: 12, color: rgb(0, 0, 0) });
      y -= lineHeight;
    });
    y -= lineHeight * 2;

    // Projects Section
    drawText("Projects:", 50, y, { fontSize: 14, color: rgb(1, 0, 0) });
    y -= lineHeight;
    resumeData.projects.forEach(project => {
      drawText(`${project.name} (${project.year}) - ${project.description}`, 70, y, { fontSize: 12, color: rgb(0, 0, 0) });
      y -= lineHeight;
    });
    y -= lineHeight * 2;

    // Achievements Section
    drawText("Achievements:", 50, y, { fontSize: 14, color: rgb(1, 0, 0) });
    y -= lineHeight;
    resumeData.achievements.forEach(achievement => {
      drawText(`- ${achievement}`, 70, y, { fontSize: 12, color: rgb(0, 0, 0) });
      y -= lineHeight;
    });

    const pdfBytes = await pdfDoc.save();
    const pdfDataUri = await createDataUri(pdfBytes);
    setPdfDataUri(pdfDataUri);
  };

  const createDataUri = async (bytes) => {
    const base64String = arrayBufferToBase64(bytes);
    return `data:application/pdf;base64,${base64String}`;
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Left Column - Resume Editor */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
        <Template1 />
      </div>

      {/* Right Column - PDF Viewer */}
      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <h2>PDF Viewer</h2>
        <div style={{ width: '100%', height: '100%' }}>
          {pdfDataUri && (
            <iframe
              title="PDF Viewer"
              id="pdf"
              src={pdfDataUri}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
