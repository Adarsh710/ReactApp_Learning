const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


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

module.exports = router;