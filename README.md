# Resume Builder

## Description
Resume Builder is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create and manage their resumes online, providing a streamlined interface for adding personal information, education history, work experience, and skills.

The application features a responsive design, ensuring a seamless user experience across different devices. Users can register, log in securely, and save their resume data for future editing. The data is stored in MongoDB Atlas, a cloud-hosted database service.

This repository contains the frontend and backend code for the Resume Builder project.

## Demo
Check out the live demo here: https://resume-builder-2024.vercel.app/

Screenshots
### 1.Landing Page
![image](https://github.com/AbhijitKhyade/Resume-Builder-MERN/assets/129264746/147f3767-177b-4201-bfd7-e327233d89c1)

### 2.Education Section
![image](https://github.com/AbhijitKhyade/Resume-Builder-MERN/assets/129264746/37f43087-fa50-4bd2-818d-82d3e764b2ee)

### 3.Project Section
![image](https://github.com/AbhijitKhyade/Resume-Builder-MERN/assets/129264746/c9be87c5-36a2-483c-9a27-99215321fbec)
### 4.Resume Data
![image](https://github.com/AbhijitKhyade/Resume-Builder-MERN/assets/129264746/11d307dd-b942-4ff0-a761-1c00726d6911)


## Technologies Used
  Frontend: React.js, React Router, Axios, Bootstrap
  Backend: Node.js, Express.js, MongoDB, Mongoose
  Deployment: Vercel (Frontend), Heroku (Backend), MongoDB Atlas (Database)

## Features
  1)User authentication (register, login, logout)
  2)Create, update, and delete resume sections
  3)Responsive design for mobile and desktop
  4)Secure data storage using MongoDB Atlas
  5)Download resume pdf and edit is available
  6)Two Professional Like Resume Formats

## Installation
To run this project locally, follow these steps:

Clone the repository:
  git clone https://github.com/your-username/resume-builder.git
  Install dependencies for both frontend and backend:

cd client
npm install
cd ../server
npm install

Set up environment variables:

Create a .env file in the backend directory.
Add your MongoDB connection URI, JWT secret, and any other necessary variables.

Start the development servers:
## Start backend server (runs on http://localhost:8080)
cd server
npm start

## Start frontend development server (runs on http://localhost:3000)
cd client
npm start
Open your browser and navigate to http://localhost:3000 to view the application.
