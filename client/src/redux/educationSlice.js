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
    school: "",
    startYear3: "",
    endYear3: "",
    city3: "",
    percentage2: "",
}

const educationSlice = createSlice({
    name: "education",
    initialState,
    reducers: {
        updateEducation: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateEducation } = educationSlice.actions;
export const selectEducation = (state) => state.education;
export default educationSlice.reducer;