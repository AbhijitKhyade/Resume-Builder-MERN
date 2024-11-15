import { Box, Button, Paper, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import Confetti from "react-confetti";
import github from "../../assets/github.png";
import leetcode from "../../assets/leetcode.png";
import codechef from "../../assets/codechef.png";
import codeforces from "../../assets/codeforces.png";
import DownloadIcon from "@mui/icons-material/Download";
import "../../styles/resumetemplate1.css";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from "moment";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
// import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
import Feedback from "../Feedback";
import axios from "axios";
import { BASE_URL } from "@/api";
import { showSuccessToast } from "../ToastNotifications";


export default function Template1() {
  const ref = useRef();
  const currentUser = useSelector((state) => state.user.currentUser);
  const profile = useSelector((state) => state.profileDetails);
  const education = useSelector((state) => state.educationDetails);
  const projects = useSelector((state) => state.projectDetails);
  const experience = useSelector((state) => state.experienceDetails);
  const extraDetails = useSelector((state) => state.extraDetails);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [feedbackShown, setFeedbackShown] = useState(false);

  useEffect(() => {
    const feedbackAlreadyShown = localStorage.getItem('feedbackShown');
    if (feedbackAlreadyShown) {
      setFeedbackShown(true);
    }
  }, []);

  

  const handleDownload = async () => {
    try {
      setLoading(true);
      // Send a GET request with the response type set to 'arraybuffer'
      const response = await axios.get(`${BASE_URL}/data/generate-resume`, {
        params: {
          userId: currentUser._id // Sending currentUser._id as a query parameter
        },
        responseType: 'arraybuffer' // Ensures the response is in binary format (PDF)
      });


      console.log('PDF response received', response);

      // Convert the arraybuffer to a Blob
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab to view it
      window.open(pdfUrl, '_blank');

      // Optionally, create a download link and trigger the download
      // const downloadLink = document.createElement('a');
      // downloadLink.href = pdfUrl;
      // downloadLink.download = 'resume.pdf'; // Set default download file name
      // downloadLink.click();

    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const customStyle = {
    width: "100%",
    maxWidth: "800px",
    // margin: "auto",
    height: "1123px",
    maxHeight: "1123px",
    padding: "0.2rem 0.2rem 0.1rem 0.2rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",

  };

  const returnLinks = {
    profile: "/profile",
    education: "/education",
    projects: "/projects",
    experience: "/experience",
    extraDetails: "/extraDetails",
  }

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={congratsVisible ? 600 : 0}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "2vw",
          flexGrow: 1,
        }}
      >
        <Paper elevation={2} style={customStyle} ref={ref}>
          <Box sx={{ flexShrink: 4 }}>
            <div class="resume-container">
              {/* Heading Section  */}
              <section class="heading-section">
                <h1 class="name">Abhijit Khyade</h1>
                {/* Contact Info */}
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

              {/* <!-- Main Content --> */}
              <div class="main-content">
                <div class="left-section">
                  {/* <!-- Experience Section --> */}
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

                  {/* <!-- Projects Section --> */}
                  <section class="projects-section">
                    {/* <!-- Section Heading --> */}
                    <div class="head">
                      <h3>
                        <span>Pro</span>jects
                        <span class="line"></span>
                      </h3>
                    </div>
                    {/* <!-- Projects Content --> */}
                    <div class="projects-content">
                      {/* <!-- Project Item: District Insights --> */}
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

                      {/* <!-- Project Item: Resume Builder --> */}
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

                      {/* <!-- Project Item: Imaginfiy --> */}
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

                  {/* <!-- Achievements Section --> */}
                  <section class="achievements-section">
                    {/* <!-- Section Heading --> */}
                    <div class="head">
                      <h3>
                        <span>Ach</span>ievements
                        <span class="line"></span>
                      </h3>
                    </div>
                    {/* <!-- Achievements Content --> */}
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
                  {/* <!-- Education Section --> */}
                  <section class="education-section">
                    <div class="head">
                      <h3>
                        <span>Edu</span>cation
                        <span class="line"></span>
                      </h3>
                    </div>
                    <div class="education-content">
                      {/* <!-- College current --> */}
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
                      {/* <!-- College 12th --> */}
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
                      {/* <!-- 10th School --> */}
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
                  {/* <!-- Skills --> */}
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

                  {/* <!-- Coding Profile --> */}
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
          </Box>
        </Paper>


        <Button
          variant="contained"
          sx={{
            margin: "20px",
            borderRadius: "20px",
            width: "12rem",
            backgroundColor: "var(--btn)",
            color: 'black',
            '&:hover': { backgroundColor: "var(--btnHover)" }
          }}
          onClick={handleDownload}
          endIcon={<DownloadIcon />}
          className="download-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? ( // Conditionally render loading indicator
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Download"
          )}
        </Button>
        <Feedback open={open} handleClose={handleClose} />
      </Box>
    </>
  )
};
