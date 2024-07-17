
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {
  Avatar, Box, Button, Container, Grid, IconButton, List, ListItem, ListItemIcon,
  ListItemText, TextField, Typography, AppBar, Toolbar, Drawer,
  CircularProgress
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import TemplateIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { BASE_URL } from '../api';
import '../styles/userProfile.css';
import { clearEducation } from '../redux/educationSlice';
import { clearProjects } from '../redux/projectSlice';
import { clearExperience } from '../redux/experienceSlice';
import { clearExtraDetails } from '../redux/extraDetailsSlice';
import { clearProfile } from '../redux/profileSlice';

export default function UserProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    password: '',
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log(formData);
    try {
      const response = await axios.put(`${BASE_URL}/user/update/${currentUser._id}`, formData, {
        headers: {
          authorization: currentUser.token,
        },
      });
      // console.log(response.data);
      toast.success("Profile Updated Successfully!", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      formData.password = '';
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get-user/${currentUser._id}`, {
        headers: {
          authorization: currentUser.token,
        },
      });
      // console.log(response.data);
      setFormData({
        username: response.data.username,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);


  const handleLogout = async () => {
    dispatch(logoutUser());
    toast.success("Logout Successful!", {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(logoutUser());
    dispatch(clearProfile());
    dispatch(clearEducation());
    dispatch(clearProjects());
    dispatch(clearExperience());
    dispatch(clearExtraDetails());
  };

  const sidebarLinks = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Edit Resume', path: '/profile', icon: <EditIcon /> },
    { text: 'Templates', path: '/templates', icon: <TemplateIcon /> },
    { text: 'Logout', path: '', icon: <LogoutIcon />, action: handleLogout },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {currentUser ? (
        <>
          <List>
            {sidebarLinks.map((link, index) => (
              <Link
                key={index}
                className="sidebar-link"
                to={link.path}
                onClick={link.text === 'Logout' ? link.action : null}
              >
                <ListItem button>
                  <ListItemIcon className='icon'>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      ) : (
        <>
          <div className="drawer-div">
            <h3>Login Please!</h3>
          </div>
        </>
      )}
    </Box>
  );

  return (
    <Container component="main" maxWidth="lg">
      {/* <AppBar position="fixed" style={{ backgroundColor: 'var(--bgColor)', color: 'black', }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            User Profile
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Toolbar />
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawer}
      </Drawer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Box className="sidebar">
            <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
              Menu
            </Typography>
            <Box className="sidebar-links">
              {sidebarLinks.map((link, index) => (
                <Link
                  key={index}
                  className="sidebar-link"
                  to={link.path}
                  onClick={link.text === 'Logout' ? link.action : null}
                >
                  <ListItem button>
                    <ListItemIcon className='icon'>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItem>
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Avatar src={currentUser?.avatar} alt="user" sx={styles.avatar} />
            <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
              Hello {formData.username}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={handleChange}
                value={formData.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                // label="Email Address"
                name="email"
                onChange={handleChange}
                value={formData.email}
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "var(--btn)",
                  color: "black",
                  "&:hover": { backgroundColor: "var(--btnHover)" },
                }}
                onClick={handleSubmit}
                disabled={loading} // Disable button while loading
              >
                {loading ? ( // Conditionally render loading indicator
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const styles = {
  avatar: {
    width: '100px',
    height: '100px',
    marginBottom: '15px',
  },
};
