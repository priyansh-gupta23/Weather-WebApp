var express = require('express');
var router = express.Router();
const request = require('request')
const axios =require("axios");
const { response } = require('express');
require("dotenv").config();
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render('index');
});

router.post('/fetch',function(req,res){

  let cityname = req.body.cityname;
  const options={
    method:'GET',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.API_ID}`
  }

    axios.request(options)
    .then(function (response) {
      
        let weatherdata = response.data;
        let tempreature = Math.floor((weatherdata.main.temp - 273.15)*100)/100;
        let Type = weatherdata.weather[0].main;
        let Pressure = weatherdata.main.pressure;
        let Humidity = weatherdata.main.humidity;
        let speed = weatherdata.wind.speed;
        let CityName = weatherdata.name;
        const date = new Date();
        let time = date.toLocaleTimeString(); 
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let Date02 = `${day}/${month}/${year}`;

        console.log(weatherdata)
      res.render("show",{tempreature,Type,Pressure,Humidity,speed,Date02,CityName,time});

    }
  )

  .catch(function(err){
    res.render("Err")
  })
});

router.get("/Back", function(req, res, next) {
  res.render('index');
});

module.exports = router;