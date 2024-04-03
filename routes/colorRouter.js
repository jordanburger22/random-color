const express = require('express')
const colorRouter = express.Router()
const Color = require('../models/color')


colorRouter.post('/many', async(req,res,next) => {
    try {
        const arr = req.body
        const savedColors = await Promise.all(arr.map(async color => {
            const newColor = new Color(color)
            const savedColor = await newColor.save()
            return savedColor
        }))
        return res.status(201).send(savedColors)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

colorRouter.get('/', async(req, res, next) => {
    try {
        const colors = await Color.find()
        return res.status(200).send(colors)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

colorRouter.get('/random', async(req, res, next) => {
    try {
        Color.aggregate([
            {$sample: {size: 1}}
        ]).then(randomColor => res.status(200).send(randomColor))
        
    } catch (err) {
        
    }
})

module.exports = colorRouter