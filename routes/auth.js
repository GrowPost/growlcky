const express = require('express');
const router = express.Router();

// Register GET
router.get('/register', (req, res) => {
    res.render('register');
});

// Register POST
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Handle user registration logic here
    res.redirect('/login'); // Redirect to login after registration
});

// Login GET
router.get('/login', (req, res) => {
    res.render('login');
});

// Login POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Validate user and set session
    req.session.username = username; // Set session variable
    res.redirect('/home'); // Redirect to home on successful login
});

module.exports = router;