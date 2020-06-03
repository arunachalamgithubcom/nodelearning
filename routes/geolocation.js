const { Router } = require('express');
const router = new Router({ mergeParams: true });
const geocountry=require('../models/geolocation/country');
const geocity=require('../models/geolocation/cities');
const geostate=require('../models/geolocation/state');

router.post('/getcountry',function(req,res,next){

       geocountry.find(function(err,country){
        if(country.length>0)
        {
             res.json({
                 success:true,
                 message:'data fetched successfully',
                 data:country,
             });
        }
        else
        {
             res.json({
                 success:false,
                 message:'No records found',
                 data:country,
             });
        }
        });

});
router.post('/getstate',function(req,res,next){
    geostate.find(function(err,state){
        if(state.length>0)
        {
             res.json({
                 success:true,
                 message:'data fetched successfully',
                 data:state,
             });
        }
        else
        {
             res.json({
                 success:false,
                 message:'No records found',
                 daa:state,
             });
        }
    });
});
router.post('/getcity',function(req,res,next){
    geocity.find(function(err,city){
        if(city.length>0)
        {
             res.json({
                 success:true,
                 message:'data fetched successfully',
                 data:city,
             });
        }
        else
        {
             res.json({
                 success:false,
                 message:'No records found',
                 data:city,
             });
        }
    });
});
router.post('/sortcity',function(req,res,next){
    var query={state_id:req.body.id};
    geocity.find(query,function(err,city){
        if(city.length>0)
        {
             res.json({
                 success:true,
                 message:'data fetched successfully',
                 data:city,
             });
        }
        else
        {
             res.json({
                 success:false,
                 message:'No records found',
                 data:city,
             });
        }
    });
});
router.post('/sortstate',function(req,res,next){
    
    var query={country_id:req.body.id};
   
    geostate.find(query,function(err,states){
      
             res.json({
                 success:true,
                 message:'data fetched successfully',
                 data:states,
             });
       
    });
});

module.exports = router;