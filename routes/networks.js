const express = require('express')
const router = express.Router()
const Network = require('../models/network')

router.get('/', async (req, res) => {
    try {
        const networks = await Network.find()
        res.type('json')
        res.json(networks)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/createNetwork', async (req, res) => {
    const network = new Network({
        name: req.body.name,
        school: req.body.school,
        major: req.body.major,
        description: req.body.description,
        link: req.body.link
    })

    try {
        const n1 = await network.save()
        var data = {
            'status': 200,
            'message': `Successfully created ${network.name}`
        };
        res.type('json')
        res.json(data)
    }catch (err){
        res.send('Error' + err)
    }
})

router.get('/findNetworkBySchool/:school', async (req, res) => {
    try {
        const networks = await Network.find(
            { 'school': { $in: req.params.school}}
        )
        res.json(networks)
    }catch (err){
        res.send('Error' + err)
    }
})

router.get('/findNetworkByName/:name', async (req, res) => {
    try {
        const networks = await Network.findOne(
            {'name': { $in: req.params.name}}
        )
        res.json(networks)
    }catch (err){
        res.send('Error' + err)
    }
})


module.exports = router