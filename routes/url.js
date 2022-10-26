const express = require('express')
const validUrl = require('valid-url')
const router = express.Router()
const dotenv = require('dotenv')
const ShortUniqueId=require("short-unique-id");
const urlDB = require('../models/urlModel')

dotenv.config()

router.post('/', async (req, res) => {
    const baseURL ="http://localhost:"+ process.env.PORT
    const {longUrl,custom} = req.body
    if(!validUrl.isUri(baseURL)){
        return res.status(401).json('Invalid Base URL.')
    }

    if(!validUrl.isUri(longUrl)){
        return res.status(401).json('Invalid Long URL.')
    }

    const shortid = new ShortUniqueId({ length: 6});
    const urlCode = shortid();

    try {
        let url = await urlDB.findOne({longUrl})
        if(url)
        {
            return res.json(url)
        }
        else if(!url && custom==undefined){
            url = new urlDB({
                urlCode:urlCode,
                longUrl:longUrl,
                shortUrl: baseURL+'/'+urlCode,
                date: new Date()
            })
            await url.save()
        }
        else {
            url = new urlDB({
                urlCode:custom,
                longUrl,
                shortUrl: baseURL+'/'+custom,
                date: new Date()
            })
            await url.save()
        }
        
    } catch (error) {
        console.error(error.message)
        return res.status(500).json('Server Error!')
    }
})


module.exports = router