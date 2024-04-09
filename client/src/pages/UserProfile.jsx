
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import TemplateIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import { useState } from 'react';
import '../styles/userProfile.css';


export default function UserProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '' || currentUser.username,
    email: '' || currentUser.email,
    password: '',
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  };

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
  }

  const sidebarLinks = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Edit Resume', path: '/create-resume', icon: <EditIcon /> },
    { text: 'Templates', path: '/templates', icon: <TemplateIcon /> },
    { text: 'Logout', path: '', icon: <LogoutIcon /> },
  ];

  return (
    <Container component="main" maxWidth="lg" >
      <Grid container spacing={3} >
        <Grid item xs={12} sm={3}>
          <Box className='sidebar' bgcolor="#fff" height="100vh" sx={{ borderRadius: '10px', height: '95%' }}>
            <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>

            </Typography>
            <Box className="sidebar-links">
              {sidebarLinks.map((link, index) => (
                <Link className="sidebar-link" key={index} to={link.path} onClick={link.text === 'Logout' ? handleLogout : null}>
                  <div className='icon-text'>
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.text} />
                  </div>
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          {/* Main Content */}
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#fff',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <Avatar src={currentUser?.avatar} alt="user" sx={styles.avatar} />
            <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
              Hello {currentUser.username}
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
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={formData.email}
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
                sx={{ mt: 3, mb: 2 }}
              >
                Update
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

}
