const pdf = require('html-pdf');

const generateResume = async (req, res) => {
    try {
        const { html } = req.body; // HTML content of the resume page
        console.log(html);
        pdf.create(html).toStream((err, stream) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to generate PDF' });
            }

            res.setHeader('Content-Type', 'application/pdf');
            stream.pipe(res);
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
};


module.exports = { generateResume };