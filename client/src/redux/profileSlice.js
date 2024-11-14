
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    linkedIn: "",
    github: "",
    codechef: "",
    leetcode: "",
    codeforces: "",
    isProfileUpdated: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearProfile: () => initialState,
    },
});

export const { updateProfile, clearProfile } = profileSlice.actions;
export const selectProfile = (state) => state.profile;
export default profileSlice.reducer;