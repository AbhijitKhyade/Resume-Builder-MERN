import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        updateExperience: (state, action) => {
            const updates = Array.isArray(action.payload) ? action.payload : [action.payload];
            console.log('action.payload', action.payload);
            const updatedExperiences = [...state]; // Create a copy of the state array
            updates.forEach((update) => {
                const { index, field, value } = update;
                if (index !== undefined && field !== undefined && value !== undefined) {
                    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value }; // Update the specific project
                }
            });
            return updatedExperiences; // Return updated state
        },
        addExperience: (state) => {
            state.push({ role: "", institute: "", start_date: "", end_date: "", desc: "" });
        },
        deleteExperience: (state, action) => {
            state.splice(action.payload, 1);
        },
        clearExperience: () => initialState,
    },
});

export const { updateExperience, addExperience, deleteExperience, clearExperience } = experienceSlice.actions;
export const selectExperience = (state) => state.experience;
export default experienceSlice.reducer;
