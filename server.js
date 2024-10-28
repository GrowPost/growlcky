const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const gambleRoutes = require('./routes/gamble');
const coinflipRoutes = require('./routes/coinflip');
const adminRoutes = require('./routes/admin');

const app = express();

const mongoURI = 'mongodb+srv://vidkhgt:BBiOT3B8wcxbFny1@cluster0.qwb22.mongodb.net/growtopia?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Root route
app.get('/', (req, res) => {
    res.render('index'); // Ensure index.ejs exists in the views directory
});

// Routes
app.use('/', authRoutes);
app.use('/', gambleRoutes);
app.use('/', coinflipRoutes);
app.use('/', adminRoutes);

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).send('404: Page Not Found');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});