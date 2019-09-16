const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');


function createJWT(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_DEV_ENV_SECRET, {
        expiresIn: process.env.JWT_DEV_ENV_EXP
    })
}

const verifyJWT = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_DEV_ENV_SECRET, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    });


const validation = [

        check('email').isEmail(),
        check('password').isLength({min: 5})
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }

    next();
};

const signup = (req, res) => {

    const user = new User()
    user.email = req.body.signupData.newUserName
    user.password = req.body.signupData.newUserPassword
    user.isAdmin = req.body.signupData.newIsAdmin

    user.save(function (err, user) {
        if (err) {
            console.log(err)
            return res.status(500).end()
        } else {
            console.log('we saved following: ' + user)
           /* const signedJWT = createJWT(user)
            return res.status(201).send({ signedJWT })*/
        }
    })
}

const login = async (req, res) => {
    //TODO Exercise - add input validation and error handling
    console.log('inuti login fn');
    const user = await User.findOne({ email: req.body.loginData.userName }).exec()

    if (!user) {
        return res.status(400).send({ message: 'invalid combination' })
    }
    const matchingPasswords = await user.checkPassword(req.body.loginData.passName)
    if (!matchingPasswords) {
        console.log('invalid combination')
        return res.status(400).send({ message: 'invalid combination' })//TODO why is it not returning 400 with the message? //Lucie
    }

    const name = req.body.loginData.userName;
    const administrator = user.isAdmin;
    console.log(administrator);
    const signedJWT = createJWT(user)
    return res.status(201).send({signedJWT, administrator, name})
}

//for now running lots of console logs to check it works.
const isAuthorized = async (req, res) => {
    console.log('in isAuthorized')
    const bearer = req.headers.authorization;
    const token = bearer.split('Bearer ')[1].trim();
    let payload;
    try {
        payload = await verifyJWT(token)
        console.log('token verification awaits')
    } catch (e) {
        return res.status(500).end()
    }
    const user = await User.findById(payload.id).exec();

    if (!user) {
        console.log('if user not existing')
        return res.status(500).end()
    }
    req.user = user;
    console.log('finishing checking for user auth')
    //next()
}

module.exports = {
    validation: validation,
    handleValidationErrors: handleValidationErrors,
    signup: signup,
    login: login,
    isAuthorized: isAuthorized
}