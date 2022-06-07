const express = require('express');

const app = express();

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
