const user = require('../models/user');

const router = require('express').Router()
const User = require("../db").import("../models/user.js")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

router.post('/create', function(req, res) {

    User.create({
            email: req.body.user.email,
            password: bcrypt.hashSync(req.body.user.password, 13)
        })
        .then(function createSuccess(user) {

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

            res.json({
                user: user,
                message: "User successfully created",
                sessionToken: token,
            });
        })

    .catch(function createFail(err) {
        res.status(500).json({ error: err });
    })
});

router.post('/signin', function(req, res) {
    User.findOne({ where: { email: req.body.user.email } }).then(
        function loginSuccess(user) {
            //1
            if (user) {
                //2 //3 //4 //5
                bcrypt.compare(req.body.user.password, user.password, function(err, matches) {
                    if (matches) {
                        // encode login as we did /create above
                        let token = jwt.sign( {id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24} );
                        // gives a success status code as the response
                        res.status(200).json({
                        // returns user object upon login
                        user: user,
                        // displays additional conformation string in console
                        message: 'User successfully logged in!',
                        // displays token as well
                        sessionToken: token
                        })
                    // fail case if password does not match
                    } else {
                        // error message sent in console
                        res.status(502).send({ error: 'Login failed'});
                    }
                });
            } else { //7
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
        function(err) {
            res.status(501).send({ error: "you failed, yo" });
        }
    );
});
module.exports = router;