const { User } = require('../models');
const { verifyPassword } = require('../helper/bcrypt');
const { createToken } = require('../helper/jwt');

class Controller {
    static register(req, res, next) {
        let newUser = {
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        }
        User.findOne({
            where: { name: req.body.name }
        })
            .then(user => {
                if (user) {
                    res.status(400).json('Name already exist')
                } else {
                    return User.create(newUser)
                }
            })
            .then(user => {
                res.status(201).json({
                    id: user.id,
                    name: user.name,
                    role: user.role
                })
            })
            .catch(err => { res.status(400).json('Fail registration') })
    }
    static login(req, res, next) {
        const { name, password } = req.body
        let foundUser
        User.findOne({
            where: { name: name }
        })
            .then(user => {
                foundUser = user
                if (user) {
                    return verifyPassword(password, user.password)
                } else {
                    res.status(400).json('Invalid name or password')
                }
            })
            .then(hashResult => {
                if (hashResult) {
                    const access_token = createToken({
                        id: foundUser.id,
                        name: foundUser.name
                    });
                    res.status(200).json({
                        id: foundUser.id,
                        name: foundUser.name,
                        access_token
                    })
                } else {
                    res.status(400).json('Invalid name or password')
                }
            })
            .catch(err => { res.status(400).json('Fail login') })
    }
}

module.exports = Controller