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
  addAchievements,
  updateSkills,
  updateAchievements,
  updateExtraCoCurricular,
  addExtraCoCurricular,
  deleteSkills,
  deleteAchievements,
  deleteExtraCoCurricular,
  deleteCoreSubjects,
  updateCoreSubjects,
  addCoreSubjects
} from "../redux/extraDetailsSlice";

import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { BASE_URL } from "../api";

const ExtraDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const extraDetails = useSelector((state) => state.extraDetails);
  const profileData = useSelector((state) => state.profileDetails);
  const educationalData = useSelector((state) => state.educationDetails);
  const projectData = useSelector((state) => state.projectDetails);
  const experienceData = useSelector((state) => state.experienceDetails);
  const extraDetailsData = useSelector((state) => state.extraDetails);
  const [loading, setLoading] = useState(false);
  const handleAddItem = (type) => {
    if (type === "achievements") {
      dispatch(addAchievements());
    } else if (type === "extraCoCurricular") {
      dispatch(addExtraCoCurricular());
    } else if (type === "languages") {
      dispatch(addSkills({ type: "languages" }));
    } else if (type === "web") {
      dispatch(addSkills({ type: "web" }));
    } else if (type === "webFrameworks") {
      dispatch(addSkills({ type: "webFrameworks" }));
    } else if (type === "databases") {
      dispatch(addSkills({ type: "databases" }));
    } else if (type === "other") {
      dispatch(addSkills({ type: "other" }));
    } else if (type === "coreSubjects") {
      dispatch(addCoreSubjects());
    }

  };

  const handleInputChange = (index, type, value) => {
    if (type === "languages" || type === "web" || type === "webFrameworks" || type === "databases" || type === "other") {
      dispatch(updateSkills({ type, index, value }));
    } else if (type === "achievements") {
      dispatch(updateAchievements({ index, value }));
    } else if (type === "extraCoCurricular") {
      dispatch(updateExtraCoCurricular({ index, value }));
    } else if (type === "coreSubjects") {
      dispatch(updateCoreSubjects({ index, value }));
    }

  };

  const handleDeleteItem = (index, type) => {
    if (type === "achievements") {
      dispatch(deleteAchievements(index));
    } else if (type === "extraCoCurricular") {
      dispatch(deleteExtraCoCurricular(index));
    } else if (type === "languages" || type === "web" || type === "webFrameworks" || type === "databases" || type === "other") {  // Combine conditions
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

  const coresubject = (
    <div>
      <p>Core Subjects</p>
      <ul>
        <li>
          Data Structures and Algorithms
        </li>
        <li>
          Operating Systems
        </li>
        <li>
          Database Management Systems
        </li>
        <li>
          Computer Networks  etc.
        </li>
        <li>
          Object Oriented Programming  etc.
        </li>
      </ul>
    </div>
  )

  const handleSave = async () => {
    setLoading(true);
    const resumeData = {
      profile: profileData,
      education: educationalData,
      projects: projectData,
      experience: experienceData,
      extraDetails: extraDetailsData,
    };
    // console.log("resume data: ", resumeData);
    try {
      const response = await axios.post(`${BASE_URL}/data/resume-data?id=${currentUser._id}`, { resumeData }, {
        headers: {
          authorization: currentUser.token,
        },
      });
      console.log("response: ", response.data);
      toast.success("Data Saved Successfully!", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in addResumeData:", error);
    }

  };



  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Extra Details
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
                Languages
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
              {extraDetails?.skills?.languages?.map((language, index) => (
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
                      handleInputChange(index, "languages", e.target.value)
                    }
                  />
                  <IconButton onClick={() => handleDeleteItem(index, "languages")}>
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
              onClick={() => handleAddItem("languages")}
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
              {extraDetails?.skills?.web?.map((webSkill, index) => (
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
                      handleInputChange(index, "web", e.target.value)
                    }
                  />
                  <IconButton onClick={() => handleDeleteItem(index, "web")}>
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
              onClick={() => handleAddItem("web")}
            >
              Add Web Skill
            </Button>
          </div>

          {/* WebFramework Skills*/}
          <div>
            <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', gap: '4px', alignItems: 'center', paddingLeft: '10px' }}>
              <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                Web Frameworks/Libraries
                <Tooltip
                  title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{"eg: React, Angular, nextjs, Bootstrap"}</Box>}
                  placement="top"
                  arrow
                >
                  <p style={{ fontSize: '1rem' }}> <i class="fa-solid fa-circle-info"></i></p>
                </Tooltip>
              </p>
            </Typography>
            <Grid container spacing={2} alignItems="center" lg={12}>
              {extraDetails?.skills?.webFrameworks?.map((webFrame, index) => (
                <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }} >
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={`webFrame${index + 1}`}
                    label={`Web Framework ${index + 1}`}
                    style={{ width: "100%" }}
                    value={webFrame}
                    onChange={(e) =>
                      handleInputChange(index, "webFrameworks", e.target.value)
                    }
                  />
                  <IconButton onClick={() => handleDeleteItem(index, "webFrameworks")}>
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
              onClick={() => handleAddItem("webFrameworks")}
            >
              Add WebFrameworks Skill
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
              {extraDetails?.skills?.databases?.map((data, index) => (
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

          {/* Other Skills*/}
          <div>
            <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', gap: '4px', alignItems: 'center', paddingLeft: '10px' }}>
              <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                Other Skills
                <Tooltip
                  title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{"eg: Leadership, Management,Teamwork"}</Box>}
                  placement="top"
                  arrow
                >
                  <p style={{ fontSize: '1rem' }}> <i class="fa-solid fa-circle-info"></i></p>
                </Tooltip>
              </p>
            </Typography>
            <Grid container spacing={2} alignItems="center" lg={12}>
              {extraDetails?.skills?.other?.map((or, index) => (
                <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }} >
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={`or ${index + 1}`}
                    label={`Other ${index + 1}`}
                    style={{ width: "100%" }}
                    value={or}
                    onChange={(e) =>
                      handleInputChange(index, "other", e.target.value)
                    }
                  />
                  <IconButton onClick={() => handleDeleteItem(index, "other")}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained" sx={{
                marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
              }}
              onClick={() => handleAddItem("other")}
            >
              Add Other Skills
            </Button>
          </div>
        </div>
        {/* <hr style={{ margin: '10px 0 10px 0' }} /> */}

        {/* Achievements */}
        <div>
          <Typography variant="h5" sx={{ marginTop: "8px" }}>
            Achievements
          </Typography>
          <Grid container spacing={2} alignItems="center" lg={12} >
            {extraDetails?.achievements?.map((achievement, index) => (
              <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name={`achievement${index + 1}`}
                  label={`Achievement ${index + 1}`}
                  style={{ width: "100%" }}
                  value={achievement}
                  onChange={(e) =>
                    handleInputChange(index, "achievements", e.target.value)
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
                <IconButton onClick={() => handleDeleteItem(index, "achievements")}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained" sx={{
              marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
            }}
            onClick={() => handleAddItem("achievements")}
          >
            Add Achievement
          </Button>
        </div>
        {/* <hr style={{ margin: '10px 0 10px 0' }} /> */}

        {/* Extra Curricular Activities */}
        <div>
          <Typography variant="h5" sx={{ marginTop: "8px" }}>
            Extra Curricular Activities
          </Typography>
          <Grid container spacing={2} alignItems="center" lg={12}>
            {extraDetails?.extraCoCurricular?.map((extraCurricular, index) => (
              <Grid item md={4} sm={6} xs={12} key={index} style={{ display: 'flex', gap: '4px' }}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name={`extraCurricular${index + 1}`}
                  label={`Extra-Curricular ${index + 1}`}
                  style={{ width: "100%" }}
                  value={extraCurricular}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "extraCoCurricular",
                      e.target.value
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <AutoAwesomeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton onClick={() => handleDeleteItem(index, "extraCoCurricular")}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained" sx={{
              marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
            }}
            onClick={() => handleAddItem("extraCoCurricular")}
          >
            Add Activities
          </Button>
        </div>

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

      <p style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>*Please save your data to get edited next time</p>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <Button
          variant="contained" sx={{
            marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
          }}
          onClick={() => handleSave()}
        >
          Save Your Data
        </Button>
      </div>

      <Grid container spacing={2} alignItems="center" lg={12} >
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
          <Link to={'/experience'} style={linkStyle}>
            <ArrowBackIcon style={iconStyle} />
            <h4>Experience Section</h4>
          </Link>
          <Link to={'/templates'} style={linkStyle}>
            <h4>Resume Templates</h4>
            <ArrowForwardIcon style={iconStyle} />
          </Link>
        </Grid>
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