import { Box, Button, Link, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Education from "./../components/Education";
import Projects from "../components/Projects";
import Experience from "./../components/Experience";
import ExtraDetails from "../components/ExtraDetails";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("profile");
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  //handling next
  const handleNext = () => {
    if (activeComponent === "profile") {
      setActiveComponent("educationalDetails");
    } else if (activeComponent === "educationalDetails") {
      setActiveComponent("projectsDetails");
    } else if (activeComponent === "projectsDetails") {
      setActiveComponent("experienceDetails");
    } else if (activeComponent === "experienceDetails") {
      setActiveComponent("extraDetails");
    }
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasSeenWelcome");

    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem("hasSeenWelcome", true);
    }
  }, []);

  // Effect to hide the welcome message after 3 seconds
  useEffect(() => {
    let timeout;
    if (showWelcome) {
      timeout = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [showWelcome]);

  //handling back
  const handleBack = () => {
    if (activeComponent === "educationalDetails") {
      setActiveComponent("profile");
    } else if (activeComponent === "projectsDetails") {
      setActiveComponent("educationalDetails");
    } else if (activeComponent === "experienceDetails") {
      setActiveComponent("projectsDetails");
    } else if (activeComponent === "extraDetails") {
      setActiveComponent("experienceDetails");
    }
  };

  const customStyle = {
    margin: "10px",
    height: "auto",
    width: "80%",
    padding: "20px",
    backgroundColor: "#fff",
  };
  const containerStyle = {
    marginTop: "30",
    display: "flex",
    justifyContent: "center",
  };

  const getPageNumber = () => {
    switch (activeComponent) {
      case "profile":
        return 1;
      case "educationalDetails":
        return 2;
      case "projectsDetails":
        return 3;
      case "experienceDetails":
        return 4;
      case "extraDetails":
        return 5;
      default:
        return 1;
    }
  };

  const handleResume = () => {
    navigate("/resume/template=1");
  };

  return (
    <Box style={containerStyle}>
      <Paper elevation={3} style={customStyle}>
        {showWelcome && (
          <div className="welcome-container">
            <h1 className="welcome-text">Welcome!</h1>
          </div>
        )}
        {/* Render the appropriate step component based on the active step */}
        {activeComponent === "profile" && <Profile onNext={handleNext} />}
        {activeComponent === "educationalDetails" && (
          <Education onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "projectsDetails" && (
          <Projects onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "experienceDetails" && (
          <Experience onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "extraDetails" && (
          <ExtraDetails onBack={handleBack} />
        )}

        <div style={{ textAlign: "center", marginTop: 16, marginRight: 10 }}>
          {activeComponent !== "profile" && (
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ marginRight: "5px",borderRadius: "20px", width: "5rem" }}
            >
              Back
            </Button>
          )}
          {activeComponent !== "extraDetails" && (
            <Button variant="contained" onClick={handleNext} sx={{ borderRadius: "20px", width: "5rem" }}>
              Next
            </Button>
          )}

          <div style={{ textAlign: "center", marginTop: 16 }}>
            {activeComponent === "extraDetails" && (
              <>
                <Button variant="contained" onClick={handleResume}>
                  Review Your Resume
                </Button>
              </>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <p sx={{ fontWeight: "300px" }}>Page {getPageNumber()}</p>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default Home;
