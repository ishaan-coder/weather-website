const request=require('request')
const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiaXNoYWFuZzAwMSIsImEiOiJjbDhyczlib2owcHZ5M3VuMXVqYWo1Mmg3In0.xqQgdb_FiiN3Wofn9y0y6g'
    
    request( {url:url,json:true}, (error,{body})=>{
            if(error)
            {
                callback('unable to acess to location servies!',undefined);
            }
            else if(body.features.length==0)
            {
                callback('unable to acess to location!,try another location',undefined);
            }
            else
            {
                callback(undefined,{
                    latitude:body.features[0].center[1],
                    longitude:body.features[0].center[0],
                    location:body.features[0].place_name
                })
          
            }
        }
    )}
    module.exports=geocode