import { createSlice } from "@reduxjs/toolkit";

// achievementsSlice.js

const initialState = {
    achievements: [],
    extraCurricular: [],
};

const achievementsSlice = createSlice({
    name: "achievements",
    initialState,
    reducers: {
        updateAchievement(state, action) {
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
        addAchievement(state, action) {
            const { type } = action.payload;
            // Ensure the array exists before adding
            if (!state[type]) {
                state[type] = [];
            }
            state[type].push("");
        },
        deleteAchievement(state, action) {
            const { type, index } = action.payload;
            // Ensure the array exists before deleting
            console.log('action.payload', action.payload);
            if (state[type]) {
                state[type].splice(index, 1);
            }
        },
        clearAchievements: () => initialState,
    },
});

export const {
    updateAchievement,
    addAchievement,
    deleteAchievement,
    clearAchievements
} = achievementsSlice.actions;
export const selectAchievements = (state) => state.achievements;
export default achievementsSlice.reducer;