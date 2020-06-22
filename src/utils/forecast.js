const request = require('request')

// for weatherstack api 
// weather properties 
// Lat/Long -> Weather info

// const url = 'http://api.weatherstack.com/current?access_key=f3833fd179ea536caeee27749b727f86&query=12.9716,77.5946&units=m'

// request({url:url, json:true},(error, response) => {
//     if(error){
//         console.log('Unable to connect to Weather Services!')
//     }else if(response.body.error){
//         console.log('Unable to find location')
//     }else{
//         console.log(response.body.current.weather_descriptions[0] +'. It is currently ', response.body.current.temperature,' and visibility is ', response.body.current.visibility)
//     }
// })

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f3833fd179ea536caeee27749b727f86&query='+encodeURIComponent(lat)+','+encodeURIComponent(lon)+'&units=m'
    request({url, json : true}, (error, {body}) => {      //instead of response which has body, we use { body } directly
        if(error){
            callback('Unable to connect to Weather services! Try Again',undefined)
        }else if(body.error){
            callback('Unable to find location! Search again', undefined)
        }else{
            // const data =  {
            //     weather_descriptions : response.body.current.weather_descriptions[0],
            //     temperature : response.body.current.temperature,
            //     visibility : response.body.current.visibility
            // }
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature +' and visibility is ' + body.current.visibility
            )
        }
    })
}

module.exports = forecast