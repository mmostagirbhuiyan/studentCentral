const express = require('express')
const router = express.Router()
const User = require('../models/user')
const fetch = require("node-fetch");

Array.prototype.remove = function(value) {
    for (var i = this.length; i--; )
    {
        if (this[i] === value) {
            this.splice(i, 1);
        }
    }
}

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

router.get('/homepage/:email', async (req, res) => {
    try {
        const users = await User.findOne(
            {'email': { $in: req.params.email}}
        )
        res.send(users)
    }catch (err){
        res.send('Error' + err)
    }
})

router.get('/homepage/:email/:getNetworks', async (req, res) => {


    if (req.params.getNetworks === 'myNetworks') {
        try {
            const users = await User.findOne(
                {'email': {$in: req.params.email}}
            )
            var data = [];
            for (const x of users.myNetworks){
                const response = await fetch(`http://localhost:9000/networks/findNetworkByName/${x}`);
                const myJson = await response.json();
                data.push(myJson)
            }
            res.json(data)
        } catch (err) {
            res.send('Error' + err)
        }
    }
})

router.post('/register', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        category: req.body.category,
    })

    try {
        await user.save()
        res.send(`User ${req.body.firstName} successfully registered!`)
    }catch (err){
        res.send('Error' + err)
    }
})

router.patch('/updateUserProfile/:email', async (req, res) => {
    try{
        const users = await User.findOne(
            {'email': { $in: req.params.email}}
        )
        let thisSession = req.body
        if(thisSession.hasOwnProperty('firstName')){
            users.firstName = req.body.firstName
        }
        if(thisSession.hasOwnProperty('lastName')){
            users.lastName = req.body.lastName
        }
        if(thisSession.hasOwnProperty('password')){
            users.password = req.body.password
        }
        if(thisSession.hasOwnProperty('category')){
            users.category = req.body.category
        }
        if(thisSession.hasOwnProperty('dateOfBirth')){
            users.dateOfBirth = req.body.dateOfBirth
        }
        if(thisSession.hasOwnProperty('phoneNumber')){
            users.phoneNumber = req.body.phoneNumber
        }
        const u1 = await users.save()
        res.json(u1)
    }catch (err){
        res.send('Error' + err)
    }
})

router.patch('/addNetwork/:email/:name', async (req, res) => {
    try{
        const users = await User.findOne(
            {'email': { $in: req.params.email}}
        )
        let thisSession = req.params
        users.myNetworks.addToSet(thisSession.name)
        const u1 = await users.save()
        res.json(u1.myNetworks)
    }catch (err){
        res.send('Error' + err)
    }
})

router.patch('/removeNetwork/:email/:name', async (req, res) => {
    try{
        const users = await User.findOne(
            {'email': { $in: req.params.email}}
        )
        users.myNetworks = users.myNetworks.remove(req.params.name)
        const u1 = await users.save()
        res.json(u1.myNetworks)
    }catch (err){
        res.send('Error' + err)
    }
})

module.exports = router