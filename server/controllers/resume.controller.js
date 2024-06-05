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


        // Find the resume data in the database based on the user's email
        const existingResume = await Resume.findOne({ 'profile.email': resumeData.profile.email });

        // If resume data already exists, update it
        if (existingResume) {
            // Update the existing resume data with the new data
            existingResume.set(resumeData);
            await existingResume.save();
            // Send success response
            return res.status(200).json({ message: "Resume data updated successfully!" });
        }

        // If resume data doesn't exist, save it as new
        const newResume = new Resume(resumeData);
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

module.exports = { addResumeData };
