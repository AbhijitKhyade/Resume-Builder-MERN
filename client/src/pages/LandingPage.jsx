import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff6f61',
        },
        background: {
            default: '#ffecd6',
        },
        text: {
            primary: '#333333',
            secondary: '#555555',
        },
    },
});


export default function LandingPage() {
    const navigate = useNavigate();


    const handleGetStarted = () => {
        navigate('/profile');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    padding: 4,
                    minHeight: '91vh',
                    position: 'relative',
                }}
            >
                <div style={{ color: 'black' }}>
                    <div style={{
                        position: 'absolute', right: '5px', top: '-30px', zIndex: '-100', transform: 'rotate(-4deg)'
                        ,
                    }}>
                        <img src={img1} alt="image1" width={'450px'} height={'380px'} style={{ borderRadius: '50%', opacity: '0.9' }} />
                    </div>
                    <div style={{ position: 'absolute', bottom: '-15px', left: '-14px', zIndex: '-100', transform: 'rotate(-4deg)' }}>
                        <img src={img2} alt="image1" width={'450px'} height={'380px'} style={{ borderRadius: '8px', opacity: '0.9' }} />
                    </div>
                    <div style={{ position: 'absolute', left: '28%', top: '-6%', zIndex: '-300', transform: 'rotate(-15deg)' }}>
                        <img src={img3} alt="image1" width={'680px'} height={'700px'} style={{ borderRadius: '8px', opacity: '0.7' }} />
                    </div>
                    <div >
                        <Container maxWidth="md">
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: '800' }}>
                                    Build Your Professional Resume
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                <Typography variant="h5" component="h1" gutterBottom>
                                    Create a resume that stands out with our easy-to-use builder
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                <Button onClick={handleGetStarted} variant='outlined' sx={{ color: 'black', backgroundColor: "var(--btnColor)", "&:hover": { backgroundColor: "var(--landBtnHover)", border:'none' }, border: 'none' }} size="large">
                                    Get Started
                                </Button>
                            </motion.div>
                        </Container>
                    </div>
                </div>
            </Box>
        </ThemeProvider >
    );
}
