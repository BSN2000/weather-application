const request = require('request')

const forecast = (lat,long,callback) =>{
    const apiKey = process.env.forecast_apikey;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${long}`;

    request({url:url,json:true},(error,response)=>{
        if (error) {
            callback('URL not found', undefined);
          } else if (response.body.length === 0) {
            callback('Location not found', undefined);
          } else {
            callback(undefined, response.body.current);
          }
    })
}

module.exports = forecast