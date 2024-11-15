const Resume = require("../models/resume.model");
const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const addResumeData = async (req, res) => {
  try {
    // Check if the request body contains necessary fields
    if (!req.body) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get the resume data and user's email from the request body
    const { resumeData } = req.body;
    // console.log('resume data: ', resumeData);
    const { id } = req.query;
    // console.log("Data:", id);

    // Find the resume data in the database based on the user's email
    const existingResume = await Resume.findOne({ userId: id });
    // console.log(existingResume);
    // If resume data already exists, update it 
    if (existingResume) {
      // Update the existing resume data with the new data
      existingResume.set(resumeData);
      await existingResume.save();
      // Send success response
      return res.status(200).json({ message: "Resume data updated successfully!" });
    }
    const newResumeData = {
      ...resumeData,
      userId: id
    };
    // If resume data doesn't exist, save it as new
    const newResume = new Resume(newResumeData);
    await newResume.save();

    // Send success response
    return res.status(200).json({ message: "Resume data added successfully!" });
  } catch (error) {
    // Log the error for debugging
    console.error("Error in addResumeData:", error);
    // Send appropriate error response
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getAllResumeData = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "Missing required fields" });
    // Get all the resume data from the database
    const resumeData = await Resume.find({ userId: id });
    // Send the resume data as response
    return res.status(200).json({ resumeData });
  } catch (error) {
    // Log the error for debugging
    console.error("Error in getAllResumeData:", error);
    // Send appropriate error response
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const generateResume = async (req, res) => {

  try {
    const userId = req.query.userId;
    const resumeData = await Resume.findOne({ userId: userId });
    // console.log('resume data: ', resumeData);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const htmlTemplate = `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>My Resume</title>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
  integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
  rel="stylesheet"
/>
<!-- <link rel="stylesheet" href="./template.css" /> -->
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Open Sans", sans-serif;
    background-color: white;
    /* border: 1px solid black; */
    padding: 20px;
    max-width: 800px;
    margin: auto;
  }
  /* Heading Section */
  .heading-section {
    text-align: center;
  }
  .heading-section .name {
    text-transform: uppercase;
    color: #262626;
    margin-bottom: 10px;
    font-size: 32px;
  }
  .contact-info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .contact-info .contact-icon {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #333;
    gap: 5px;
  }

  /* Main Content */
  .main-content {
    display: flex;
    gap: 20px;
    margin-top: 8px;
  }
  .left-section {
    /* flex: 2; */
    flex-basis: 70%;
    /* width: ; */
    /* background-color: #f4f4f4; */
    /* padding: 20px; */
    /* border-radius: 5px; */
  }

  /* Experience Section */

  .head h3 {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    display: flex;
    align-items: center;
  }

  .head h3 span {
    color: #5b32b4;
  }

  .head h3 .line {
    flex-grow: 1;
    border-bottom: 1px solid #333;
    margin-top: 14px;
    margin-left: 2px;
  }

  .job h4 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
  }

  .job h4 span {
    font-weight: normal;
    font-size: 12px;
    color: #666;
  }

  .job h5 {
    font-style: italic;
    color: #555;
    margin: 2px 0;
  }

  .job ul {
    margin: 2px 0;
    padding-left: 20px;
  }

  .job ul li {
    font-size: 14px;
    margin-bottom: 2px;
    color: #333;
    text-align: justify;
  }

  .job ul li b {
    color: #000;
  }

  /* Projects Section */
  /* .projects-section {
margin-top: 0px;
} */

  .projects-section .head h3 {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    display: flex;
    align-items: center;
  }

  .projects-section .head h3 span {
    color: #5b32b4;
  }

  .projects-section .head h3 .line {
    flex-grow: 1;
    border-bottom: 1px solid #333;
    margin-top: 14px;
    margin-left: 2px;
  }

  .projects-content .project h4 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    gap: 10px;
    color: #333;
  }

  .projects-content .project h4 .project-icons {
    font-size: 16px;
    color: #333;
  }

  .projects-content .project ul {
    margin: 2px 0;
    padding-left: 20px;
  }

  .projects-content .project ul li {
    font-size: 14px;
    margin-bottom: 3px;
    color: #333;
    text-align: justify;
  }

  .projects-content .project ul li b {
    color: #000;
  }

  /* Achievements Section */
  .achievements-section .head h3 {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    display: flex;
    align-items: center;
  }

  .achievements-section .head h3 span {
    color: #5b32b4;
  }

  .achievements-section .head h3 .line {
    flex-grow: 1;
    border-bottom: 1px solid #333;
    margin-top: 14px;
    margin-left: 2px;
  }

  .achievements-section .achievements-content ul {
    margin: 1px 0;
    padding-left: 20px;
  }

  .achievements-section .achievements-content ul li {
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
    text-align: justify;
  }

  .achievements-section .achievements-content ul li b {
    color: #000;
  }

  .right-section {
    flex: 1;
    /* background-color: #f4f4f4; */
    /* padding: 20px; */
    border-radius: 5px;
  }

  /* Education Section */
  .education-section .education-content .edu {
    margin-bottom: 10px;
    /* background-color: red; */
    /* border: 1px solid black; */
  }
  .education-section .education-content .edu h5 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .education-section .education-content .edu p {
    font-weight: normal;
    font-size: 12px;
    color: #666;
    margin-top: 2px;
    margin-bottom: 3px;
  }

  .education-section .education-content .edu .date-location {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 5px;
  }

  .education-section .education-content .edu .date-location .icons-content {
    display: flex;
    align-items: center;
    /* margin-right: 10px; */
  }

  .education-section .education-content .edu .date-location .icons-content {
    font-size: 13px;
    color: #333;
  }

  .education-section
    .education-content
    .edu
    .date-location
    .icons-content
    span {
    font-size: 10px;
    color: #333;
    margin-left: 3px;
  }

  .education-section .education-content .edu li {
    font-size: 12px;
    color: #333;
    margin-top: 2px;
    padding-left: 3px;
  }

  /* Skills */

  .skills-section .skills-content {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .programming h4 {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }

  .programming ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-left: 20px;
  }

  .programming ul li {
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
  }

  .development h4 {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }

  .development ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* gap: 11px; */
    padding-left: 20px;
  }

  .development ul li {
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
    margin-right: 20px;
    /* background-color: red; */
  }

  .database h4 {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }

  .database ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding-left: 20px;
  }

  .database ul li {
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
  }

  .developer-tools h4 {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }

  .developer-tools ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-left: 20px;
  }

  .developer-tools ul li {
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
    margin-right: 25px;
  }

  .knowledge-of h4 {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }

  .knowledge-of ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding-left: 20px;
  }

  .knowledge-of ul li {
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
  }

  /* Coding Profile */
  .coding-profile-section {
    margin-top: 10px;
  }

  .coding-profile-section .coding-profile-content ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding-left: 20px;
  }

  .coding-profile-section .coding-profile-content ul li {
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
  }
     .coding-profile-section .coding-profile-content ul li a {
    color: #5b32b4;
    /* text-decoration: none; */
  }
