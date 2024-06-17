const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoDB = require('./config/db');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const resumeRoutes = require('./routes/resume.route');

const app = express();

//dotenv config
dotenv.config();

//database config   
mongoDB();


app.use(express.json());
app.use(cors());
//middlewares
// app.use(cors({
//     origin: 'https://resume-builder-mern-eight.vercel.app',
//     credentials: true,
// }));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/data', resumeRoutes);

const PORT = process.env.PORT || 8080;

app.listen(process.env.PORT, () => {
     console.log(`Server is working on https://resume-builder-mern-eight.vercel.app:${process.env.PORT}`);
    //console.log(`Server is working on http://localhost:${process.env.PORT}`);
});