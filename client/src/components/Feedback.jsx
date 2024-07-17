import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from '../api';
import { useSelector } from 'react-redux';
const Feedback = ({ open, handleClose }) => {
    const [feedback, setFeedback] = useState('');
    const currentUser = useSelector((state) => state.user.currentUser);
    const handleFeedback = async (e) => {
        e.preventDefault();
        // console.log(feedback);
        try {
            const response = await axios.post(`${BASE_URL}/user/feedback?id=${currentUser._id}`, { feedback }, {
                headers: {
                    authorization: currentUser.token,
                },
            });
            // console.log(response.data);
            toast.success("Thank you for your Feedback!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setFeedback('');
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Your Feeback will is valuable</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="feedback"
                    label="Your Feedback"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={handleFeedback} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Feedback;
