const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user with plain password (hashed in the model)
        const user = new User({ name, email, password });
        await user.save(); // Hashing is handled by the pre-save hook in the model

        // Generate a JSON Web Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Respond with the token
        res.status(201).json({ username: user.username, token: token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST: Sign In
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        //json web token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        //
        res.status(201).json({ username: user.name, token: token });
        console.log(user.name)
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = userRouter;