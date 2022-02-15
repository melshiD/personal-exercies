const express = require('express');
const router = express.Router();

router.get('/shelters', (req, res) => {
    res.send('viewing one shelter');
});

router.get('/shelters/:id', (req, res) => {
    res.send('viewing on middle of middle');
});

router.get('/shelters/:id/edit', (req, res) => {
    res.send('editing shelter');
});

