const express   =       require('express');
const router    =       express.Router();
router.post('/schedular', async(req, res)=>{
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
module.exports = router;