import { Beenhere } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

export default function SaveButton() {
    return (
        <Grid container spacing={2} alignItems="center" lg={12} >
            <Grid item md={12} sm={12} xs={12} lg={12} style={btnStyle} >
                
            </Grid>
        </Grid>
    )
}


const btnStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    marginTop: '20px',

}


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