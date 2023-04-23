const express = require('express');
const app = express();
app.use('/', (req, res) => {
    return res.json({ message: 'Node app is up and running...' })
});
module.exports = app;