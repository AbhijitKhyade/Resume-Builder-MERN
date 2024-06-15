import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    college: "",
    year: "",
    field: "",
    branch: "",
    startYear: "",
    endYear: "",
    city: "",
    grades: "",
    higherCollege: "",
    startYear2: "",
    endYear2: "",
    city2: "",
    percentage: "",
    board1: "",
    school: "",
    startYear3: "",
    endYear3: "",
    city3: "",
    percentage2: "",
    board2: "",
};

const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {
        updateEducation: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearEducation: () => initialState,
    },
});

export const { updateEducation, clearEducation } = educationSlice.actions;
export const selectEducation = (state) => state.education; // Adjusted selector
export default educationSlice.reducer;
