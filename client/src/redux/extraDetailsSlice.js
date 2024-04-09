// extraDetailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    skills: [],
    hobbies: [],
    achievements: [],
    extraCoCurricular: [],
};

const extraDetailsSlice = createSlice({
    name: "extraDetails",
    initialState,
    reducers: {
        updateSkills: (state, action) => {
            const { index, value } = action.payload;
            state.skills[index] = value;
        },
        addSkills: (state) => {
            state.skills.push("");
        },
        deleteSkill: (state, action) => {
            const index = action.payload;
            state.skills.splice(index, 1);
        },
        updateHobbies: (state, action) => {
            const { index, value } = action.payload;
            state.hobbies[index] = value;
        },
        addHobbies: (state) => {
            state.hobbies.push("");
        },
        deleteHobbies: (state, action) => {
            const index = action.payload;
            state.hobbies.splice(index, 1);
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
    },
});

export const {
    updateSkills,
    addSkills,
    updateHobbies,
    addHobbies,
    updateAchievements,
    addAchievements,
    updateExtraCoCurricular,
    addExtraCoCurricular,
    deleteSkill,
    deleteHobbies,
    deleteAchievements,
    deleteExtraCoCurricular
} = extraDetailsSlice.actions;
export const selectExtraDetails = (state) => state.extraDetails;
export default extraDetailsSlice.reducer;
