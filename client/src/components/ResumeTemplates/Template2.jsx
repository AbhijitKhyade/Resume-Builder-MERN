import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
import Confetti from "react-confetti";
import github from "../../assets/github.png";
import leetcode from "../../assets/leetcode.png";
import codechef from "../../assets/codechef.png";
import codeforces from "../../assets/codeforces.png";
import DownloadIcon from "@mui/icons-material/Download";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import "../../styles/resumetemplate2.css";
import { Link } from 'react-router-dom';
import moment from 'moment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


export default function Template2() {
  const profile = useSelector((state) => state.profileDetails);
  const education = useSelector((state) => state.educationDetails);
  const projects = useSelector((state) => state.projectDetails);
  const experience = useSelector((state) => state.experienceDetails);
  const extraDetails = useSelector((state) => state.extraDetails);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } // Ensure proper page breaks
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


  const customStyle = {
    width: "100%",
    maxWidth: "794px",
    margin: "auto",
    height: "1123px",
    maxHeight: "1123px",
    padding: "1rem 2rem 1rem 2rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    display: "flex",
    // justifyContent: "center",
    flexDirection: "column",
    // alignItems: "center",
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
        <Paper className="resume-container" elevation={2} style={customStyle}>
          <Box sx={{ flexShrink: 4 }}>
            {/* Heading */}
            <h1 className="user-name">
              {profile.firstName} {profile.lastName}
            </h1>
            <div className="user-details">
              <div className="data">
                <p ><i className="fa-solid fa-phone" /></p>
                <p className="sub-heading">{profile.mobile}</p>
              </div>
              <div className="data">
                <p > <i className="fa-solid fa-envelope" /></p>
                <p className="sub-heading">{profile.email}</p>
              </div>
              {profile.github && (
                <div className="link-coding">
                  <Link to={profile.github} target="_blank" rel="noopener noreferrer" className="linked">
                    <img src={github} alt="github" width={'20px'} height={'20px'} />
                    {profile.lastName.length > 6 ? (
                      <p>{profile.firstName?.toLowerCase()}_</p>
                    ) : (
                      <>
                        <p>{profile.firstName[0]?.toLowerCase()}_</p>
                        <span>{profile.lastName?.toLowerCase()}</span>
                      </>
                    )}
                  </Link>
                </div>
              )}
              {profile.leetcode && (
                <div className="link-coding">
                  <Link to={profile.leetcode} target="_blank" rel="noopener noreferrer" className="linked">
                    <img src={leetcode} alt="leetcode" width={'20px'} height={'20px'} />
                    {profile.lastName.length > 6 ? (
                      <p>{profile.firstName?.toLowerCase()}_</p>
                    ) : (
                      <>
                        <p>{profile.firstName[0]?.toLowerCase()}_</p>
                        <span>{profile.lastName?.toLowerCase()}</span>
                      </>
                    )}
                  </Link>
                </div>
              )}
              {profile.codechef && (
                <div className="link-coding">
                  <Link to={profile.codechef} target="_blank" rel="noopener noreferrer" className="linked">
                    <img src={codechef} alt="codechef" width={'20px'} height={'20px'} />
                    {profile.lastName.length > 6 ? (
                      <p>{profile.firstName?.toLowerCase()}_</p>
                    ) : (
                      <>
                        <p>{profile.firstName[0]?.toLowerCase()}_</p>
                        <span>{profile.lastName?.toLowerCase()}</span>
                      </>
                    )}
                  </Link>
                </div>
              )}
              {profile.codeforces && (
                <div className="link-coding">
                  <Link to={profile.codeforces} target="_blank" rel="noopener noreferrer" className="linked">
                    <img src={codeforces} alt="codeforces" width={'20px'} height={'20px'} />
                    {profile.lastName.length > 6 ? (
                      <p>{profile.firstName?.toLowerCase()}_</p>
                    ) : (
                      <>
                        <p>{profile.firstName[0]?.toLowerCase()}_</p>
                        <span>{profile.lastName?.toLowerCase()}</span>
                      </>
                    )}
                  </Link>
                </div>
              )}

              {/* <p className="sub-heading">{profile.linkden}</p> */}
            </div>

            <div className="resume-contents">
              {/* Experience */}
              {experience.length > 0 && (
                <div className="expr">
                  <h2 className="expr-title">Experience</h2>
                  <hr />
                  <div className="expr-section">
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
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div className="project-details">
                  <h2 className="project-title">Projects</h2>
                  <hr />
                  <div className="project-section">
                    {projects.map((project, index) => (
                      <div key={index}>
                        <div className="project-name">
                          <p>{project.title}</p>
                          <p id="link-icon"><Link to={project.link}><i class="fa-solid fa-link"></i></Link></p>
                          <p id="tech-stack">{project.techStack}</p>
                        </div>
                        <div className="project-desc">
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

              {/* Education */}

              <div className="edu-section">
                <h2 className="edu-title">Education</h2>
                <hr />
                {/* Part 1 */}
                <div className="clg-section-1">
                  <div className="info-1">
                    <div className="clg-name">
                      <p>{education?.college}</p>
                    </div>
                    <div className="degree">
                      <p>{education.field && education.branch && `${education.field} in ${education.branch}`}</p>
                    </div>
                  </div>
                  <div className="info-2">
                    <div className="year">
                      <p>{education.startYear && education.endYear && `${education.startYear} - ${education.endYear}`}</p>

                    </div>
                    <div className="cgpa">
                      {education?.grades && <p>CGPA: {education?.grades}</p>}
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
                {/* Part 2 */}
                <div className="clg-section-2">
                  <div className="info-1">
                    <div className="clg-name">
                      <p>{education?.higherCollege}</p>
                    </div>
                    <div className="degree">
                      <p>{education?.board1}</p>
                    </div>
                  </div>
                  <div className="info-2">
                    <div className="year">
                      <p>{education.startYear2 && education.endYear2 && `${education.startYear2} - ${education.endYear2}`}</p>
                    </div>
                    <div className="cgpa">
                      {education.percentage && <p>Per: {education.percentage}%</p>}
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
                {/* Part 3 */}
                <div className="clg-section-3">
                  <div className="info-1">
                    <div className="school-name">
                      <p>{education?.school}</p>
                    </div>
                    <div className="degree">
                      <p>{education?.board2}</p>
                    </div>
                  </div>
                  <div className="info-2">
                    <div className="year">
                      <p>{education.startYear3 && education.endYear3 && `${education.startYear3} - ${education.endYear3}`}</p>

                    </div>
                    <div className="cgpa">
                      {education.percentage2 && <p>Per: {education.percentage2}%</p>}
                    </div>
                  </div>
                </div>
              </div>


              {/* Skiils */}
              <div className="skill-section">
                <h2 className="skill-title">Skills</h2>
                <hr />
                {extraDetails?.skills.languages?.length > 0 && (
                  <div className="language-skill">
                    <span className="skill-name">Languages:</span>
                    {extraDetails?.skills.languages?.map((skill, index) => (
                      <span key={index}> {skill},</span>
                    ))}
                  </div>
                )}
                {extraDetails?.skills.web?.length > 0 && (
                  <div className="web-skill">
                    <span className="skill-name">Web: </span>
                    {extraDetails?.skills.web?.map((skill, index) => (
                      <span key={index}> {skill},</span>
                    ))}
                  </div>
                )}
                {extraDetails?.skills.webFrameworks?.length > 0 && (
                  <div className="webframework-skill">
                    <span className="skill-name">WebFrameworks: </span>
                    {extraDetails?.skills.webFrameworks?.map((skill, index) => (
                      <span key={index}> {skill},</span>
                    ))}
                  </div>
                )}
                {extraDetails?.skills.databases?.length > 0 && (
                  <div className="databases-skill">
                    <span className="skill-name">Databases:</span>
                    {extraDetails?.skills.databases?.map((skill, index) => (
                      <span key={index}> {skill},</span>
                    ))}
                  </div>
                )}
                {extraDetails?.skills.other?.length > 0 && (
                  <div className="other-skill">
                    <span className="skill-name">Other:</span>
                    {extraDetails?.skills.other?.map((skill, index) => (
                      <span key={index}> {skill},</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Achievements and ExtraCurricular */}
              {(extraDetails.achievements.length > 0 || extraDetails.extraCoCurricular.length > 0) && (
                <div className="achievement-extracurricular">
                  <h2 className="achieve-title">Achievements and ExtraCurricular</h2>
                  <hr />
                  <div className="achieve-list">
                    {extraDetails.achievements.map((achieve, index) => (
                      <ul key={index}>
                        <li>{achieve}</li>
                      </ul>
                    ))}
                    {extraDetails.extraCoCurricular.map((achieve, index) => (
                      <ul key={index}>
                        <li>{achieve}</li>
                      </ul>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </Box>
        </Paper >

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


      </Box >
    </>
  );
}

