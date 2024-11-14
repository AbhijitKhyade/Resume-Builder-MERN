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

const Achievements = () => {

    const containerStyle = {
        marginTop: "30",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    };

    const handleNavigate = (e) => {

    };

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
                        {/* {extraDetails?.achievements?.map((achievement, index) => (
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
                        ))} */}
                    </Grid>
                    <Button
                        variant="contained" sx={{
                            marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
                        }}
                    // onClick={() => handleAddItem("achievements")}
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
                        {/* {extraDetails?.extraCoCurricular?.map((extraCurricular, index) => (
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
                        ))} */}
                    </Grid>
                    <Button
                        variant="contained" sx={{
                            marginTop: "15px", backgroundColor: "var(--btn)", color: 'black', '&:hover': { backgroundColor: "var(--btnHover)" },
                        }}
                    // onClick={() => handleAddItem("extraCoCurricular")}
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
                            // onClick={handleSave}
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
                        Please save your achievements details before proceeding.
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

export default Achievements;