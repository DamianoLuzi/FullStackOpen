const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', false);
const Blog = require('./models/blog');

const app = express();

// Use bodyParser for parsing application/json
app.use(bodyParser.json());

// Use cors middleware for handling Cross-Origin Resource Sharing
app.use(cors());

// Use express.json() for parsing application/json
app.use(express.json());

// Serve static files from the 'build' directory
app.use(express.static('build'));

// Define your API routes
app.use('/api/blogs', blogsRouter);

// Handle unknown endpoints and errors
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message);
    });

module.exports = app;
