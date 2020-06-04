const { Router } = require('express');
require('dotenv').config();
const router = new Router({ mergeParams: true });
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const usercompany=require('../models/user/userorganization');
const user=require('../models/user/userdata');
const referrals=require('../models/plan/referral');

router.post('/verifyemail', function(req, res, next) {   
      var query={email:req.body.email};
      user.find(query,function(err,ruser){
          if(ruser.length>0)
          {
                 res.json({
                       sucess:false,
                       message:"invalid",
                 });
          }
          else
          {
                 res.json({
                        sucess:true,
                        message:"valid",
                 });
          }
      });

});
router.post('/verifymobileno', function(req, res, next) {   
    var query={mobile_no:req.body.mobile_no};
    user.find(query,function(err,ruser){
        if(ruser.length>0)
        {
               res.json({
                     sucess:false,
                     message:"invalid",
               });
        }
        else
        {
               res.json({
                      sucess:true,
                      message:"valid",
               });
        }
    });
});
router.post('/verifyoauth_id', function(req, res, next) {   
    var query={oauth_id:req.body.oauth_id};
    user.find(query,function(err,ruser){
        if(ruser.length>0)
        {
               res.json({
                     sucess:false,
                     message:"invalid",
               });
        }
        else
        {
               res.json({
                      sucess:true,
                      message:"valid",
               });
        }
    });
});
router.post('/verify_referral_code', function(req, res, next) {   
    var query={referal_code:referral_code};
    referrals.find(query,function(err,result){
        if(result.length>0)
        {
               res.json({
                     sucess:false,
                     message:"invalid",
               });
        }
        else
        {
               res.json({
                      sucess:true,
                      message:"valid",
               });
        }
    });
});
router.post('/verifycompanyname', function(req, res, next) {   
    var query={company_name:req.body.companyname};
    usercompany.find(query,function(err,result){
        if(result.length>0)
        {
               res.json({
                     sucess:false,
                     message:"invalid",
               });
        }
        else
        {
               res.json({
                      sucess:true,
                      message:"valid",
               });
        }
    });
});
router.post('/verifycompanyregno', function(req, res, next) {   

    var query={company_reg_no:req.body.companyregno};
    usercompany.find(query,function(err,result){
        if(result.length>0)
        {
               res.json({
                     sucess:false,
                     message:"invalid",
               });
        }
        else
        {
               res.json({
                      sucess:true,
                      message:"valid",
               });
        }
    });
  
});
router.post('phonenumberlengthvalidator',function(req,res,next){

    const number = phoneUtil.parseAndKeepRawInput(req.body.phone_number,req.body.country_code);
    if(phoneUtil.isValidNumber(number))
    {
        res.json({
            sucess:true,
            message:"valid",
        });
    }
    else
    {
        res.json({
            sucess:false,
            message:"invalid",
        });
    }

});
module.exports = router;