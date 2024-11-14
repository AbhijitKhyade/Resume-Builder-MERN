import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/profileSlice";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Beenhere, Save, SaveAltOutlined, SaveAltTwoTone, SaveSharp } from "@mui/icons-material";
import { showSuccessToast } from "./ToastNotifications";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Profile = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.profileDetails);

  // Local state to hold profile data temporarily
  const [profileData, setProfileData] = useState(currentProfile);

  // Check if profile is saved from Redux state
  const isProfileSaved = currentProfile.isProfileUpdated;
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateProfile({ ...profileData, isProfileUpdated: true })); // Update profile and mark it as saved
    showSuccessToast("Profile details saved successfully");
    setShowWarning(false);  // Hide warning message after save
  };

  const handleNavigate = (e) => {
    if (!isProfileSaved) {
      e.preventDefault();  // Prevent navigation if profile is not saved
      setShowWarning(true);  // Show warning message
    }
  };


  const containerStyle = {
    marginTop: "30",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "var(--cardBg)",
  };

  return (
    <div style={containerStyle}>
      <Card>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Profile Details
            </Typography>
          }
        />
      </Card>
      <CardContent>
        <div>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="firstName"
                label="FirstName"
                style={{ width: "100%" }}
                required
                value={profileData?.firstName || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="lastName"
                label="LastName"
                style={{ width: "100%" }}
                required
                value={profileData?.lastName || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="email"
                name="email"
                label="Email"
                style={{ width: "100%" }}
                required
                value={profileData?.email || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="mobile"
                label="MobileNo"
                style={{ width: "100%" }}
                required
                value={profileData?.mobile || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <PhoneIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" lg={12} mt={0.5}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="linkedIn"
                label="Linked In"
                style={{ width: "100%" }}
                value={profileData?.linkedIn || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <LinkedInIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="github"
                label="Github"
                style={{ width: "100%" }}
                value={profileData?.github || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <GitHubIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="codechef"
                label="Codechef"
                style={{ width: "100%" }}
                value={profileData?.codechef || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} lg={6}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="leetcode"
                label="Leetcode"
                style={{ width: "100%" }}
                value={profileData?.leetcode || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" lg={12}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                name="codeforces"
                label="Codeforces"
                style={{ width: "100%" }}
                value={profileData?.codeforces || ""}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </div>

      </CardContent>



      <Grid container spacing={2} alignItems="center" lg={12} >
        <Grid item md={12} sm={12} xs={12} lg={12} style={containerStyles}>
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
            disabled={true}
            style={{ cursor: 'not-allowed' }}
          >
            <Link to={'/'} style={linkStyle}>
              <ArrowBackIcon style={iconStyle} />
              Previous
            </Link>
          </Button>
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
            disabled={!isProfileSaved}
          >
            <Link to={'/education'} style={linkStyle}>
              Next
              <ArrowForwardIcon style={iconStyle} />
            </Link>
          </Button>

        </Grid>

        <div style={{
          display: 'flex', justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mt: '-20px'
        }}>
          <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
            Please save your profile before proceeding.
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
  padding: '1px', // Add padding for hover effect
  '&:disabled': {
    cursor: 'not-allowed',
    pointerEvents: 'all !important',
  },
};

const containerStyles = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // backgroundColor: 'crimson',
  marginTop: '20px',
  // paddingRight: '40px',
};
const iconStyle = {
  verticalAlign: 'middle', // Align icon vertically with text
  marginLeft: '5px', // Add margin between icon and text
};
export default Profile;