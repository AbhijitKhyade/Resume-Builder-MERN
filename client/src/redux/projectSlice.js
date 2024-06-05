// projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        updateProject: (state, action) => {
            const { index, field, value } = action.payload;
            state[index] = { ...state[index], [field]: value };
        },
        addProject: (state) => {
            state.push({ title: "", description: "", link: "", techStack: "" });
        },
        deleteProject: (state, action) => {
            return state.filter((project, index) => index !== action.payload);
        },
        clearProjects: (state) => {
            return initialState; // Reset to initial state
        },
    },
});

export const { updateProject, addProject, deleteProject, clearProjects } = projectSlice.actions;
export const selectProject = (state) => state.project;
export default projectSlice.reducer;
