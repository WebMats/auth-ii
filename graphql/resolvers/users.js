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
    }
}