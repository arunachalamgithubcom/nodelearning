const { Router } = require('express');
require('dotenv').config();
const router = new Router({ mergeParams: true });
const user=require('../models/user/userdata');
const usercompany=require('../models/user/userorganization');
const geocountry=require('../models/geolocation/country');
const subscription=require('../models/plan/subscription');
const otp=require('../models/user/otp');
const forgotp=require('../models/user/resetpassword');


const fs=require('fs');
const Handlebars = require("handlebars");
var jwt = require('jsonwebtoken');

//sendgrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//emailtemplates
var otptemplate=fs.readFileSync('./views/otp.hbs','utf-8');
var compiledotp= Handlebars.compile(otptemplate);
var logintemplate=fs.readFileSync('./views/logincredential.hbs','utf-8');
var compiledlogin= Handlebars.compile(logintemplate);
var forgottemplate=fs.readFileSync('./views/forgotpassword.hbs','utf-8');
var compiledforgot=Handlebars.compile(forgottemplate);

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
router.post('/sendotp', function(req, res, next) {   
    
        min = Math.ceil(10000);
         max = Math.floor(20000);
         let rand=Math.floor(Math.random() * (max - min + 1)) + min; 
         var datetime = new Date();
         var date=datetime.toISOString().slice(0,10); 
         var timelimit=datetime.setTime(datetime.getTime() + (60 * 1000));
        
         otp.find({email:req.body.email,created_at:date},function(err,result){
                    if(err)
                    {
                         res.json({
                              success:false,
                              message:err,
                         });
                    }
                    else
                    {
                            if(result.length>=1)
                            {

                            }
                            else
                            {
                                  var counter=1;
                                  let newotp=new otp({
                                     otpcode:rand,
                                     email:req.body.email,
                                     expiry:timelimit,
                                     count:counter,
                                     created_at:date,
                                     updated_at:date,
                                  })
                                  newotp.save((err,notp)=>{
                                       if(err)
                                       {
                                             res.json({
                                                  success:false,
                                                  message:err,
                                             });
                                       }
                                       else
                                       {

                                       }
                                  });
                            }
                    }
                    const msg = {
                         to: req.body.email,
                         from: 'arunachalam.p@binary2quantum.com',
                         subject: 'Sending with Twilio SendGrid is Fun',
                         html: compiledotp({"otpcode":rand}),
                    };
                    sgMail.send(msg,function(err,json){
                         if(err)
                         {
                         res.json({
                              message:err,
                         });
                         }
                         else
                         {
                         res.json({
                              success:true,
                              message:"success",
                         });
                         }
                    });
         })
         
   
});
router.post('/usercompany', function(req, res, next) {  
     var datetime = new Date();
     var date=datetime.toISOString().slice(0,10); 
     if(req.body.email!="")
     {
         var query={email:req.body.email}
     }
     if(req.body.oauth!="")
     {
         var query={oauth_id:req.body.oauth};
     }
     let newcompany=new usercompany({
          company_name:req.body.company_name,
          company_reg_no:req.body.company_reg_no,
          annual_revenue:req.body,annual_revenue,
          inauguration_year:req.body.inauguration_year,
          manpower:req.body.manpower,
          company_logo:,
          business_type:req.body.business_type,
          industry_type:req.body.industry_type,
          product_name:req.body.product_name,
          product_details:req.body.product_details,
          certificate:,
          additional_fields:,
          jtype:req.body.jtype,
          created_at:date,
          updated_at:date,

     })
     newcompany.save((err,ncompany)=>{
             if(err)
             {
                         res.json({
                              success:false,
                              message:err,
                         });
             }
             else
             {
                  user.find(query,function(err,nuser){
                       if(err)
                       {
                              res.json({
                                   success:false,
                                   message:err,
                              });
                       }
                       else
                       {
                            user.findByIdAndUpdate(nuser._id,  { "$push": { " company": ncompany._id} },
                            { "new": true, "upsert": true },function(err,result){
                                   if(err)
                                   {
                                        res.json({
                                             success:false,
                                             message:err,
                                        });
                                   }
                                   else
                                   {
                                          
                                   }
                                  
                            });
                       }
                  });
             }
     });
});
router.post('/forgotpassword', function(req, res, next) {   
     res.send(req.body.test);
});
router.post('/resetpassword', function(req, res, next) {   
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
