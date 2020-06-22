// for mapbox api
// Geocoding
// Address -> Lat/Long -> Weather

// const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/bangalore.json?access_token=pk.eyJ1IjoidmVybWF2YXJpZCIsImEiOiJjazlyMGdvMWgwcHYyM2dxaDhuOHJ3MHplIn0.mG5WciDbEjq0cmnq3iROXQ&limit=1'

// request({ url: geoCodeURL, json:true}, (error, response) => {
//     if (error){
//         console.log('Unable to connect to Map services!')
//     }else if(response.body.message){
//         console.log('Unable to locate the place')
//     }else{
//         console.log('Latitude : '+response.body.features[0].center[1]+' Longitude : '+response.body.features[0].center[0])
//     }
   
// })

// this includes the same function but with callback

const request = require('request')

const geocode = (address, callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmVybWF2YXJpZCIsImEiOiJjazlyMGdvMWgwcHYyM2dxaDhuOHJ3MHplIn0.mG5WciDbEjq0cmnq3iROXQ&limit=1'
    request({url, json : true}, (error, {body} = {})=>{ //instead of response which has body, we use { body } directly
        if(error){
            callback('Unable to connect to Map services! Try again later', undefined)
        }else if(body.features.length === 0){
            callback('Unable to locate place. Search again', undefined)
        }else{
            callback(undefined,{
                Longitude : body.features[0].center[0],
                Latitude  : body.features[0].center[1],
                Location  : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode