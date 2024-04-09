import { Box, Button, Paper, Typography } from "@mui/material";
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
import "../../styles/resumetemplate1.css";

export default function Template1() {
  const profile = useSelector((state) => state.profileDetails);
  const education = useSelector((state) => state.educationDetails);
  const projects = useSelector((state) => state.projectDetails);
  const experience = useSelector((state) => state.experienceDetails);
  const extraDetails = useSelector((state) => state.extraDetails);
  const [congratsVisible, setCongratsVisible] = useState(false);


  const handleDownload = () => {
    try {
      const resumeContainer =
        document.getElementsByClassName("resume-container")[0];

      if (resumeContainer) {
        // Use html2pdf to generate the PDF
        html2pdf(resumeContainer, {
          margin: 10,
          filename: "resume.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 3 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        }).then((pdf) => {
          // Save the PDF using FileSaver.js
          saveAs(pdf, "resume.pdf");
        });
      }
      setCongratsVisible(true);
      setTimeout(() => setCongratsVisible(false), 3000);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  const customStyle = {
    width: "715px",
    height: "auto",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={congratsVisible ? 200 : 0}
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
            <div className="title-container">
              <h1 className="heading">
                {profile.firstName} {profile.lastName}
              </h1>
            </div>
            <div className="resume-content">
              {/* Left section */}
              <div className="left-section">
                {/* User Info */}
                <div className="user-info">
                  {profile.mobile && (
                    <div className="user-info-item">
                      <div className="icon">
                        <span>
                          <i className="fa-solid fa-phone" />
                        </span>
                      </div>
                      <div className="content">
                        <p>{profile.mobile}</p>
                      </div>
                    </div>
                  )}

                  {profile.email && (
                    <div className="user-info-item">
                      <div className="icon">
                        <span>
                          <i className="fa-solid fa-envelope" />
                        </span>
                      </div>
                      <div className="content">
                        <p>{profile.email}</p>
                      </div>
                    </div>
                  )}

                  {profile.linkedIn && (
                    <div className="user-info-item">
                      <div className="icon" style={{ fontSize: 18 }}>
                        <span>
                          <i className="fa-brands fa-linkedin" />
                        </span>
                      </div>
                      <div className="content">
                        <p>{profile.linkedIn}</p>
                      </div>
                    </div>
                  )}

                  {profile.address && (
                    <div className="user-info-item">
                      <div className="icon" style={{ fontSize: 18 }}>
                        <span>
                          <i className="fa-solid fa-location-dot" />
                        </span>
                      </div>
                      <div className="content">
                        <p>{profile.address}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Education */}
                <div className="education-info">
                  <div className="heading">Education</div>
                  {/* Part 1 */}
                  <div className="info">
                    <div className="college">{education.college}</div>
                    <div className="clg-details">
                      <p>
                        {education.year} {education.branch} Engineering
                      </p>
                      <p>
                        <span>
                          {education.startYear}-{education.endYear} |{" "}
                          {education.city}
                        </span>
                      </p>
                      <p>CGPA: {education.grades}</p>
                    </div>
                  </div>
                  {/* Part 2 */}
                  <div className="info">
                    <div className="higher-clg">{education.higherCollege}</div>
                    <div className="clg-details">
                      <p>
                        <span>
                          {education.startYear2}-{education.endYear2} |{" "}
                          {education.city2}
                        </span>
                      </p>
                      <p>Class XII Percentage: {education.percentage}%</p>
                    </div>
                  </div>
                  {/* Part 3 */}
                  <div className="info">
                    <div className="school">{education.school}</div>
                    <div className="school-details">
                      <p>
                        <span>
                          {" "}
                          {education.startYear3}-{education.endYear3} |{" "}
                          {education.city3}
                        </span>
                      </p>
                      <p>Class X Percentage: {education.percentage2}%</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {extraDetails?.skills && extraDetails?.skills.length > 0 && (
                  <div className="skills">
                    <div className="heading">Skills</div>
                    <div className="skillSets">
                      {extraDetails?.skills?.map((skill, index) => (
                        <div className="value" key={index}>
                          &#11049; {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hobbies */}
                {extraDetails?.hobbies && extraDetails.hobbies.length > 0 && (
                  <div className="hobbies">
                    <div className="heading">Hobbies</div>
                    <div className="hobby-list">
                      {extraDetails.hobbies.map((hobby, index) => (
                        <div className="value" key={index}>
                          &#11049; {hobby}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}

                <div className="links">
                  <div className="heading">Links</div>
                  <div className="linkSets">
                    <div className="link-item">
                      {profile.github && (
                        <>
                          <img src={github} alt="github" />
                          <div className="ls">
                            <Link className="link">{profile.github}</Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="link-item">
                      {profile.leetcode && (
                        <>
                          <img src={leetcode} alt="leetcode" />
                          <div className="ls">
                            <Link className="link">{profile.leetcode}</Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="link-item">
                      {profile.codechef && (
                        <>
                          <img src={codechef} alt="codechef" />
                          <div className="ls">
                            <Link className="link">{profile.codechef}</Link>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="link-item">
                      {profile.codeforces && (
                        <>
                          <img src={codeforces} alt="codeforces" />
                          <div className="ls">
                            <Link className="link">{profile.codeforces}</Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Extra Curricular */}
                {extraDetails?.extraCoCurricular &&
                  extraDetails.extraCoCurricular.length > 0 && (
                    <div className="extra-curricular">
                      <div className="heading">Extra Curricular</div>
                      <div className="extra-list">
                        {extraDetails?.extraCoCurricular?.map(
                          (extra, index) => (
                            <div className="value" key={index}>
                              &#11049; {extra}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Right section */}
              <div className="right-section">
                {/* About me */}
                <div className="about-me">
                  <div className="heading">About Me</div>
                  <p className="content">{profile.aboutMe}</p>
                </div>

                {/* Experience */}

                {experience?.length > 0 && (
                  <div className="experience">
                    <div className="heading">Experience</div>
                    <div className="expr-list">
                      <div className="lists">
                        {experience.map((expr, index) => (
                          <>
                            <div key={index} className="name">
                              {expr.institute}
                            </div>
                            <div className="content">
                              <ul>
                                {expr?.desc?.split('\n')?.map((line, index) => (
                                  <li key={index}>{line}</li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects?.length > 0 && (
                  <div className="projects">
                    <div className="heading">Projects</div>
                    <div className="pro-list">
                      <div className="lists">
                        {projects?.map((project, index) => (
                          <>
                            <div key={index} className="name">
                              {project.title}
                            </div>
                            <p className="content">
                              <ul>
                                {project?.description?.split('\n')?.map((line, index) => (
                                  <li key={index}>{line}</li>
                                ))}
                              </ul>
                            </p>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {extraDetails?.achievements && extraDetails?.achievements.length > 0 && (
                  <div className="achievements">
                    <div className="heading">Achievements</div>
                    <div className="list">
                      {extraDetails?.achievements?.map((achieve, index) => (
                        <div key={index}>&#11049; {achieve}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Box>
        </Paper>

        <Button
          variant="contained"
          sx={{ margin: "20px", borderRadius: "20px" , width: "12rem" }}
          onClick={handleDownload}
          endIcon={<DownloadIcon />}
          className="download-button"
        >
          Download
        </Button>
      </Box>
    </>
  );
}
