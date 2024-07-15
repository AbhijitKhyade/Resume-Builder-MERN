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

export default function Template1() {
  const ref = useRef();
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


  const handleDownload = () => {
    try {
      const resumeContainer = document.querySelector(".resume-container");

      if (resumeContainer) {
        setLoading(true);
        const opt = {
          margin: 0.1,
          filename: 'user-resume.pdf',
          image: { type: 'jpeg', quality: 1.00 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Ensure proper page breaks
        };

        html2pdf().set(opt).from(resumeContainer).save().then(() => {
          setLoading(false); // End loading state after PDF is generated
          setCongratsVisible(true); // Trigger Confetti effect

          // Reset confetti after 5 seconds
          setTimeout(() => {
            setCongratsVisible(false);
          }, 5000);
        });
      } else {
        console.error("Resume container not found.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
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
    maxWidth: "794px",
    // margin: "auto",
    height: "1123px",
    maxHeight: "1123px",
    padding: "1rem 2rem 1rem 2rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    display: "flex",
    // justifyContent: "center",
    flexDirection: "column",
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
        <Paper className="resume-container" elevation={2} style={customStyle} ref={ref}>
          <Box sx={{ flexShrink: 4 }}>
            {/* Heading */}
            <h1 className="name-heading">
              {profile.firstName} {profile.lastName}
            </h1>
            <div className="user-detail">
              <div className="data">
                <p ><i className="fa-solid fa-phone" /></p>
                <p className="sub-heading">{profile.mobile}</p>
              </div>
              <div className="data">
                <p > <i className="fa-solid fa-envelope" /></p>
                <p className="sub-heading">{profile.email}</p>
              </div>
              <div className="data">
                <p > <i className="fa-solid fa-map-marker" /></p>
                <p className="sub-heading">{profile.address}</p>
              </div>

              {/* <p className="sub-heading">{profile.linkden}</p> */}
            </div>

            <div className="resume-content">
              {/* Left section */}
              <div className="left-section">

                {/* Education */}
                <div className="education-info">
                  <div className="heading">Education</div>
                  <hr />
                  {/* Part 1 */}
                  <div className="info">
                    <div className="college">{education.college}</div>
                    <div className="clg-details">
                      <div className="clg-degree">
                        {education.year} {education.branch} Engineering
                      </div>
                      <div className="meta-data">
                        <div className="dates">
                          <i className="fa-solid fa-calendar" />
                          {education.startYear}-{education.endYear}
                        </div>
                        <div className="locality">
                          <i className="fa-solid fa-map-marker" />
                          {education.city}
                        </div>
                      </div>
                      <div className="grade">
                        {education?.grades && <p>CGPA: {education?.grades}</p>}
                      </div>
                    </div>
                  </div>
                  {/* Part 2 */}
                  <div className="info">
                    <div className="higher-clg">{education.higherCollege}</div>
                    <div className="clg-details">
                      <div className="meta-data">
                        <div className="dates">
                          <i className="fa-solid fa-calendar" />
                          {education.startYear2}-{education.endYear2}
                        </div>
                        <div className="locality">
                          <i className="fa-solid fa-map-marker" />
                          {education.city2}
                        </div>
                      </div>
                      <div className="grade">
                        {education?.percentage && <p>Percentage: {education?.percentage}%</p>}
                      </div>

                    </div>
                  </div>
                  {/* Part 3 */}
                  <div className="info">
                    <div className="school">{education.school}</div>
                    <div className="school-details">
                      <div className="meta-data">
                        <div className="dates">
                          <i className="fa-solid fa-calendar" />
                          {education.startYear3}-{education.endYear3}
                        </div>
                        <div className="locality">
                          <i className="fa-solid fa-map-marker" />
                          {education.city3}
                        </div>
                      </div>
                      <div className="grade">
                        {education?.percentage2 && <p>Percentage: {education?.percentage2}%</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {extraDetails?.skills.languages && extraDetails?.skills.languages.length > 0 && (
                  <div className="skills">
                    <div className="heading">Skills</div>
                    <hr />
                    {extraDetails?.skills.languages?.length > 0 && (
                      <>
                        <h4 className="skill-names">Languages:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.languages?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {extraDetails?.skills.web?.length > 0 && (
                      <>
                        <h4 className="skill-names">Web:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.web?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {extraDetails?.skills.webFrameworks?.length > 0 && (
                      <>
                        <h4 className="skill-names">WebFramworks:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.webFrameworks?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {extraDetails?.skills.databases?.length > 0 && (
                      <>
                        <h4 className="skill-names">Databases:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.databases?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {extraDetails?.skills.other?.length > 0 && (
                      <>
                        <h4 className="skill-names">Other:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.other?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Links */}

                <div className="links">
                  <div className="heading">Coding Profile</div>
                  <hr />
                  <div className="linkSets">
                    <div className="link-item">
                      {profile.github && (
                        <>
                          <img src={github} alt="github" />
                          <div className="ls">
                            <Link to={profile.github} className="link" target="_blank" rel="noopener noreferrer">
                              {profile.lastName.length > 6 ? (
                                <p>{profile.firstName?.toLowerCase()}</p>
                              ) : (
                                <>
                                  <p>{profile.firstName[0]?.toLowerCase()}_</p>
                                  <span>{profile.lastName?.toLowerCase()}</span>
                                </>
                              )}
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="link-item">
                      {profile.leetcode && (
                        <>
                          <img src={leetcode} alt="leetcode" />
                          <div className="ls">
                            <Link to={profile.leetcode} className="link" target="_blank" rel="noopener noreferrer">
                              {profile.lastName.length > 6 ? (
                                <p>{profile.firstName?.toLowerCase()}</p>
                              ) : (
                                <>
                                  <p>{profile.firstName[0]?.toLowerCase()}_</p>
                                  <span>{profile.lastName?.toLowerCase()}</span>
                                </>
                              )}
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="link-item">
                      {profile.codechef && (
                        <>
                          <img src={codechef} alt="codechef" />
                          <div className="ls">
                            <Link to={profile.codechef} className="link" target="_blank" rel="noopener noreferrer">
                              {profile.lastName.length > 6 ? (
                                <p>{profile.firstName?.toLowerCase()}</p>
                              ) : (
                                <>
                                  <p>{profile.firstName[0]?.toLowerCase()}_</p>
                                  <span>{profile.lastName?.toLowerCase()}</span>
                                </>
                              )}
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="link-item">
                      {profile.codeforces && (
                        <>
                          <img src={codeforces} alt="codeforces" />
                          <div className="ls">
                            <Link to={profile.codeforces} className="link" target="_blank" rel="noopener noreferrer">
                              {profile.lastName.length > 6 ? (
                                <p>{profile.firstName?.toLowerCase()}</p>
                              ) : (
                                <>
                                  <p>{profile.firstName[0]?.toLowerCase()}_</p>
                                  <span>{profile.lastName?.toLowerCase()}</span>
                                </>
                              )}
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Core Subjects */}

                <div className="subjects">
                  <div className="heading">Core Subjects</div>
                  <hr />
                  <div className="subject-list">
                    {/* {extraDetails?.coreSubjects?.map((subject, index) => ( */}
                    <ul>
                      {/* <li key={index}>{subject}</li> */}
                      <li>Data Structures and Algorithms</li>
                      {/* <li>Object Oriented Programming</li> */}
                      <li>Database Management System</li>
                      <li>Operating System</li>
                    </ul>
                    {/* ))} */}
                  </div>
                </div>


              </div>

              {/* Right section */}
              <div className="right-section">

                {/* Experience */}
                {experience?.length > 0 && (
                  <div className="experience">
                    <div className="heading">Experience</div>
                    <hr />
                    <div className="expr-list">
                      <div className="lists">
                        {experience.map((exp, index) => (
                          <div key={index}>
                            <div className='role-date'>
                              <p id="role">{exp.role}</p>
                              <p id="date">
                                {moment(exp.start_date).format("MMM-YYYY")} - {moment(exp.end_date).format("MMM-YYYY")}
                              </p>
                            </div>
                            <div className="company">
                              <p>At {exp.institute}</p>
                            </div>
                            <div className="expr-desc">
                              <ul>
                                {exp?.desc?.split('\n')?.map((line, index) => (
                                  <li key={index}>{line}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                  <div className="projects">
                    <h2 className="project-heading">Projects</h2>
                    <hr />
                    <div className="project-sections">
                      {projects.map((project, index) => (
                        <div key={index}>
                          <div className="project-names">
                            <p>{project.title}</p>
                            <p id="link-icons"><Link to={project.link}><i class="fa-solid fa-link"></i></Link></p>
                          </div>
                          <p id="tech-stacks">{project.techStack}</p>
                          <div className="project-descs">
                            <ul>
                              {project?.description?.split('\n')?.map((line, index) => (
                                <li key={index}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {extraDetails?.achievements && extraDetails?.achievements.length > 0 && (
                  <div className="achievements">
                    <div className="heading">Achievements</div>
                    <hr />
                    <div className="list">
                      {extraDetails?.achievements?.map((achieve, index) => (
                        <ul>
                          <li key={index}> {achieve}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extra Curricular */}
                {extraDetails?.extraCoCurricular &&
                  extraDetails.extraCoCurricular.length > 0 && (
                    <div className="extra-curricular">
                      <div className="heading">Extra Curricular</div>
                      <hr />
                      <div className="extra-list">
                        {extraDetails?.extraCoCurricular?.map(
                          (extra, index) => (
                            <ul>
                              <li className="value" key={index}>
                                {extra}
                              </li>
                            </ul>
                          )
                        )}
                      </div>
                    </div>
                  )}
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

        {/* <Box sx={{ position: 'relative', top: '-1000px', left: '1160px', width: '100%', }} className='return-links'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {returnLinks && Object.keys(returnLinks).map((key, index) => (
              <Link to={returnLinks[key]} key={index} className="return-link">
                <Button
                  variant="outlined"
                  sx={{
                    margin: "5px", borderRadius: "20px", width: "12rem", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  {key}
                </Button>
              </Link>
            ))}
          </div>
        </Box> */}

        {/* <Box sx={{ position: 'fixed', top: '100px', left: '10px', width: '100%', zIndex: 999 }} className='return-links'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {returnLinks && Object.keys(returnLinks).map((key, index) => (
              <Link to={returnLinks[key]} key={index} className="return-link">
                <Button
                  variant="outlined"
                  sx={{ margin: "5px", borderRadius: "20px", width: "12rem" }}
                  startIcon={<ArrowBackIcon />}
                >
                  {key}
                </Button>
              </Link>
            ))}
          </div>
        </Box> */}
      </Box>
    </>
  );
}
