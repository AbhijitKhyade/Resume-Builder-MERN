import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Avatar, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from "../redux/userSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/Navbar.css';
import { clearEducation } from "../redux/educationSlice";
import { clearProjects } from "../redux/projectSlice";
import { clearExperience } from "../redux/experienceSlice";
import { clearExtraDetails } from "../redux/extraDetailsSlice";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for managing sidebar open/close
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
    setAnchorEl(null);
  };

  const handleContactUsClick = () => {
    navigate('/contact-us');
    setAnchorEl(null);
  };

  const handleClose = () => {
    // console.log("clicked")
    setAnchorEl(null);
    setIsDrawerOpen(false);
  };

  const handleLogout = async () => {
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

  }
  // console.log(currentUser?.avatar)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'var(--bgColor)', color: 'black', }}>
        <Toolbar>
          <div className="menu-icon">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpen(true)} // Open sidebar on click
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)} // Close sidebar on click outside
          >
            <List>
              <ListItem button component={Link} to="/" onClick={handleClose}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/create-resume" onClick={handleClose}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Resume" />
              </ListItem>
              <ListItem button component={Link} to="/templates" onClick={handleClose}>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Templates" />
              </ListItem>
              <ListItem button onClick={handleLogout} >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>

            </List>
          </Drawer>

          <img className="logo" src={logo} alt="resume" width={"40px"} height={"40px"} />
          <Typography
            className="logo-text"
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              marginLeft: "2px",
              fontWeight: "600",
              '@media (max-width: 600px)': {
                fontSize: "14px" // Adjust the font size as per your requirement
              }
            }}
            style={styles.text}
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: '#000' }}> RESUME BUILDER</Link>
          </Typography>

          {currentUser ? (
            <>
              <Link to={'/templates'} style={{ textDecoration: 'none', color: '#000' }}>
                <Button color="inherit">Template</Button>
              </Link>
              <Avatar
                src={currentUser?.avatar}
                alt="user" sx={styles.avatar}
                onClick={handleClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfileClick}>My Profile</MenuItem>
                <MenuItem onClick={handleContactUsClick}>Contact Us</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to={'/sign-in'} style={{ textDecoration: 'none', color: '#000' }}>
              <Button color="inherit">Login</Button>
            </Link>

          )}
        </Toolbar>
      </AppBar>
    </Box >
  );
};

export default Navbar;

const styles = {
  avatar: {
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    marginLeft: '10px'
  },
  text: {
    margin: 0,
    fontSize: '24px'
  }
}
