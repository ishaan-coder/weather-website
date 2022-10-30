const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast') 
const port=process.env.PORT||3000
//define paths 
const publicdirectorypath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//setup handlebars locations and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicdirectorypath))
app.get('',(req,res)=>{
res.render('index',{
    title:'weather app',
    name:'Ishaan Gupta'
})
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help me', 
        name:'Ishaan Gupta'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page',
        name:'Ishaan Gupta'
    })
})

app.get('/weather',(req,res)=>{
 if(!req.query.address)
 {
    return res.send({
        errorMessage:'you must provide an address.'
    })
 }
 else{
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
          
        })
    
    })
    
}
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ishaan Gupta',
        errorMessage:'help document not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ishaan Gupta',
        errorMessage:'404 page not found'
    })
})


app.listen(port,()=>{
    console.log('server is up and running'+ port)
})