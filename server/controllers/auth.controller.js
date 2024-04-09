const User = require('../models/user.model');
const JWT = require('jsonwebtoken');
const { hashPassword } = require('../utils/authHelper');

const googleSignIn = async (req, res) => {
    try {
        // Check if the request body contains necessary fields
        if (!req.body.email || !req.body.username || !req.body.avatar) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        let isNewUser = false;

        if (!user) {
            // If user doesn't exist, generate a random password and create a new user
            const generatePassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await hashPassword(generatePassword);

            // Create a new user instance
            user = new User({
                username: req.body.username.split(" ").join("").toLowerCase(),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.avatar
            });

            // Save the new user
            await user.save();
            isNewUser = true;
        }

        // Generate JWT token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

        // Remove sensitive data from the user object
        const { password: pass, ...rest } = user._doc;

        // Include token in the user object
        const userWithToken = { ...rest, token };


        // Send response
        if (isNewUser) {
            return res.status(200).json({ user: userWithToken, message: "New user created successfully!" });
        } else {
            return res.status(200).json({ user: userWithToken, message: "Login Successful!" });
        }
    } catch (error) {
        // Log the error for debugging
        console.error("Error in googleSignIn:", error);
        // Send appropriate error response
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}



module.exports = { googleSignIn };