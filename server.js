const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // To parse JSON request bodies

// Endpoint to fetch PNR status
app.get('/pnr-status/:pnr', async (req, res) => {
    const pnr = req.params.pnr;

    // Use a third-party API to fetch PNR status (example API)
    const apiUrl = `https://api.example.com/pnr-status/${pnr}?apikey=${process.env.API_KEY}`;

    try {
        const response = await axios.get(apiUrl);
        const pnrStatus = response.data;

        // Send back the PNR status to the frontend
        res.json({
            success: true,
            pnrStatus
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching PNR status',
            error: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
