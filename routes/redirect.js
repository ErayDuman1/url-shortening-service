const express = require('express')
const urlDB = require('../models/urlModel')
const router = express.Router()

router.get('/:code', async (req, res) => {
    try {
        const url = await urlDB.findOne({urlCode: req.params.code})
        if(url){
            return res.redirect(url.longUrl)
        }
        else{
            return res.status(404).json('No url found')
        }
    } catch (error) {
        return res.status(500).json('Server Error')
    }
    
})

module.exports = router;