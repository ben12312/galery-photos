const jwt = require('jsonwebtoken');
const secret_jwt = process.env.JWT_SECRET || 'galery'

function createToken(userObject) {
    return jwt.sign(userObject, secret_jwt)
}

function verifyUser(access_token) {
    return jwt.verify(access_token, secret_jwt)
}

module.exports = { createToken, verifyUser }