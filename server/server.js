const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = requrire('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const logDir = path.join(__dirname, 'logs');
const logFilePath = path.join(logDir, 'ip_logs.txt');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const timestamp = new Date().toISOString();
    const userAgent = req.headers['user-agent'];
    const logEntry = `Logged at: ${timestamp}\nLogged Ip: ${ip}\nLogged User: ${userAgent}\n\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    console.log(`Logged at: ${timestamp}\nLogged Ip: ${ip}\nLogged User: ${userAgent}\n`);
    next();
});

app.get('/', (req, res) => {
    res.send('IP has been logged!');
});

app.get('/download-log', (req, res) => {
    res.download(path.join(__dirname, 'ip_logs.txt'))
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on https://localhost:${process.env.PORT}`);
});
