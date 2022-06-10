const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Allow sending Data via body
app.use(bodyParser.json());

// Managing CORS Policy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/posts', (req, res) => {
    const posts = [
        {
            id: 'iusdfs',
            title: 'Server Title',
            content: 'content',
        },
    ];

    res.json({
        message: 'success',
        posts: posts,
    });
});

module.exports = app;
