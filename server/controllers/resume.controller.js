const Resume = require("../models/resume.model");
const puppeteer = require('puppeteer');

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

const generateResume = async (req, res) => {
    try {
        const { html, css } = req.body;

        // Launch puppeteer
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Set content with proper styling
        await page.setContent(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                ${css}
                
                @media print {
                  body {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                  }
                  
                  @page {
                    size: A4;
                    margin: 0;
                  }
                  
                  .resume-container {
                    width: 210mm;
                    min-height: 297mm;
                    padding: 20mm;
                    margin: 0 auto;
                  }
                }
              </style>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            </head>
            <body>
              ${html}
            </body>
          </html>
        `);

        // Generate PDF with specific settings
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: '0mm',
                right: '0mm',
                bottom: '0mm',
                left: '0mm'
            }
        });

        await browser.close();

        // Send PDF as response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        res.send(pdf);

    } catch (error) {
        console.log('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
}

module.exports = { addResumeData, getAllResumeData, generateResume };
