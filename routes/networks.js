const express = require('express')
const router = express.Router()
const Network = require('../models/network')

router.get('/', async (req, res) => {
    try {
        const networks = await Network.find()
        var data = {
            'networks': networks.map(function (value) {
                return {
                    name: value.name,
                    link: value.link,
                    course: value.course,
                    semester: value.semester
                }
            })
        };
        res.type('json')
        res.json(data)
    }catch (err){
        res.send('Error' + err)
    }
})

router.post('/createNetwork', async (req, res) => {
    const network = new Network({
        name: req.body.name,
        course: req.body.course,
        semester: req.body.semester,
        description: req.body.description,
        accessible: req.body.accessible,
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

router.get('/findNetwork/:course/:semester/:access', async (req, res) => {
    try {
        const networks = await Network.find(
            {'course': { $in: req.params.course},
            'semester': { $in: req.params.semester},
            'accessible': { $in: req.params.access}}
        )
        res.json(networks)
    }catch (err){
        res.send('Error' + err)
    }
})

router.get('/findNetworkByName/:name', async (req, res) => {
    try {
        const networks = await Network.find(
            {'name': { $in: req.params.name}}
        )
        res.json(networks)
    }catch (err){
        res.send('Error' + err)
    }
})

router.get('/findNetworkByCourse/:course', async (req, res) => {
    try {
        const networks = await Network.find(
            {'course': { $in: req.params.course}}
        )
        var data = {
            'networks': networks.map(function (value) {
                return {
                    name: value.name,
                    link: value.link,
                    course: value.course,
                    semester: value.semester
                }
            })
        };
        res.type('json')
        res.json(data)
    }catch (err){
        res.send('Error' + err)
    }
})

router.get('/findNetworkBySemester/:semester', async (req, res) => {
    try {
        const networks = await Network.find(
            {'semester': { $in: req.params.semester}}
        )
        var data = {
            'networks': networks.map(function (value) {
                return {
                    name: value.name,
                    link: value.link,
                    course: value.course,
                    semester: value.semester,
                }
            })
        };
        res.type('json')
        res.json(data)
    }catch (err){
        res.send('Error' + err)
    }
})

module.exports = router