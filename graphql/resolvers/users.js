const usersDB = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async ({userInput: {username, password}}) => {
        const fetchedUser = await usersDB('users').where({username}).first();
        if (!fetchedUser) {
            throw new Error('email or password do not match');
        }
        const isMatch = await bcrypt.compare(password, fetchedUser.hash);
        if (!isMatch) {
            throw new Error('email or password do not match');
        }
        const token = jwt.sign({userId: fetchedUser.id, username}, process.env.JWT_SECRET, { expiresIn: '1hr'});
        return {token, username, userId: fetchedUser.id, tokenExpiration: 60}
    },
    signup: async ({newUserInput: {username, password, department = 'tbd'}}) => {
        const fetchedUser = await usersDB('users').where({username}).first();
        if (fetchedUser && fetchedUser.username === username) {
            throw new Error('Username is taken')
        }
        try {
            return bcrypt.hash(password, 11).then(hash => {
                return usersDB('users').insert({username, hash, department}).then(([id]) => {
                    const token = jwt.sign({userId: id, username}, process.env.JWT_SECRET, { expiresIn: '1hr'});
                    return {token, username, userId: id, tokenExpiration: 60}
                }).catch(err => {
                    console.log(err)
                    throw err
                })
            }).catch(err => {
                console.log(err);
                throw err
            })
        } catch (err) {
            console.log(err)
            throw err;
        }
    },
    users: (_, {userId, department}) => {
        if (!userId) {
            throw new Error("Must be authenticated")
        }
        try {
            return usersDB('users').where({ department }).then(users => {
                return users.map(user => ({...user, hash: 'redacted'}))
            }).catch(err => {
                console.log(err)
                throw err
            });
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}