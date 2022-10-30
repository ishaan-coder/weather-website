const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const forecasturl='http://api.weatherstack.com/current?access_key=d046693d3e34116e6bea9e08d1853c3e&query='+latitude+','+longitude+'&units=f'
       
    request( {url:forecasturl,json:true}, (error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            
            callback(undefined,body.current.weather_descriptions[0]+'It is currently'+body.current.temperature+'degrees out.There is a '+body.current.precip +'% chance of rain.')
        }
    })
}
module.exports=forecast