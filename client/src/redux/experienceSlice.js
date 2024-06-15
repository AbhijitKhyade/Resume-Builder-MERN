import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {
        // updateExperience: (state, action) => {
        //     const { index, field, value } = action.payload;
        //     // Create a new array with the updated experience object
        //     const updatedState = state.map((experience, i) => {
        //         if (i === index) {
        //             return { ...experience, [field]: value };
        //         }
        //         return experience;
        //     });
        //     // console.log(updatedState);
        //     return updatedState;
        // },
        updateExperience: (state, action) => {
            const { index, field, value } = action.payload;
            state[index] = { ...state[index], [field]: value };
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
