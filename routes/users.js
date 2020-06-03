const { Router } = require('express');
const router = new Router({ mergeParams: true });
const user=require('../models/user/userdata');
const geocountry=require('../models/geolocation/country');
const subscription=require('../models/plan/subscription');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/register', function(req, res, next) {
     
     min = Math.ceil(10000);
     max = Math.floor(20000);
     let rand=Math.floor(Math.random() * (max - min + 1)) + min;   
     var datetime = new Date();
     var date=datetime.toISOString().slice(0,10);
    if(req.body.registrationtype=="JoinNow")
    {

          var iso={name:req.body.country};
          geocountry.find(iso,function(err,country){
                    let newuser=new user({
                        name:req.body.name,
                        email:req.body.email,
                        mobile_no:req.body.mobile_no,
                        country:req.body.country,
                        password:user.hashPassword(req.body.password),
                        joinmode:req.body.joinmode,
                        referrenceno:'JN'+country[0].iso2+rand,
                        created_at:date,
                        updated_at:date,
                    });
                    newuser.save((err,nuser)=>{
                        if(err)
                        {
                              res.json({
                                  success:false,
                                  message:err,
                              });
                        }
                        else
                        {
                              let subscribe=new subscription({
                                   userid:nuser._id,
                                   planid:"4",
                                   trial_start:date,
                                   trial_end:new Date(new Date().setDate(datetime.getDate()+30)).toISOString().slice(0,10),
                                   is_active:true,
                                   created_at:date,
                                   updated_at:date,
                                   
                              });
                              subscribe.save((err,subscribed)=>{
                                    if(err)
                                    {
                                        res.json({
                                             success:false,
                                             message:err,
                                         });
                                    }
                                    else
                                    {
                                        res.json({
                                             success:true,
                                             message:"User registered successfully",
                                             data:nuser
                                         });
                                    }
                              });
                                      
                        }
                    });
          });
    }
    else
    {
               let newuser=new user({
                    name:req.body.name,
                    email:req.body.email,
                    oauth_id:req.body.id,
                    oauth_provider:req.body.oauthprovider,
                    joinmode:req.body.joinmode,
                    created_at:date,
                    updated_at:date,
               });
               newuser.save((err,nuser)=>{
                    if(err)
                    {
                          res.json({
                              success:false,
                              message:err,
                          });
                    }
                    else
                    {
                          let subscribe=new subscription({
                               userid:nuser._id,
                               planid:"4",
                               trial_start:date,
                               trial_end:new Date(new Date().setDate(datetime.getDate()+30)).toISOString().slice(0,10),
                               is_active:true,
                               created_at:date,
                               updated_at:date,
                               
                          });
                          subscribe.save((err,subscribed)=>{
                                if(err)
                                {
                                    res.json({
                                         success:false,
                                         message:err,
                                     });
                                }
                                else
                                {
                                    res.json({
                                         success:true,
                                         message:"User registered successfully",
                                         data:nuser
                                     });
                                }
                          });
                                  
                    }
                });
               
    }
  
});
router.post('/emailverification', function(req, res, next) {   
     res.send(req.body.test);
});

router.post('/login', function(req, res, next) { 
     if(req.body.registrationtype=="JoinNow")
     {
          let promise = user.findOne({email:req.body.email}).exec();
          promise.then(function(doc){
               if(doc) {
                 if(doc.isValid(req.body.password)){
                     // generate token
                     let token = jwt.sign({email:doc.email},'secret', {expiresIn : '3h'});
           
                     return res.status(200).json(token);
           
                 } else {
                   return res.status(501).json({message:' Invalid Credentials'});
                 }
               }
               else {
                 return res.status(501).json({message:'User email is not registered.'})
               }
              });
           
              promise.catch(function(err){
                return res.status(501).json({message:'Some internal error'});
              })
     }
     else
     {
          let promise = user.findOne({oauth_id:req.body.oauth}).exec();
          promise.then(function(doc){
               if(doc) {
                 
                     // generate token
                     let token = jwt.sign({oauth_id:doc.oauth_id},'secret', {expiresIn : '3h'});
           
                     return res.status(200).json(token);
           
               
               }
               else {
                 return res.status(501).json({message:'User email is not registered.'})
               }
              });
           
              promise.catch(function(err){
                return res.status(501).json({message:'Some internal error'});
              })
     }  
});

module.exports = router;
