const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authGuard = require('../middleware/authentication');

const userDB = require('../data/dbConfig');


router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(404).json({errorMessage: "Please provide both username and password."})
    }
    const fetchedUser = await userDB('users').where({username}).first();
    if (fetchedUser && fetchedUser.username === username) {
        return res.status(404).json({errorMessage: "Username is taken"})
    }
    try {
        const department = req.body.department || 'tbd';
        
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not create user."})
    }
})
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(404).json({errorMessage: "Please provide both username and password."})
    }
    try {
        const fetchedUser = await userDB('users').where({username}).first();
        if (!fetchedUser) {
            res.status(404).json({errorMessage: "Could not authenticate"})
        } else {
            bcrypt.compare(password, fetchedUser.hash).then(isMatch => {
                if (!isMatch) {
                    res.status(404).json({errorMessage: "Could not authenticate"})
                } else {
                    const token = jwt.sign({userId: fetchedUser.id, username}, process.env.JWT_SECRET, { expiresIn: '1hr'});
                    const authenticatedUser = {token, username, userId: fetchedUser.id, tokenExpiration: 60}
                    res.status(201).json(authenticatedUser)
                }
            }).catch((err) => {
                console.log(err)
                res.status(404).json({errorMessage: "Could not authenticate"})
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not authenticate user."})
    }
})
router.get('/users', authGuard, (req, res, next) => {
    if (!req.isAuth) {
        return res.status(404).json({errorMessage: "Must be authenticated"})
    }
    try {
        userDB('users').where({department: req.department}).then(users => {
            const transformedUser = users.map(user => ({...user, hash: 'redacted'}))
            res.status(200).json(transformedUser)
        }).catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Could not fetch users."})
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({errorMessage: "Could not fetch users."})
    }
})


module.exports = router;
