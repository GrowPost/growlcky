const express = require('express');
const router = express.Router();

// Coinflip GET
router.get('/coinflip', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/login');
    }
    const balance = 100; // This should be retrieved from the database
    res.render('coinflip', { username: req.session.username, balance: balance });
});

module.exports = router;