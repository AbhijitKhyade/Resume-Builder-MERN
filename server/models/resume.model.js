const mongoose = require('mongoose');

// Define schema for Profile
const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    aboutMe: String,
    address: String,
    linkedIn: String,
    github: String,
    codechef: String,
    leetcode: String,
    codeforces: String
});

// Define schema for Education
const educationSchema = new mongoose.Schema({
    college: String,
    year: String,
    field: String,
    branch: String,
    startYear: String,
    endYear: String,
    city: String,
    grades: String,
    higherCollege: String,
    startYear2: String,
    endYear2: String,
    city2: String,
    percentage: String,
    board1: String,
    school: String,
    startYear3: String,
    endYear3: String,
    city3: String,
    percentage2: String,
    board2: String
});

// Define schema for Project
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    techStack: String
});

// Define schema for Experience
const experienceSchema = new mongoose.Schema({
    role: String,
    institute: String,
    start_date: String,
    end_date: String,
    desc: String
});

// Define schema for ExtraDetails
const extraDetailsSchema = new mongoose.Schema({
    skills: {
        languages: [String],
        web: [String],
        webFrameworks: [String],
        databases: [String],
        other: [String]
    },
    achievements: [String],
    extraCoCurricular: [String],
    coreSubjects: [String]
});

// Define main schema for user resume
const resumeSchema = new mongoose.Schema({
    profile: profileSchema,
    education: [educationSchema],
    projects: [projectSchema],
    experience: [experienceSchema],
    extraDetails: extraDetailsSchema,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Create and export the model
const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;