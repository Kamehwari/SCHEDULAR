const express = require('express')
var cors   =            require('cors');
var app = express();
app.set('port',process.env.PORT || 3000);



// Allow CORS
app.use(cors());

allowCrossDomain = function(req, res, next) {

  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Allow', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  res.header('Accept','application/json');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  //res.header('Access-Control-Allow-preflightContinue','false');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin, filters,eventid');

  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use( require('./schedular') );

// these routes doesn't require authorization
app.post('/schedular', async(req, res)=>{
    try {
        let scheduledTime = req.headers.timer;
        let by = req.headers.requested_by;
        if(scheduledTime && scheduledTime.match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/)){
        let spilittedValue = scheduledTime.split(":")
        let timer = parseInt(spilittedValue[0]) * 3600 * 1000 + parseInt(spilittedValue[1]) * 60 * 1000 +parseInt(spilittedValue[2]) * 1000
        console.log(timer)
        const setIntervalObject = setTimeout((arg)=>{
            console.log(`Timmer Executed  Setted By:  ${arg}  @  ${new Date} `  );
        }, timer, by)
            res.status(200)
            res.json({"status":true, "message":"Schedular successfully activated!!!"})
        }else{
            res.status(400)
            res.json({"status":false, "message":"Invalid input format of date, Please send in HH:MM:SS format"});
        }     
    } catch (error) {
        console.log(error)
        res.status(500);
        res.json({"status":false, "message":"Internal server error"});
    }
});



/**
 * Start Express server.
 */

app.listen(app.get('port'), function(){
	console.log('Server running on port ' + app.get('port'));
});


module.exports = app;
