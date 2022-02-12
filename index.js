const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log('Connected to MongoDB!');
});

app.listen(8800, () => {
    console.log('Backend server is running!');
});
