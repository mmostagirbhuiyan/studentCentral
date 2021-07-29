const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (err){
        res.send('Error' + err)
    }
})

router.get('/login/:email/:password', async (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {

        // test a matching password
        const value = user.comparePassword(req.params.password);

        if (value === true){
            res.send("Password is correct!")
        }
        else{
            res.send("Password in incorrect!")
        }
    });
})

router.get('/userID/:userID', async (req, res) => {
    try {
        const users = await User.find(
            {'userID': { $in: req.params.userID}}
        )
        res.json(users)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/register', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
        userID: req.body.userID,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber
    })

    try {
        const u1 = await user.save()
        res.json(u1)
    }catch (err){
        res.send('Error' + err)
    }
})

router.patch('/updateUserProfile/:email', async (req, res) => {
    try{
        const users = await User.findOne(
            {'email': { $in: req.params.email}}
        )
        users.firstName = req.body.firstName
        users.lastName = req.body.lastName
        users.password = req.body.password
        users.category = req.body.category
        users.dateOfBirth = req.body.dateOfBirth
        users.phoneNumber = req.body.phoneNumber
        const u1 = await users.save()
        res.json(u1)
    }catch (err){
        res.send('Error' + err)
    }
})

module.exports = router