const request = require('request')

const geocode = (address,callback) => {

    const appid = process.env.geocode_apikey;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=1&appid=${appid}`

    request({url:url,json:true},(error,response)=>{
        if (error) {
            callback('URL not found', undefined);
          } else if (response.body.length === 0) {
            callback('Location not found', undefined);
          } else {
            const locationData = {
              name: response.body[0].name,
              lat: response.body[0].lat,
              lon: response.body[0].lon,
            };
            callback(undefined, locationData);
          }
    })
}

module.exports = geocode