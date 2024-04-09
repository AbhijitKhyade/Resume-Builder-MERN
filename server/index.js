const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const mongoDB = require('./config/db');
const authRoutes = require('./routes/auth.route');

const app = express();

//dotenv config
dotenv.config();

//database config   
mongoDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));