// projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        updateProject: (state, action) => {
            const updates = Array.isArray(action.payload) ? action.payload : [action.payload];
            // console.log('action.payload', action.payload);
            const updatedProjects = [...state]; // Create a copy of the state array
            updates.forEach((update) => {
                const { index, field, value } = update;
                if (index !== undefined && field !== undefined && value !== undefined) {
                    updatedProjects[index] = { ...updatedProjects[index], [field]: value }; // Update the specific project
                }
            });
            return updatedProjects; // Return updated state
        },

        addProject: (state) => {
            state.push({ title: "", description: "", link: "", projectGithubUrl: "" });
        },
        deleteProject: (state, action) => {
            return state.filter((project, index) => index !== action.payload);
        },
        clearProjects: () => initialState,
    },
});

export const { updateProject, addProject, deleteProject, clearProjects } = projectSlice.actions;
export const selectProject = (state) => state.project;
export default projectSlice.reducer;

