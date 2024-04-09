
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    aboutMe: "",
    address: "",
    linkedIn: "",
    github: "",
    codechef: "",
    leetcode: "",
    codeforces: "",
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateProfile } = profileSlice.actions;
export const selectProfile = (state) => state.profile;
export default profileSlice.reducer;