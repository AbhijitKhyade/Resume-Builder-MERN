import React, { useEffect, useRef, useState } from "react";
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
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import { addExperience, updateExperience, deleteExperience } from "../redux/experienceSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Beenhere } from "@mui/icons-material";
import { showSuccessToast } from "./ToastNotifications";
import ReactQuill from 'react-quill'; // Import Quill editor
import 'react-quill/dist/quill.snow.css'; // Import Quill's default styles
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Experience = () => {
  const dispatch = useDispatch();
  const currentExperiences = useSelector((state) => state.experienceDetails);
  const [showInputFields, setShowInputFields] = useState(false);

  // Local state to hold profile data temporarily
  const [experienceData, setExperienceData] = useState(currentExperiences);

  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (index, event, content) => {
    if (event) {
      const { name, value } = event.target;
      setExperienceData((prevData) => {
        const newProjects = [...prevData];
        newProjects[index] = { ...newProjects[index], [name]: value };
        return newProjects;
      });
      dispatch(updateExperience({ index, field: name, value }));
    } else {
      setExperienceData((prevData) => {
        const newProjects = [...prevData];
        newProjects[index] = { ...newProjects[index], desc: content };
        return newProjects;
      });
      dispatch(updateExperience({ index, field: "desc", value: content }));
    }
  };



  const handleAddExperience = () => {
    dispatch(addExperience());
    setShowInputFields(true);
  };

  const handleDeleteExperience = (index) => {
    dispatch(deleteExperience((index)));
    setShowInputFields(false);
  };

  const containerStyle = {
    marginTop: "30",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const handleSave = () => {
    console.log('exp data', experienceData);

    // Assuming projectData is an array of objects with fields to update
    const updates = experienceData.map((experience, index) => {
      return Object.keys(experience).map(field => ({
        index,
        field,
        value: experience[field]
      }));
    }).flat();

    // console.log('updates', updates);

    updates.forEach(update => {
      dispatch(updateExperience(update)); // Dispatch the action with each update
    });

    showSuccessToast("Experience details saved successfully");
    setShowWarning(false);  // Hide warning message after save
  };

  const handleNavigate = (e) => {
    setShowWarning(true);  // Show warning message

  };


  useEffect(() => {
    // Sync the local projectData with Redux state whenever it's updated
    setExperienceData(currentExperiences);
  }, [currentExperiences]);

  const contentExpr = (
    <div>
      <p>1. Provide  description of the project.</p>
      <p>eg.</p>
      <p>Streamlined project management process using MERN stack.</p>
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
              Experience Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        {
          experienceData?.map((experience, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ marginTop: "8px" }}>
                  Experience {index + 1}
                </Typography>
                <IconButton onClick={() => handleDeleteExperience(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
              <Grid container spacing={1} alignItems="center" lg={12}>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <Typography variant="h6" sx={{ marginTop: "8px" }}>
                    Role
                  </Typography>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name="role"
                    label="Role"
                    style={{ width: "100%" }}
                    value={experienceData[index].role}
                    onChange={(event) => handleInputChange(index, event)}

                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" lg={12}>
                <Grid item md={12} sm={12} xs={12} lg={12}>
                  <Typography variant="h6" sx={{ marginTop: "8px" }}>
                    Institute/Organisation
                  </Typography>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name="institute"
                    label="Institute/Organisation"
                    style={{ width: "100%" }}
                    value={experienceData[index].institute}
                    onChange={(event) => handleInputChange(index, event)}

                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" lg={12} mb={2}>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <Typography variant="h6" sx={{ marginTop: "8px" }}>
                    Start Date
                  </Typography>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="start_date"
                    // label="Start Date"
                    type="date"
                    style={{ width: "100%" }}
                    value={experienceData[index].start_date}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </Grid>
                <Grid item md={6} sm={12} xs={12} lg={6}>
                  <Typography variant="h6" sx={{ marginTop: "8px" }}>
                    End Date
                  </Typography>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="end_date"
                    // label="End Date"
                    type="date"
                    style={{ width: "100%" }}
                    value={experienceData[index].end_date}
                    onChange={(event) => handleInputChange(index, event)}
                    
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} alignItems="center" lg={12}>
                <Grid item md={12} sm={12} xs={12} lg={12}>

                  <Typography variant="h6" sx={{ marginTop: "8px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ display: 'flex', gap: 3, alignItems: 'center' }}>Description
                    </p>

                    <p>
                      <Tooltip
                        title={<Box sx={{ p: 1, fontSize: '0.9rem' }}>{contentExpr}</Box>}
                        placement="top"
                        arrow
                      >
                        <p style={{ fontSize: '1rem' }}><i class="fa-solid fa-circle-info"></i></p>
                      </Tooltip>
                    </p>
                  </Typography>

                  <ReactQuill
                    value={experienceData[index].desc}
                    onChange={(value) => handleInputChange(index, { target: { name: "desc", value } })}
                    name="desc"
                    required
                    theme="snow"
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </div>
          ))
        }
        <Button
          variant="contained"
          sx={{
            marginTop: "8px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
            float: 'right'
          }}
          onClick={handleAddExperience}
        >
          Add Experience
        </Button>
      </CardContent >

      <Grid container spacing={2} alignItems="center" lg={12} >
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
          <Link to={'/projects'} style={linkStyle}>
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
          <Link to={'/skills'} style={linkStyle}>
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
            Please save your experience details before proceeding.
          </Typography>
        </div>
      </Grid>
    </div >
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

export default Experience;
