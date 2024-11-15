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


import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { BASE_URL } from "../api";
import { Beenhere } from "@mui/icons-material";
import { deleteAchievement, updateAchievement } from "@/redux/achievementsSlice";
import { showSuccessToast } from "./ToastNotifications";

const Achievements = () => {

    const currentUser = useSelector((state) => state.user.currentUser);

    const currentAchievements = useSelector((state) => state.achievementsDetails);
    const currentProfile = useSelector((state) => state.profileDetails);
    const currentEducation = useSelector((state) => state.educationDetails);
    const currentProjects = useSelector((state) => state.projectDetails);
    const currentExperience = useSelector((state) => state.experienceDetails);
    const currentSkills = useSelector((state) => state.extraDetails);


    const [achievementsData, setAchievementsData] = useState(currentAchievements);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [showWarning, setShowWarning] = useState(false);

    const handleAddItem = (achievementType, value) => {
        setAchievementsData((prevAchivementData) => ({
            ...prevAchivementData,
            [achievementType]: [...(prevAchivementData[achievementType] || []), value], // Append to the correct type
        }));
    };


    const handleInputChange = (index, type, value) => {
        // if (type === "programmingLanguages" || type === "webDevelopment" || type === "databases" || type === "developerTools") {
        //   dispatch(updateSkills({ type, index, value }));
        // } else if (type === "coreSubjects") {
        //   dispatch(updateCoreSubjects({ index, value }));
        // }
        setAchievementsData((prevData) => {
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
        console.log('index', index);
        console.log('type', type);
        if (type === "achievements" || type === "extraCurricular") {  // Combine conditions
            dispatch(deleteAchievement({ type, index }));
        }
    };

    const containerStyle = {
        marginTop: "30",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    };



    const handleSave = async () => {
        // console.log('achievementsData', achievementsData);
        Object.keys(achievementsData).forEach((type) => {
            achievementsData[type].forEach((value, index) => {
                dispatch(updateAchievement({ type, index, value }));
            });
        });
        showSuccessToast('Achivements Data Saved Successfully!');
        setLoading(true);
        const resumeData = {
            profile: currentProfile,
            education: currentEducation,
            projects: currentProjects,
            experience: currentExperience,
            skills: currentSkills,
            achievements: currentAchievements,

        };
        console.log("resume data: ", resumeData);
        try {
            const response = await axios.post(`${BASE_URL}/data/resume-data?id=${currentUser._id}`, { resumeData }, {
                headers: {
                    authorization: currentUser.token,
                },
            });
            console.log("response: ", response.data);

            setTimeout(() => {
                showSuccessToast('Resume Data saved to Database Successfully!');
            }, 2500);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error in addResumeData:", error);
        }




    };

    const handleNavigate = (e) => {

    };

    useEffect(() => {
        // Sync the local projectData with Redux state whenever it's updated
        setAchievementsData(currentAchievements);
    }, [currentAchievements]);




    return (
        <div style={containerStyle}>
            <Card>
                <CardHeader
                    title={
                        <Typography variant="h5" align="center" fontWeight="bold">
                            Achievements Details
                        </Typography>
                    }
                />
            </Card>
            <CardContent>

                {/* Achievements */}
                <div>
                    <Typography variant="h5" sx={{ marginTop: "8px" }}>
                        Achievements
                    </Typography>
                    <Grid container spacing={2} alignItems="center" lg={12} >
                        {achievementsData?.achievements?.map((achievement, index) => (
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
                        {achievementsData?.extraCurricular?.map((extraCurricular, index) => (
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
                                            "extraCurricular",
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
                                <IconButton onClick={() => handleDeleteItem(index, "extraCurricular")}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        variant="contained" sx={{
                            marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
                        }}
                        onClick={() => handleAddItem("extraCurricular")}
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
            </CardContent >



            <Grid container spacing={2} alignItems="center" lg={12} >
                <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
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
                    <Link to={'/templates'} style={linkStyle}>
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
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    mt: '-20px'
                }}>
                    <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
                        Please save your achievements details before proceeding.
                    </Typography>
                    <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
                        Note: Please save your Data to database to retrive it next time.
                    </Typography>
                </div>

            </Grid >
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

export default Achievements;