</style>
</head>
<body>
<div class="resume-container">
  <!-- Heading Section -->
  <section class="heading-section">
    <h1 class="name">Abhijit Khyade</h1>
    <!-- Contact Info -->
    <div class="contact-info">
      <span class="contact-icon">
        <i class="fas fa-phone"></i> +91-9356678182
      </span>
      |
      <span class="contact-icon">
        <i class="fa-solid fa-at"></i> abhikhyade@gmail.com
      </span>
      |
      <span class="contact-icon">
        <i class="fab fa-github"></i> Abhijit
      </span>
    </div>
  </section>

  <!-- Main Content -->
  <div class="main-content">
    <div class="left-section">
      <!-- Experience Section -->
      <section class="experience-section">
        <div class="head">
          <h3>
            <span>Exp</span>erience
            <span class="line"></span>
          </h3>
        </div>
        <div class="experience-content">
          <div class="job">
            <h4>
              Full Stack Developer Intern <span>Oct 2023 – Feb 2024</span>
            </h4>
            <h5>Pune Institute of Computer Technology</h5>
            <ul>
              <li>
                Developed a comprehensive
                <b>Teacher and Student Record Management System</b>
                facilitating 300 students and 40 staff members, streamlining
                essential information retrieval for committee activities.
              </li>
              <li>
                <b>Tech Stack:</b> React.js, Node.js, Express.js, MySQL,
                Material UI, Tailwind CSS, Material-Tailwind, Redux-Toolkit
              </li>
              <li>
                <b>Impact:</b> Improved operational efficiency through
                enhanced project management and streamlined processes,
                leading to significant productivity gains.
              </li>
            </ul>
          </div>
          <div class="job">
            <h4>
              Full Stack Developer Intern <span>Dec 2023 – Feb 2024</span>
            </h4>
            <h5>NullClass</h5>
            <ul>
              <li>
                Developed a <b>CodeQuest</b> platform incorporating advanced
                features such as login history tracking, multi-language
                support, a reward system, and subscription plans.
              </li>
              <li>
                <b>Tech Stack:</b> MERN (MongoDB, Express.js, React.js,
                Node.js), Stripe
              </li>
              <li>
                <b>Impact:</b> Enhanced user engagement and retention
                through the implementation of advanced features, leading to
                significant growth in both areas.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="projects-section">
        <!-- Section Heading -->
        <div class="head">
          <h3>
            <span>Pro</span>jects
            <span class="line"></span>
          </h3>
        </div>
        <!-- Projects Content -->
        <div class="projects-content">
          <!-- Project Item: District Insights -->
          <div class="project">
            <h4>
              <span>District Insights</span>
              <span class="project-icons">
                <i class="fab fa-github"></i> |
                <i class="fas fa-external-link-alt"></i>
              </span>
            </h4>
            <ul>
              <li>
                Designed and implemented a comprehensive
                <b>District Scheme Tracker</b> with dedicated modules for
                administrators, officers, and citizens to manage and oversee
                various government schemes.
              </li>
              <li>
                Enabled functionalities including scheme creation, parameter
                configuration, officer work tracking, and feedback
                collection from citizens, provides AI-driven insights about
                schemes.
              </li>
              <li>
                <b>Tech Stack:</b> MERN (MongoDB, Express.js, React.js,
                Node.js), Material UI, Tailwind CSS, Redux
              </li>
            </ul>
          </div>

          <!-- Project Item: Resume Builder -->
          <div class="project">
            <h4>
              Resume Builder
              <span class="project-icons">
                <i class="fab fa-github"></i> |
                <i class="fas fa-external-link-alt"></i>
              </span>
            </h4>
            <ul>
              <li>
                Built a <b>Resume Builder</b> application using the MERN
                stack with Redux for state management, featuring a
                user-friendly UI and impressive functionalities.
              </li>
              <li>
                <b>Tech Stack:</b> MERN (MongoDB, Express.js, React.js,
                Node.js), Redux, Firebase, Material-UI
              </li>
            </ul>
          </div>

          <!-- Project Item: Imaginfiy -->
          <div class="project">
            <h4>
              Imaginfy
              <span class="project-icons">
                <i class="fab fa-github"></i> |
                <i class="fas fa-external-link-alt"></i>
              </span>
            </h4>
            <ul>
              <li>
                Developed an AI-driven platform, <b>Imaginfiy</b>, featuring
                advanced image processing capabilities such as image
                restoration, recoloring, object removal, and generative
                filling.
              </li>
              <li>
                Integrated secure payment infrastructure and advanced image
                search functionalities.
              </li>
              <li>
                <b>Tech Stack:</b> NextJs, MongoDB, Clerk, Cloudinary,
                Stripe, Shadcn, TailwindCSS
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Achievements Section -->
      <section class="achievements-section">
        <!-- Section Heading -->
        <div class="head">
          <h3>
            <span>Ach</span>ievements
            <span class="line"></span>
          </h3>
        </div>
        <!-- Achievements Content -->
        <div class="achievements-content">
          <ul>
            <li>Attained a Leetcode rating of 1449</li>
            <li>
              Semi-finalist in the Indian College Chess Championship - 2024
            </li>
          </ul>
        </div>
      </section>
    </div>

    <div class="right-section">
      <!-- Education Section -->
      <section class="education-section">
        <div class="head">
          <h3>
            <span>Edu</span>cation
            <span class="line"></span>
          </h3>
        </div>
        <div class="education-content">
          <!-- College current -->
          <div class="edu">
            <h5>Pune Institute of <br />Computer Technology</h5>
            <p>BE-INFORMATION TECHNOLOGY</p>
            <div class="date-location">
              <div class="icons-content">
                <i class="fas fa-calendar-alt"></i>
                <span>2021 - 2025</span>
              </div>
              <div class="icons-content">
                <i class="fas fa-map-marker-alt"></i>
                <span>Pune</span>
              </div>
            </div>
            <li class="cgpa">Current CGPA : 9.33</li>
          </div>
          <!-- College 12th -->
          <div class="edu">
            <h5>Sangameshwar College, Solapur</h5>
            <p>PCM-MAHARASHTRA STATE BOARD</p>
            <div class="date-location">
              <div class="icons-content">
                <i class="fas fa-calendar-alt"></i>
                <span>2019 - 2021</span>
              </div>
              <div class="icons-content">
                <i class="fas fa-map-marker-alt"></i>
                <span>Solapur</span>
              </div>
            </div>
            <li>JEE MAINS Percentile - 96.41</li>
            <li>MHTCET Percentile - 99.40</li>
            <li>12th Percentage - 96.83%</li>
          </div>
          <!-- 10th School -->
          <div class="edu">
            <h5>Mahatma Phule Vidyalaya</h5>
            <p>MAHARASHTRA STATE BOARD</p>
            <div class="date-location">
              <div class="icons-content">
                <i class="fas fa-calendar-alt"></i>
                <span>2018 - 2019</span>
              </div>
              <div class="icons-content">
                <i class="fas fa-map-marker-alt"></i>
                <span>Solapur</span>
              </div>
            </div>
            <li>10th Percentage - 96.00%</li>
          </div>
        </div>
      </section>
      <!-- Skills -->
      <section class="skills-section">
        <div class="head">
          <h3>
            <span>Ski</span>lls
            <span class="line"></span>
          </h3>
        </div>
        <div class="skills-content">
          <div class="programming">
            <h4>Programming Languages</h4>
            <ul class="skills-sets">
              <li>C</li>
              <li>C++</li>
              <li>JAVA</li>
            </ul>
          </div>
          <div class="development">
            <h4>Development</h4>
            <ul class="skills-list">
              <li>HTML</li>
              <li>CSS</li>
              <li>ReactJS</li>
              <li>ExpressJS</li>
              <li>JavaScript</li>
              <li>Node JS</li>
              <li>TailwindCSS</li>
              <li>Bootstrap</li>
            </ul>
          </div>
          <div class="database">
            <h4>Database</h4>
            <ul>
              <li>MySQL</li>
              <li>MongoDB</li>
            </ul>
          </div>
          <div class="developer-tools">
            <h4>Developer Tools</h4>
            <ul>
              <li>Git</li>
              <li>GitHub</li>
              <li>VS Code</li>
              <li>Postman</li>
            </ul>
          </div>
          <div class="knowledge-of">
            <h4>Knowledge Of</h4>
            <ul>
              <li>Database Management System</li>
              <li>Object Oriented Programming</li>
              <li>Operating System</li>
              <li>Computer Networks</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Coding Profile -->
      <section class="coding-profile-section">
        <div class="head">
          <h3>
            <span>Cod</span>ing Profile
            <span class="line"></span>
          </h3>
        </div>
        <div class="coding-profile-content">
          <ul>
            <li>
              Codeforces:
              <a href="https://codeforces.com/profile/abhikhyade"
                >abhikhyade</a
              >
            </li>
            <li>
              Codechef:
              <a href="https://www.codechef.com/users/abhikhyade"
                >abhikhyade</a
              >
            </li>
            <li>
              Leetcode:
              <a href="https://leetcode.com/abhikhyade/">abhikhyade</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</div>
</body>
</html>

`

    await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });

    // Define the path to save the PDF temporarily
    const pdfPath = path.join(__dirname, 'resume.pdf');

    // Generate the PDF and save it to the specified path
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
    await browser.close();

    // Read the PDF file as a buffer
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Set appropriate headers to display the PDF in the browser
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="resume.pdf"');

    // Send the PDF buffer in the response
    res.send(pdfBuffer);

    // Optionally delete the PDF file after sending (optional cleanup)
    fs.unlinkSync(pdfPath);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
}

module.exports = { addResumeData, getAllResumeData, generateResume };
