const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const passport = require('passport');

const key = require('../../config/key');

//Load Input Validator
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')


const router = express.Router();

//Load User model
const User = require('../../models/User');

//@Route :  GET /users
//@desc  :  Test user route
//@access:  Public
router.get('/', (req, res) => res.json({
    route: 'hostname/users/'
}));

//@Route :  GET /users/register
//@desc  :  Register user
//@access:  Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                emai: 'Email already exist'
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //Size of img
                r: 'pg', //Rating of img like hollywood movies
                d: 'mm' //Default img
            }, true);

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

//@Route :  GET /users/login
//@desc  :  login user
//@access:  Public
router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({
        email
    }).then(user => {
        if (!user) {
            errors.email = 'User not found';
            res.status(404).json(errors);
        }

        //password check
        bcrypt.compare(password, user.password).then(matched => {
                if (matched) {
                    //user matched
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    } //Create JWT payload

                    //JWT token genration
                    JWT.sign(payload, key.secretOrkey, {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) {
                            res.status(400).json({
                                msg: 'Error in token genration'
                            });
                        }
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    })
                } else {
                    errors.password = 'Incorrect password';
                    res.status(400).json(errors);
                }
            })
            .catch(err => console.log(err));
    });
});


//@Route :  GET /users/user
//@desc  :  Return current user
//@access:  Private
router.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    });
})

module.exports = router;