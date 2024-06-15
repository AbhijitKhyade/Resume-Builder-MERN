// extraDetailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skills: {
        languages: [],
        web: [],
        webFrameworks: [],
        databases: [],
        other: [],
    },
    achievements: [],
    extraCoCurricular: [],
    coreSubjects: [],
};

const extraDetailsSlice = createSlice({
    name: "extraDetails",
    initialState,
    reducers: {
        // updateSkills: (state, action) => {
        //     const { type, index, value } = action.payload;
        //     console.log(action.payload);
        //     const updatedSkills = {
        //         ...state.skills,
        //         [type]: state.skills[type].map((skill, i) =>
        //             i === index ? value : skill
        //         ),
        //     };

        //     console.log("Updated Skills:", updatedSkills);

        //     return {
        //         ...state,
        //         skills: updatedSkills,
        //     };
        // },
        updateSkills(state, action) {
            const { type, index, value } = action.payload;

            // Ensure the array exists before updating
            if (state.skills[type]) {
                // Update the specific item in the nested array
                state.skills[type][index] = value;
            } else {
                // Create a new array if it doesn't exist and update
                state.skills[type] = [];
                state.skills[type][index] = value;
            }
        },
        addSkills: (state, action) => {
            const { type } = action.payload;
            return {
                ...state,
                skills: {
                    ...state.skills,
                    [type]: [...(state.skills[type] || []), ""]
                }
            };
        },
        deleteSkills: (state, action) => {
            const { type, index } = action.payload;
            return {
                ...state,
                skills: {
                    ...state.skills,
                    [type]: state.skills[type].filter((_, i) => i !== index)
                }
            };
        },
        updateAchievements: (state, action) => {
            const { index, value } = action.payload;
            state.achievements[index] = value;
        },
        deleteAchievements: (state, action) => {
            const index = action.payload;
            state.achievements.splice(index, 1);
        },
        addAchievements: (state) => {
            state.achievements.push("");
        },
        updateExtraCoCurricular: (state, action) => {
            const { index, value } = action.payload;
            state.extraCoCurricular[index] = value;
        },
        addExtraCoCurricular: (state) => {
            state.extraCoCurricular.push("");
        },
        deleteExtraCoCurricular: (state, action) => {
            const index = action.payload;
            state.extraCoCurricular.splice(index, 1);
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
    updateAchievements,
    addAchievements,
    updateExtraCoCurricular,
    addExtraCoCurricular,
    deleteSkills,
    deleteAchievements,
    deleteExtraCoCurricular,
    updateCoreSubjects,
    deleteCoreSubjects,
    addCoreSubjects,
    clearExtraDetails
} = extraDetailsSlice.actions;
export const selectExtraDetails = (state) => state.extraDetails;
export default extraDetailsSlice.reducer;
