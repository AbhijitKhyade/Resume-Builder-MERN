import React, { useState } from 'react';
import { app } from '../../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoogle = async () => {
        try {
            dispatch(signInStart());
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            // console.log(result?.user);
            const formData = {
                username: result?.user?.displayName,
                email: result?.user?.email,
                avatar: result?.user?.photoURL
            };
            const response = await axios.post(`${BASE_URL}/auth/google-sign-in`, formData);
            // console.log(response?.data?.user);
            dispatch(signInSuccess(response?.data?.user));
            toast.success(response?.data?.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLoading(false);
            navigate('/');

        } catch (error) {
            setLoading(false);
            console.log(error);
            dispatch(signInFailure(error.message));
            toast.error("Login failed. Please try again.", {
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
    }

    const Bubble = ({ size, color }) => {
        const generateRandomPosition = () => ({
            x: Math.random() * (window.innerWidth - size),
            y: Math.random() * (window.innerHeight - size)
        });

        const transition = {
            duration: 17,  // Increased duration for slower movement
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
        };

        return (
            <motion.div
                initial={generateRandomPosition()}
                animate={generateRandomPosition()}
                transition={transition}
                style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: '50%',
                    border: '2px solid rgba(0, 0, 0, 0.1)'
                }}
            />
        );
    };


    const bubbles = Array.from({ length: 15 }).map((_, index) => (
        <Bubble
            key={index}
            size={Math.random() * 100 + 30}
            color={`hsla(${Math.random() * 360}, 100%, 80%, 0.7)`}
        />
    ));

    return (
        <div style={styles.container}>
            <div style={{ border: '1px solid black', position: 'relative', marginTop: '-600px', marginLeft: '-600px' }}>
                {bubbles}
            </div>
            <button style={styles.button} onClick={handleGoogle} >
                {loading ? <CircularProgress size={28}  /> :
                    <>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJKSURBVHgBvZTPaxNBFMffm93VpI2QQOqpyuhFBKFbUKmguIt6j9568z+Iihd/0YiCHgTTu2BzEKkIyUkvtRk9iUa7/gVdD2o9SFZaadP9Mc7uJtvNtlmtQr+w7OzbN595b+bNQxigtn58zEGvBIglAE4BMC/Mhhib3OWNvexDbat5mDQsamo+R+QpAboEKeIcTAUcrTC/8Hkg8JumUokoTUSg8JfquDA+yt4bvW85HtlWMARucUBTDC3x+GmrsTAro6xlxP0j4DCRHm6KTExY9nLTBxizNrKYoLLk1sW/xsh86zYkFKS8+hKozehipzWysZKHaqH57hNsUySYvEsuZ899gczJpSiyf4EFrBCAwb5kTi2BvH8F1p4cnkk66vfXx8Bz82mw5vXs6yBle05ud+vMpzPlrKMnnc/cXWlyBC0NCHyYknCEqStvR10gt2K2/4L3Ioxq6aNdVNXHpU1QF+Ey8bgef5ADi/t4jvUzPBTkTByMNrt6EKq/joA8xMvC2ldj7Eaur4C1e22KnkJ7V028DVYpWEGEDpFrd5bVABaIY+XYs/OnIU2uUhYQGn1zqRqlnNXXzBfr+6pxf+4RdnT2wlSS42/HiUcP6gQh1jzQfHUzW+tG2nWsl/JKR1rg0H/9RKlYYq966UZ3mdhFGPp6DYhTBH8/527tYX1AXxNPS9RFqZmEDpIPzXy/cvHN1UNRbyRxh7eTDdPe7Y6LVWb+BBNdyPTkH3ocFtoHKIyWlEXrUoWXChzyInJTdCQDPJxuTT5nsBP6DUkW1QHQYUIiAAAAAElFTkSuQmCC" alt="Google Logo" style={styles.icon} />
                        <p style={styles.text}>Continue With Google</p>
                    </>
                }
            </button>

        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
        // overflow: 'hidden',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 21px',
        borderRadius: '5px',
        marginLeft: '600px',
        border: 'black 2px solid',
        backgroundColor: '#fff',
        color: '#fff',
        cursor: 'pointer',
        width: '320px',
        zIndex: 1,
    },
    text: {
        fontSize: '18px',
        fontWeight: '700',
        margin: '0',
        color: '#000',
    },
    icon: {
        marginRight: '10px',
        width: '24px',
        height: '24px',
    },
};
