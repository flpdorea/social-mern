const router = require('express').Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { response } = require('express');

router.post('/register', async (req, res) => {
	try {
		// Generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Create new user
		const user = await new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// Save user and return a response
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(404).send('User not found');

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		!validPassword && res.status(400).json('Wrong password');

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
