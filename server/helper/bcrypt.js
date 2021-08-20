const bcrypt = require('bcrypt');
const salt = 8

function hashPassword(password) {
    return bcrypt.hashSync(password, salt)
}

function verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { hashPassword, verifyPassword }