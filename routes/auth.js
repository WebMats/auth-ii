const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const userDB = require('../data/dbConfig');


router.post('/register', (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(404).json({errorMessage: "Please provide both username and password."})
    }
    try {
        const department = req.body.department || 'tbd';
        bcrypt.hash(password, 11).then(hash => {
            userDB('users').insert({username, hash, department}).then(([id]) => {
                const token = jwt.sign({userId: id, username}, process.env.JWT_SECRET, { expiresIn: '1hr'});
                const authenticatedUser = {token, username, userId: id, tokenExpiration: 60}
                res.status(201).json(authenticatedUser)
            }).catch(err => {
                console.log(err)
                res.status(500).json({errorMessage: "Could not create user."})
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: "Could not create user."})
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not create user."})
    }
})
router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(404).json({errorMessage: "Please provide both username and password."})
    }
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).json({errorMessage: "Could not authenticate user."})
    }
})
router.get('/users', (req, res, next) => {
    try {
        userDB('users').then(users => {
            res.status(200).json(users)
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
