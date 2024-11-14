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
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { updateProject, addProject, deleteProject } from "../redux/projectSlice";
import Tooltip from "@mui/material/Tooltip";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { showSuccessToast } from "./ToastNotifications";
import { Beenhere } from "@mui/icons-material";

import ReactQuill from 'react-quill'; // Import Quill editor
import 'react-quill/dist/quill.snow.css'; // Import Quill's default styles

const Projects = () => {
  const dispatch = useDispatch();
  const currentProjects = useSelector((state) => state.projectDetails);
  const [showInputFields, setShowInputFields] = useState(false);

  // Local state to hold profile data temporarily
  const [projectData, setProjectData] = useState(currentProjects);

  // Check if profile is saved from Redux state
  const isProjectUpdated = currentProjects.isProjectUpdated;
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setProjectData((prevData) => {
      const newProjects = [...prevData];
      newProjects[index] = { ...newProjects[index], [name]: value };
      return newProjects;
    });
  };

  const handleAddProject = () => {
    dispatch(addProject());
    setShowInputFields(true);
  };

  const handleDeleteProject = (index) => {
    dispatch(deleteProject(index));
    setShowInputFields(false);
  };


  const handleSave = () => {
    console.log('projectData', projectData);

    // Assuming projectData is an array of objects with fields to update
    const updates = projectData.map((project, index) => {
      return Object.keys(project).map(field => ({
        index,
        field,
        value: project[field]
      }));
    }).flat();

    // console.log('updates', updates);

    updates.forEach(update => {
      dispatch(updateProject(update)); // Dispatch the action with each update
    });

    showSuccessToast("Project details saved successfully");
    setShowWarning(false);  // Hide warning message after save
  };

  const handleNavigate = (e) => {
    setShowWarning(true);  // Show warning message

  };


  useEffect(() => {
    // Sync the local projectData with Redux state whenever it's updated
    setProjectData(currentProjects);
  }, [currentProjects]);





  const containerStyle = {
    marginTop: "30",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const content = (
    <div>
      <p>1. Provide  description of the project.</p>
      <p>eg.</p>
      <p>Streamlined resume creation process using MERN stack.</p>
      <p> Integrated Material-UI and React for intuitive user interface.</p>
      <p>Implemented Redux for centralized state management and seamless data flow.</p>
    </div>
  );


  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Projects Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        {projectData?.map((project, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5" sx={{ marginTop: "8px" }}>
                Project {index + 1}
              </Typography>
              <IconButton onClick={() => handleDeleteProject(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </div>
            <Grid container spacing={1} alignItems="center" lg={12}>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <Typography variant="h6" sx={{ marginTop: "8px" }}>
                  Project Title
                </Typography>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="title"
                  label={`Project Title`}
                  style={{ width: "100%" }}
                  value={projectData[index].title || ""}
                  onChange={(event) => handleInputChange(index, event)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <TitleIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>Project Description

                  </p>

                  <Tooltip
                    title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{content}</Box>}
                    placement="top"
                    arrow
                  >
                    <p style={{ fontSize: '1rem' }}><i class="fa-solid fa-circle-info"></i></p>
                  </Tooltip>
                </Typography>
                <ReactQuill
                  value={projectData[index].description || ""}
                  onChange={(value) => handleInputChange(index, { target: { name: "description", value } })}
                  name="description"
                  required
                  theme="snow"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <Typography variant="h6" sx={{ marginTop: "8px" }}>
                  Project Link(Hosted)
                </Typography>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="link"
                  label={`Project Link`}
                  style={{ width: "100%" }}
                  value={projectData[index].link || ""}
                  onChange={(event) => handleInputChange(index, event)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <LinkIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>Project Github Url </p>
                </Typography>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="projectGithubUrl"
                  label={`Project Github Url`}
                  style={{ width: "100%" }}
                  value={projectData[index].projectGithubUrl || ""}
                  onChange={(event) => handleInputChange(index, event)}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton>
                //         <LinkIcon />
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
                />
              </Grid>
            </Grid>
          </div>
        ))}
        <Button
          variant="contained"
          sx={{
            marginTop: "8px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
            float: 'right'
          }}
          onClick={handleAddProject}
        >
          Add Project
        </Button>
      </CardContent>


      <Grid container spacing={2} alignItems="center" lg={12} >
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
          <Link to={'/education'} style={linkStyle}>
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
            Please save your project details before proceeding.
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


export default Projects;
