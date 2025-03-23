const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User_Schema');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        
        if (!password || password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, phone });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Registration error:', err);
        // Send more detailed error message for debugging
        res.status(500).json({ 
            error: err.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user._id }, 'cloudminiproject', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

module.exports = router;


router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});