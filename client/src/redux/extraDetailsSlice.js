// extraDetailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    programmingLanguages: [],
    webDevelopment: [],
    databases: [],
    developerTools: [],
};

const extraDetailsSlice = createSlice({
    name: "extraDetails",
    initialState,
    reducers: {
        updateSkills(state, action) {
            const { type, index, value } = action.payload;

            // Ensure the array exists before updating
            if (state[type]) {
                // Update the specific item in the nested array
                state[type][index] = value;
            } else {
                // Create a new array if it doesn't exist and update
                state[type] = [];
                state[type][index] = value;
            }
        },
        addSkills(state, action) {
            const { type } = action.payload;
            // Ensure the array exists before adding
            // console.log('action.payload', action.payload);
            if (!state[type]) {
                state[type] = [];
            }
            state[type].push("");
        },
        deleteSkills(state, action) {
            const { type, index } = action.payload;
            // console.log('action.payload', action.payload);
            // Ensure the array exists before deleting
            if (state[type]) {
                state[type].splice(index, 1);
            }
        },
        updateCoreSubjects: (state, action) => {
            const { index, value } = action.payload;
            state.coreSubjects[index] = value;
        },
        deleteCoreSubjects: (state, action) => {
            const index = action.payload;
            state.coreSubjects.splice(index, 1);
        },
        addCoreSubjects: (state, _action) => {
            state.coreSubjects.push(""); // Add an empty string as a new core subject
        },
        clearExtraDetails: () => initialState,
    },
});

export const {
    updateSkills,
    addSkills,
    deleteSkills,
    updateCoreSubjects,
    deleteCoreSubjects,
    addCoreSubjects,
    clearExtraDetails
} = extraDetailsSlice.actions;
export const selectExtraDetails = (state) => state.extraDetails;
export default extraDetailsSlice.reducer;
