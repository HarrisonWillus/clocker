const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3000;

// Log file directly in the /server folder
const logFilePath = path.join(__dirname, 'ip_logs.txt');

// Middleware to log IP, timestamp, and user agent
app.use((req, res, next) => {
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    const timestamp = new Date().toISOString();
    const userAgent = req.headers['user-agent'];
    const logEntry = `Logged at: ${timestamp}\nLogged IP: ${ip}\nUser Agent: ${userAgent}\n\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('IP logged.');
        }
    });

    next();
});

// Home route
app.get('/', (req, res) => {
    res.send('IP has been logged!');
});

// Download route with API key protection
app.get('/download-log', (req, res) => {
    const providedKey = req.headers['x-api-key'];

    if (providedKey !== KEY) {
        return res.status(403).send('Forbidden: Invalid API key.');
    }

    if (!fs.existsSync(logFilePath)) {
        return res.status(404).send('Log file not found.');
    }

    res.download(logFilePath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
