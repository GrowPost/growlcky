const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Ensure user is admin (this is a placeholder; implement your own admin check)
const isAdmin = (req, res, next) => {
    // You should implement a check to verify if the user is an admin
    // For example, by checking a field in the user model
    next();
};

router.get('/admin', isAdmin, (req, res) => {
    res.render('admin');
});

router.post('/admin/add-balance', isAdmin, async (req, res) => {
    const { username, amount } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            user.balance += parseFloat(amount);
            await user.save();
            res.redirect('/admin');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error updating balance');
    }
});

router.post('/admin/ban-user', isAdmin, async (req, res) => {
    const { username } = req.body;
    try {
        await User.deleteOne({ username });
        res.redirect('/admin');
    } catch (err) {
        res.status(500).send('Error banning user');
    }
});

module.exports = router;