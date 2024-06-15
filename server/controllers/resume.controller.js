const Resume = require("../models/resume.model");

const addResumeData = async (req, res) => {
    try {
        // Check if the request body contains necessary fields
        if (!req.body) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Get the resume data and user's email from the request body
        const { resumeData } = req.body;
        // console.log('resume data: ', resumeData);
        const { id } = req.query;
        // console.log("Data:", id);

        // Find the resume data in the database based on the user's email
        const existingResume = await Resume.findOne({ userId: id });
        // console.log(existingResume);
        // If resume data already exists, update it 
        if (existingResume) {
            // Update the existing resume data with the new data
            existingResume.set(resumeData);
            await existingResume.save();
            // Send success response
            return res.status(200).json({ message: "Resume data updated successfully!" });
        }
        const newResumeData = {
            ...resumeData,
            userId: id
        };
        // If resume data doesn't exist, save it as new
        const newResume = new Resume(newResumeData);
        await newResume.save();

        // Send success response
        return res.status(200).json({ message: "Resume data added successfully!" });
    } catch (error) {
        // Log the error for debugging
        console.error("Error in addResumeData:", error);
        // Send appropriate error response
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const getAllResumeData = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "Missing required fields" });
        // Get all the resume data from the database
        const resumeData = await Resume.find({ userId: id });
        // Send the resume data as response
        return res.status(200).json({ resumeData });
    } catch (error) {
        // Log the error for debugging
        console.error("Error in getAllResumeData:", error);
        // Send appropriate error response
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports = { addResumeData, getAllResumeData };
