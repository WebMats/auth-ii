const jwt = require('jsonwebtoken');
const userDB = require('../data/dbConfig');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    userDB('users').where({username: decodedToken.username}).first().then(fetchedUser => {
        if (!fetchedUser) {
            req.isAuth = false;
            next();
        } else {
            req.isAuth = true;
            req.department = fetchedUser.department
            req.userId = decodedToken.userId;
            next();
        }
    }).catch((err) => {
        req.isAuth = false;
        return next();
    });
    
}