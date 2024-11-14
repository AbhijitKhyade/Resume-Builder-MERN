import React from 'react';
import { Box, Paper, Typography, Step, StepLabel, Stepper } from '@mui/material';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    AccountCircle, School, Work, Code, EmojiEvents, Extension, Assessment
} from '@mui/icons-material';

export default function ResumeLayout() {
    const location = useLocation();

    // Define each step with a label, route path, and icon
    const steps = [
        { label: 'Profile', path: '/profile', icon: <AccountCircle /> },
        { label: 'Education', path: '/education', icon: <School /> },
        { label: 'Projects', path: '/projects', icon: <Assessment /> },
        { label: 'Experience', path: '/experience', icon: <Work /> },
        { label: 'Skills', path: '/skills', icon: <Extension /> },
        { label: 'Achievements', path: '/achievements', icon: <EmojiEvents /> },
        // { label: 'Coding Profile', path: '/coding-profile', icon: <Code /> }
    ];

    // Find the active step based on the current route
    const activeStep = steps.findIndex(step => step.path === location.pathname);

    return (
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', }}>
            <Paper elevation={3} style={{ width: '80%', padding: '20px', backgroundColor: '#fff', marginBottom: '20px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Complete the Resume
                </Typography>

                {/* Stepper for Wizard */}
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step, index) => {
                        const isActive = activeStep === index;
                        return (
                            <Step key={step.label} completed={activeStep > index}>
                                <StepLabel
                                    icon={React.cloneElement(step.icon, {
                                        style: { color: isActive ? '#1976d2' : '#757575' } // Active color for icon
                                    })}
                                >
                                    <Link
                                        to={step.path}
                                        style={{
                                            textDecoration: 'none',
                                            color: isActive ? '#1976d2' : '#757575', // Active color for label
                                            fontWeight: isActive ? 'bold' : 'normal'
                                        }}
                                    >
                                        {step.label}
                                    </Link>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                {/* Render content for each step using `Outlet` */}
                <Box className="mt-10">
                    <Outlet />
                </Box>
            </Paper>
        </Box>
    );
}
