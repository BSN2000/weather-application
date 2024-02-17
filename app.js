const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')

const app = express();

app.listen('3000');


app.get('/:city', async (req,res)=>{
    const city = req.params.city
    if(city==undefined || city==""){
        return res.status(400).send("City name missing")
    }else{
        await geocode(city,(error,data)=>{
            if(error){
                return res.status(400).send("City not Found")
            }
            forecast(data.lat,data.lon,(error,forcastData)=>{
                if(error){
                    return res.status(400).send("City Forecast missing")
                }
                res.status(200).send(`The temprature for the given city ${data.name} is ${forcastData.temperature} observed at time ${forcastData.observation_time}`)
            })
        })
    }
})
