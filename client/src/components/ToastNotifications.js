import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to show a success toast
export const showSuccessToast = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

// Function to show a warning toast
export const showWarningToast = (message) => {
    toast.warn(message, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

// Function to show an error toast
export const showErrorToast = (message, duration = 4000) => {
    toast.error(message, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

// Function to show an info toast
export const showInfoToast = (message) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};