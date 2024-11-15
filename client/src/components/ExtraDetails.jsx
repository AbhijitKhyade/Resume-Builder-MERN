import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Box
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import InterestsIcon from "@mui/icons-material/Interests";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addSkills,
  updateSkills,
  deleteSkills,
  deleteCoreSubjects,
  updateCoreSubjects,
  addCoreSubjects,
  clearExtraDetails
} from "../redux/extraDetailsSlice";

import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { BASE_URL } from "../api";
import { Beenhere } from "@mui/icons-material";
import { showSuccessToast } from "./ToastNotifications";

const ExtraDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const currentSkills = useSelector((state) => state.extraDetails);

  const [skillsData, setSkillsData] = useState(currentSkills);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [showWarning, setShowWarning] = useState(false);

  const handleAddItem = (skillType, value) => {
    setSkillsData((prevSkillsData) => ({
      ...prevSkillsData,
      [skillType]: [...(prevSkillsData[skillType] || []), value], // Append to the correct type
    }));
  };


  const handleInputChange = (index, type, value) => {
    // if (type === "programmingLanguages" || type === "webDevelopment" || type === "databases" || type === "developerTools") {
    //   dispatch(updateSkills({ type, index, value }));
    // } else if (type === "coreSubjects") {
    //   dispatch(updateCoreSubjects({ index, value }));
    // }
    setSkillsData((prevData) => {
      return {
        ...prevData,
        [type]: prevData[type].map((item, i) => {
          if (i === index) {
            return value;
          }
          return item;
        }),
      };
    });

    // dispatch(updateSkills({ type, index, value }));
  };

  const handleDeleteItem = (index, type) => {
    if (type === "programmingLanguages" || type === "webDevelopment" || type === "databases" || type === "developerTools") {  // Combine conditions
      dispatch(deleteSkills({ type, index }));
    } else if (type === "coreSubjects") {
      dispatch(deleteCoreSubjects(index));
    }
  };

  const containerStyle = {
    marginTop: "30",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };



  const handleSave = async () => {
    // setLoading(true);
    // const resumeData = {
    //   profile: profileData,
    //   education: educationalData,
    //   projects: projectData,
    //   experience: experienceData,
    //   extraDetails: extraDetailsData,
    // };
    // // console.log("resume data: ", resumeData);
    // try {
    //   const response = await axios.post(`${BASE_URL}/data/resume-data?id=${currentUser._id}`, { resumeData }, {
    //     headers: {
    //       authorization: currentUser.token,
    //     },
    //   });
    //   console.log("response: ", response.data);
    //   toast.success("Data Saved Successfully!", {
    //     position: "top-left",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.error("Error in addResumeData:", error);
    // }

    console.log('skillsData:', skillsData);
    Object.keys(skillsData).forEach((type) => {
      skillsData[type].forEach((value, index) => {
        dispatch(updateSkills({ type, index, value }));
      });
    });
    showSuccessToast('Skills Data Saved Successfully!');

  };

  const handleNavigate = (e) => {

  };

  useEffect(() => {
    // Sync the local projectData with Redux state whenever it's updated
    setSkillsData(currentSkills);
  }, [currentSkills]);



  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Skills Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <Typography variant="h5" sx={{ marginTop: "8px", }}>
              Skills
            </Typography>
            <hr />
          </div>

          {/* languages skills */}
          <div>
            <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', gap: '4px', alignItems: 'center', paddingLeft: '10px' }}>
              <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                Programming Languages
                <Tooltip
                  title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{"eg: C, C++, Java, Python"}</Box>}
                  placement="top"
                  arrow
                >
                  <p style={{ fontSize: '1rem' }}> <i class="fa-solid fa-circle-info"></i></p>
                </Tooltip>
              </p>
            </Typography>
            <Grid container spacing={2} alignItems="center" lg={12} >
              {skillsData?.programmingLanguages?.map((language, index) => (
                <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }} >
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={`language${index + 1}`}
                    label={`Language ${index + 1}`}
                    style={{ width: "100%" }}
                    value={language}
                    onChange={(e) =>
                      handleInputChange(index, "programmingLanguages", e.target.value)
                    }
                  />
                  <IconButton onClick={() => handleDeleteItem(index, "programmingLanguages")}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              sx={{
                marginTop: "15px", marginRight: "8px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
              }}
              onClick={() => handleAddItem("programmingLanguages")}
            >
              Add Language
            </Button>
          </div>

          {/* Web Skills*/}
          <div>
            <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', gap: '4px', alignItems: 'center', paddingLeft: '10px' }}>
              <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                Web Development Skills
                <Tooltip
                  title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{"eg: HTML, CSS, JavaScript"}</Box>}
                  placement="top"
                  arrow
                >
                  <p style={{ fontSize: '1rem' }}> <i class="fa-solid fa-circle-info"></i></p>
                </Tooltip>
              </p>
            </Typography>
            <Grid container spacing={2} alignItems="center" lg={12}>
              {skillsData?.webDevelopment?.map((webSkill, index) => (
                <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }} >
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={`webSkill${index + 1}`}
                    label={`Web Skill ${index + 1}`}
                    style={{ width: "100%" }}
                    value={webSkill}
                    onChange={(e) =>
                      handleInputChange(index, "webDevelopment", e.target.value)
                    }
                  />
                  <IconButton onClick={() => handleDeleteItem(index, "webDevelopment")}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              sx={{
                marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
              }}
              onClick={() => handleAddItem("webDevelopment")}
            >
              Add Web Skill
            </Button>
          </div>

          {/* Database Skills*/}
          <div>
            <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', gap: '4px', alignItems: 'center', paddingLeft: '10px' }}>
              <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                Databases
                <Tooltip
                  title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{"eg: MySQL, MongoDB"}</Box>}
                  placement="top"
                  arrow
                >
                  <p style={{ fontSize: '1rem' }}> <i class="fa-solid fa-circle-info"></i></p>
                </Tooltip>
              </p>
            </Typography>
            <Grid container spacing={2} alignItems="center" lg={12}>
              {skillsData?.databases?.map((data, index) => (
                <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }} >
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={`data ${index + 1}`}
                    label={`Database ${index + 1}`}
                    style={{ width: "100%" }}
                    value={data}
                    onChange={(e) =>
                      handleInputChange(index, "databases", e.target.value)
                    }
                  />
                  <IconButton onClick={() => handleDeleteItem(index, "databases")}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              sx={{
                marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
              }}
              onClick={() => handleAddItem("databases")}
            >
              Add Databases Skill
            </Button>
          </div>

          {/* Developer Tools*/}
          <div>
            <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', gap: '4px', alignItems: 'center', paddingLeft: '10px' }}>
              <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                Developer Tools
                <Tooltip
                  title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{"eg: GitHub, Postman, Vscode, Git"}</Box>}
                  placement="top"
                  arrow
                >
                  <p style={{ fontSize: '1rem' }}> <i class="fa-solid fa-circle-info"></i></p>
                </Tooltip>
              </p>
            </Typography>
            <Grid container spacing={2} alignItems="center" lg={12}>
              {skillsData?.developerTools?.map((or, index) => (
                <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }} >
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={`or ${index + 1}`}
                    label={`developerTools ${index + 1}`}
                    style={{ width: "100%" }}
                    value={or}
                    onChange={(e) =>
                      handleInputChange(index, "developerTools", e.target.value)
                    }
                  />
                  <IconButton onClick={() => handleDeleteItem(index, "developerTools")}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained" sx={{
                marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
              }}
              onClick={() => handleAddItem("developerTools")}
            >
              Add Developer Tools
            </Button>
          </div>
        </div>
        {/* <hr style={{ margin: '10px 0 10px 0' }} /> */}

        {/* Core Subjects */}
        {/* <div>
          <Typography variant="h5" sx={{ marginTop: "8px" }}>
            Core Subjects
          </Typography>
          <Grid container spacing={2} alignItems="center" lg={12} >
            {extraDetails?.coreSubjects?.map((coresubject, index) => (
              <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name={`coresubject${index + 1}`}
                  label={`Core Subject ${index + 1}`}
                  style={{ width: "100%" }}
                  value={coresubject}
                  onChange={(e) =>
                    handleInputChange(index, "coreSubjects", e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EmojiEventsIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton onClick={() => handleDeleteItem(index, "coreSubjects")}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained" sx={{
                marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
              }}
            onClick={() => handleAddItem("coreSubjects")}
          >
            Add Core Subject
          </Button>
        </div> */}
      </CardContent>



      <Grid container spacing={2} alignItems="center" lg={12} >
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
          <Link to={'/experience'} style={linkStyle}>
            <Button
              onClick={handleNavigate}
              variant="contained"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                marginTop: '20px',
                px: '20px',
                backgroundColor: 'var(--btn)',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'var(--btnHover)'
                }
              }}
            >
              <ArrowBackIcon style={iconStyle} />
              Previous
            </Button>
          </Link>
          <div style={linkStyle}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                marginTop: '20px',
                px: '20px',
                backgroundColor: 'var(--btn)',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'var(--btnHover)'
                }
              }}
            >
              <Beenhere sx={{ fontSize: '20px' }} />
              Save
            </Button>
          </div>
          <Link to={'/achievements'} style={linkStyle}>
            <Button
              onClick={handleNavigate}
              variant="contained"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                marginTop: '20px',
                px: '20px',
                backgroundColor: 'var(--btn)',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'var(--btnHover)'
                }
              }}

            >
              Next
              <ArrowForwardIcon style={iconStyle} />
            </Button>
          </Link>

        </Grid>

        <div style={{
          display: 'flex', justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mt: '-20px'
        }}>
          <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
            Please save your skills details before proceeding.
          </Typography>
        </div>

      </Grid>
    </div>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  gap: '5px',
  transition: 'border-radius 0.3s', // Add transition for border-radius
  borderRadius: '4px', // Initial border-radius
  padding: '5px', // Add padding for hover effect
};

const containerStyles = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // backgroundColor: 'crimson',
  marginTop: '20px',
  paddingRight: '40px',
  paddingLeft: '40px',
};
const iconStyle = {
  verticalAlign: 'middle', // Align icon vertically with text
  marginLeft: '5px', // Add margin between icon and text
};

export default ExtraDetails;