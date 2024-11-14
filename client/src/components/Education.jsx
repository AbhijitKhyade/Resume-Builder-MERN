import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import GradeIcon from "@mui/icons-material/Grade";

import { useDispatch, useSelector } from "react-redux";
import { updateEducation } from "../redux/educationSlice";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { showSuccessToast } from "./ToastNotifications";
import { Beenhere } from "@mui/icons-material";

const Education = () => {
  const dispatch = useDispatch();
  const currentEducation = useSelector((state) => state.educationDetails);


  // Local state to hold profile data temporarily
  const [educationData, setEducationData] = useState(currentEducation);

  // Check if profile is saved from Redux state
  const isEducationUpdated = currentEducation.isEducationUpdated;
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('value', value);
    setEducationData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateEducation({ ...educationData, isEducationUpdated: true })); // Update profile and mark it as saved
    showSuccessToast("Education details saved successfully");
    setShowWarning(false);  // Hide warning message after save
  };

  const handleNavigate = (e) => {
    if (!isEducationUpdated) {
      e.preventDefault();  // Prevent navigation if profile is not saved
      setShowWarning(true);  // Show warning message
    }
  };


  const containerStyle = {
    marginTop: "30",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const years = Array.from({ length: 30 }, (_, index) => 2030 - index);

  const engineeringFields = [
    "CS",
    "IT",
    "EnTC",
    "Electrical",
    "Mechanical",
    "Civil",
    "Chemical",
  ];
  const otherFields = ["B.E.", "B.Tech", "BCA", "Bsc", "MBA", "M.Tech"];

  const higherCollegeBoard = ["Maharashtra State Board", "CBSE", "ICSE", "Diploma"];
  const schoolBoard = ["Maharashtra State Board", "CBSE", "ICSE"];

  const streams = ['PCM', 'PCB', 'PCMB'];

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Educational Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        <div>
          {/* College Details */}
          <Grid container spacing={1} alignItems="center" lg={12} >
            <div>
              <Typography variant="h6" align="left">
                College/University Details
              </Typography>
            </div>
            {/* Row 1 */}
            <Grid container spacing={1} alignItems="center" lg={12} >
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="college"
                  label="College Name"
                  style={{ width: "100%" }}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <SchoolIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.college || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="year"
                  label="Year"
                  style={{ width: "100%" }}
                  value={educationData.year || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="F.E">F.E</MenuItem>
                  <MenuItem value="S.E">S.E</MenuItem>
                  <MenuItem value="T.E">T.E</MenuItem>
                  <MenuItem value="B.E">B.E</MenuItem>
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="field"
                  label="Field of Study"
                  style={{ width: "100%" }}
                  required
                  value={educationData.field || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Field
                  </MenuItem>
                  {otherFields.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
            </Grid>
            {/* Row 2 */}
            <Grid container spacing={1} alignItems="center" lg={12} >
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="branch"
                  label="Select Branch"
                  style={{ width: "100%" }}
                  required
                  value={educationData.branch || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Branch
                  </MenuItem>
                  {engineeringFields.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="startYear"
                  label="Start Year"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.startYear || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Year
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem>
                </TextField>
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="endYear"
                  label="End Year"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.endYear || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Year
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            {/* Row 3 */}
            <Grid container spacing={1} alignItems="center" lg={12} >
              <Grid item md={6} sm={12} xs={12} lg={6}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="city"
                  label="City"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <LocationCityIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.city || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} lg={6}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  name="grades"
                  label="CGPA"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <GradeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.grades || ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* 12th Details */}
          <Grid container spacing={1} alignItems="center" lg={12} mt={2}>
            <div>
              <Typography variant="h6" align="left">
                Higher secondary education (12th) Details
              </Typography>
            </div>
            {/* Row 1 */}
            <Grid container spacing={1} alignItems="center" lg={12}>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="higherCollege"
                  label="College Name"
                  style={{ width: "100%" }}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <SchoolIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.higherCollege || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="startYear2"
                  label="Start Year"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.startYear2 || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Year
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="endYear2"
                  label="End Year"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.endYear2 || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Year
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
            </Grid>
            {/* Row 2 */}
            <Grid container spacing={1} alignItems="center" lg={12}>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="city2"
                  label="City"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <LocationCityIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.city2 || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="percentage"
                  label="Percentage"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <GradeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.percentage || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="board1"
                  placeholder="Select Board"
                  label="Select Board"
                  style={{ width: "100%" }}
                  required
                  value={educationData.board1 || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Board
                  </MenuItem>
                  {higherCollegeBoard.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
            </Grid>
            {/* Row 3 */}
            <Grid container spacing={1} alignItems="center" lg={12}>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="stream"
                  placeholder="Select Stream"
                  label="Select Stream"
                  style={{ width: "100%" }}
                  required
                  value={educationData.stream || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Stream
                  </MenuItem>
                  {streams.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="jeePercentile"
                  label="JEE Percentile"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <GradeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.jeePercentile || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="mhtcetPercentile"
                  label="MHTCET Percentile"
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          {/* <LocationCityIcon /> */}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={educationData.mhtcetPercentile || ""}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* 10th Details */}
          <Grid container spacing={1} alignItems="center" lg={12} mt={2}>
            <div>
              <Typography variant="h6" align="left">
                Secondary education (10th) Details
              </Typography>
            </div>
            {/* Row 1 */}
            <Grid container spacing={1} alignItems="center" lg={12}>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="school"
                  label="School Name"
                  style={{ width: "100%" }}
                  value={educationData.school || ""}
                  required
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <SchoolIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="startYear3"
                  label="Start Year"
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={educationData.startYear3 || ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Year
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="endYear3"
                  label="End Year"
                  style={{ width: "100%" }}
                  value={educationData.endYear3 || ""}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Year
                  </MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
            </Grid>
            {/* Row 2 */}
            <Grid container spacing={1} alignItems="center" lg={12}>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="city3"
                  label="City"
                  style={{ width: "100%" }}
                  value={educationData.city3 || ""}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <LocationCityIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  margin="dense"
                  variant="outlined"
                  type="text"
                  name="percentage2"
                  label="Percentage"
                  style={{ width: "100%" }}
                  value={educationData.percentage2 || ""}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <GradeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} lg={4}>
                <TextField
                  select
                  margin="dense"
                  variant="outlined"
                  name="board2"
                  placeholder="Select Board"
                  label="Select Board"
                  style={{ width: "100%" }}
                  required
                  value={educationData.board2 || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Board
                  </MenuItem>
                  {schoolBoard.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                  <MenuItem value="">Clear Selection</MenuItem> {/* Add this line */}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </CardContent>

      <Grid container spacing={2} alignItems="center" lg={12} >
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
          <Link to={'/profile'} style={linkStyle}>
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
              disabled={!isEducationUpdated}
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
              disabled={!isEducationUpdated}
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
            Please save your education details before proceeding.
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

export default Education;
