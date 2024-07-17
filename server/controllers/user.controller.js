const puppeteer = require('puppeteer');
const User = require('../models/user.model');

const generateResume = async (req, res) => {
  const { htmlContent } = req.body;
  const htmlWithCss = `
    <html>
      <head>
       <style>

body {
  font-family: "Arial", sans-serif;
  color: #4a454a;
  background-color: #ffecd6;
  height: 100vh;
  overflow-x: hidden;
  margin:10px;
}

.resume-container {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  width: 100%;
  max-width: 794px;
  height: 1123px;
  max-height: 1123px;
  padding: 1rem 2rem 1rem 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* Title */
.name-heading {
  width: 100%;
  text-align: center;
  color: #4a454a;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.user-detail {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 4px;
  font-size: small;
  /* background-color: crimson; */
  flex-wrap: wrap;
}

.user-detail .data {
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 0.9rem;
}

/* User Info */

.resume-content {
  margin-top: 10px;
  display: flex;
  gap: 5px;
}

/* Left Section */
.left-section {
  width: 33%;
  /* background-color: #007bff; */
  margin-top: 10px;
}

/* Education Info */
.education-info {
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 5px;
}

.education-info .heading {
  font-size: 1.4rem;
  font-weight: 600;
}

.education-info .info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
}

.education-info .info .college {
  font-size: 1.1rem;
  font-weight: 700;
  flex-wrap: wrap;
  margin-top: -10px;
}

.education-info .info .clg-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.education-info .info .clg-details .clg-degree {
  font-size: 1rem;
}

.education-info .info .clg-details .meta-data {
  font-size: 1rem;
  color: #4a454a;
  display: flex;
  align-items: center;
  gap: 10px;
}

.education-info .info .clg-details .dates {
  font-size: 0.9rem;
  color: #4a454a;
  display: flex;
  align-items: center;
  gap: 5px;
}

.education-info .info .clg-details .locality {
  font-size: 0.9rem;
  color: #4a454a;
  display: flex;
  align-items: center;
  gap: 5px;
}

.education-info .info .clg-details .grade {
  font-size: 0.9rem;
  color: #4a454a;
}

.education-info .info .higher-clg {
  font-size: 1.1rem;
  font-weight: 700;
  flex-wrap: wrap;
}

.education-info .info .school {
  font-size: 1.1rem;
  font-weight: 700;
  flex-wrap: wrap;
}

.education-info .info .school-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.education-info .info .school-details .dates {
  font-size: 0.9rem;
  color: #4a454a;
  display: flex;
  align-items: center;
  gap: 5px;
}
.education-info .info .school-details .locality {
  font-size: 0.9rem;
  color: #4a454a;
  display: flex;
  align-items: center;
  gap: 5px;
}

.education-info .info .school-details .meta-data {
  font-size: 0.9rem;
  color: #4a454a;
  display: flex;
  align-items: center;
  gap: 10px;
}

.education-info .info .school-details .grade {
  font-size: 0.9rem;
  color: #4a454a;
}

/* Skills */
.skills {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 16px;
}

.skills .heading {
  font-size: 1.4rem;
  font-weight: 600;
}

.skills .skillset {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 0.9rem;
}

.skills .skillset .skill-names {
  font-size: 1rem;
  font-weight: 600;
  color: #4a454a;
}

.skills .skillset .sk {
  padding: 2px 0 2px 20px;
  display: grid;
  /* margin-left: -4px; */
  padding-left: 20px;
  flex-wrap: wrap;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 5px;
  column-gap: 40px;
}

.skills .skillset .sk li {
  word-wrap: break-word; /* Allow long words to break and wrap */
  font-size: 1rem;
  color: #4a454a;
  width: 100%; /* Ensure full width within the column */
  text-align: left;
}

/* Links */
.links {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 16px;
}

.links .heading {
  font-size: 1.4rem;
  font-weight: 600;
}

.links .linkSets {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}

.links .linkSets .link-item {
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 1rem;
}

.links .linkSets .link-item img {
  width: 23px;
  height: 23px;
}

.links .linkSets .link-item .link {
  font-size: 1rem;
  color: #4a454a;
  text-decoration: none;
  display: flex;
}

.subjects {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 16px;
}

.subjects .heading {
  font-size: 1.3rem;
  font-weight: 600;
}

.subjects .subject-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.subjects .subject-list ul {
  list-style-type: disc;
  margin-left: 20px;
}

.subjects .subject-list li {
  font-size: 1rem;
}

/* Right Content */
.right-section {
  width: 65%;
  margin-left: 15px;
  margin-top: 10px;
}

/* Experience */
.experience {
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 5px;
}

.experience .heading {
  font-size: 1.4rem;
  font-weight: 600;
}

.experience .expr-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.experience .expr-list .lists {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.experience .expr-list .lists .name {
  font-size: 1.1rem;
  font-weight: 700;
  flex-wrap: wrap;
}

.experience .expr-list .lists .role-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.experience .expr-list .lists .role-date #role {
  font-size: 1.1rem;
  font-weight: 600;
}

.experience .expr-list .lists .role-date #date {
  font-size: 0.9rem;
  color: #4a454a;
}

.experience .expr-list .lists .company {
  font-size: 1rem;
  font-weight: 600;
  color: #4a454a;
  font-style: italic;
  margin-bottom: 2px;
}

.experience .expr-list .lists .expr-desc {
  font-size: 1rem;
  text-align: justify;
  padding-left: 20px;
  margin-bottom: 10px;
}

/* Projects */
.projects {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 9px;
}

.projects .project-heading {
  font-size: 1.4rem;
  font-weight: 600;
}

.projects .project-sections {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.projects .project-sections .project-names {
  display: flex;
  gap: 5px;
  /* background-color: cadetblue; */
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.projects .project-sections .project-names #link-icons a {
  font-size: 1rem;
  color: #4a454a;
  text-decoration: none;
  cursor: pointer;
}

.projects .project-sections .project-names #link-icons {
  font-size: 1rem;
  color: #4a454a;
  text-decoration: none;
  cursor: pointer;
}

.projects .project-sections #tech-stacks {
  font-size: 0.9rem;
  color: #4a454a;
  font-style: italic;
  font-weight: 400;
  margin-bottom: 2px;
}

.projects .project-sections .project-descs {
  font-size: 1rem;
  text-align: justify;
  padding-left: 20px;
}

/* Achievements */
.achievements {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 9px;
}

.achievements .heading {
  font-size: 1.4rem;
  font-weight: 600;
}

.achievements .list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.achievements .list ul {
  list-style-type: disc;
  margin-left: 20px;
}

.achievements .list li {
  font-size: 1rem;
}

/* Extra Curricular */
.extra-curricular {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
}

.extra-curricular .heading {
  font-size: 1.4rem;
  font-weight: 600;
}

.extra-curricular .extra-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.extra-curricular .extra-list ul {
  list-style-type: disc;
  margin-left: 20px;
}

.extra-curricular .extra-list li {
  font-size: 1rem;
}

.download-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 23px;
  padding: 10px 20px;
  font-size: 1.2rem;
  width: 12rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

       </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  try {
    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
      timeout: 60000 // 60 seconds timeout
    });

    const page = await browser.newPage();

    await page.setContent(htmlWithCss, {
      waitUntil: 'networkidle0', // Wait until the network is idle
      timeout: 60000 // 60 seconds timeout
    });

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    // Send PDF as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=user-resume.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    res.status(500).send('Error generating PDF. Please try again later.');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  // Update user in database
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(id, { username, password }, { new: true }).select('-password');

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).send('Error updating user. Please try again later.');
  }
}

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const userData = {
      username: user.username,
    };
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).send('Error fetching user. Please try again later.');
  }
};

const feedbacks = async (req, res) => {
  const { feedback } = req.body;
  const { id } = req.query;
  // console.log(feedback);
  try {
    const user = await User.findById(id);
    // console.log(user);
    if (!user) {
      return res.status(404).send('User not found');
    }

    await User.findByIdAndUpdate(id, {
      feedback,
    }, { new: true });

    res.send({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).send('Error updating user. Please try again later.');

  }
}

module.exports = { generateResume, updateUser, getUser, feedbacks };
