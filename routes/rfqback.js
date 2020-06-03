const { Router } = require('express');
require('dotenv').config();
const router = new Router({ mergeParams: true });
const rfqpost=require('../models/rfq/rfqpost');
const rfqcustomer=require('../models/rfq/rfqcustomer');
const geocountry=require('../models/geolocation/country');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/rfqpostdata', function(req, res, next) {
    
   
    min = Math.ceil(10000);
    max = Math.floor(20000);
    let rand=Math.floor(Math.random() * (max - min + 1)) + min;   
    var datetime = new Date();
    var date=datetime.toISOString().slice(0,10);
    var expirydate=new Date(new Date().setDate(datetime.getDate()+30)).toISOString().slice(0,10);
    var query={email:req.body.email};
    var iso={name:req.body.country};
    geocountry.find(iso,function(err,country){
        let rfqnewpost=new rfqpost({
                            reference_no: req.body.rfqtype+country[0].iso2+rand,
                            product_name:req.body.product_name,
                            product_details:req.body.product_details,
                            dimension_length:req.body.dimension_length,
                            Dlunit:req.body.Dlunit,
                            dimension_width:req.body.dimension_width,
                            Dwunit:req.body.Dwunit,
                            weight_min:req.body.weight_min,
                            Wlunit:req.body.Wlunit,
                            weight_max:req.body.weight_max,
                            Wwunit:req.body.Wwunit,
                            buying_currency:req.body.buying_currency,
                            buyprice_min:req.body.buyprice_min,
                            buyprice_max:req.body.buyprice_max,
                            expected_delivery_date:req.body.expected_delivery_date,
                            by_date:req.body.by_date,
                            delivery_type:req.body.delivery_type,
                            update_flag:0,
                            delete_flag:0,
                            customer:null,
                            reference_no_expire:expirydate,
                            location:req.body.Other_location,
                            created_at:date,
                            updated_at:date,

                        });
                        rfqnewpost.save((err,rfqpostdata)=>{
                            if(err)
                            {
                                        res.json({
                                            success:false,
                                            message:err,
                                        });
                            }
                            else
                            {
                                rfqcustomer.find(query,function(err,customer){
                                
                                    if(customer.length<1)
                                    { 
                                        let newCustomer=new rfqcustomer({
                                            customer_name:req.body.customer_name,
                                            email:req.body.email,
                                            mobile_no:req.body.mobile_no,
                                            address:req.body.address,
                                            company_url:req.body.company_url,
                                            country:req.body.country,
                                            state:req.body.state,
                                            city:req.body.city,
                                            postal_code:req.body.postal_code,
                                            created_at:date,
                                            updated_at:date,
                                            rfq:rfqpostdata._id
                                        });
                                        newCustomer.save((err,ncustomer)=>{
                                            if(err)
                                            {
                                                        res.json({
                                                            success:false,
                                                            message:err,
                                                        });
                                            }
                                            else
                                            {
                                                rfqpost.findById(rfqpostdata._id , 
                                                    function(err, rfqdata){
                                                        rfqdata.customer=ncustomer._id;
                                                        rfqdata.save();
                                                        res.json({
                                                            success:true,
                                                            message:err,
                                                        });
                                                    });
                                                /*const msg = {
                                                        to: 'arunold2000@gmail.com',
                                                        from: 'arunachalam.p@binary2quantum.com',
                                                        subject: 'Sending with Twilio SendGrid is Fun',
                                                        text: 'and easy to do anywhere, even with Node.js',
                                                        html: '<strong>and easy to do anywhere, even with e.js</strong>',
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
                                                    });*/
                                            }
                                        })
                                    }
                                    else
                                    {
                                        rfqcustomer.findByIdAndUpdate(customer[0]._id,
                                            { "$push": { "rfq": rfqpostdata._id } },
                                            { "new": true, "upsert": true },
                                            function (err, cust) {
                                                if (err) throw err;
                                                rfqpost.findById(rfqpostdata._id, 
                                                function(err, rfqdata){
                                                    rfqdata.customer=customer[0]._id;
                                                    rfqdata.save();
                                                    res.json({
                                                        success:true,
                                                        message:"success",
                                                    });
                                                });
                                            }
                                        );
                                       
                                    
                                    }
                                });
                            }
                        });
    });
    
});
router.post('/rfqdeletedata', function(req, res, next) {
    var datetime = new Date();
    var date=datetime.toISOString().slice(0,10);
    rfqpost.findOneAndUpdate({reference_no: "BUYIN11497"},{ delete_flag: 1 ,updated_at:date},
        function(err, rfqdata){
           
            res.json({
                success:true,
                message:rfqdata,
            });
        });

});
router.post('/rfqupdatedata', function(req, res, next) {
    var datetime = new Date();
    var date=datetime.toISOString().slice(0,10);
    rfqpost.find({reference_no: "BUYIN11497"},function(err, rfqdata){
        rfqpost.findById(rfqdata[0]._id, 
            function(err, rfqupdatedata){
                rfqupdatedata.product_name=req.body.product_name;
                rfqupdatedata.product_details=req.body.product_details;
                rfqupdatedata.dimension_length=req.body.dimension_length;
                rfqupdatedata.Dlunit=req.body.Dlunit;
                rfqupdatedata.dimension_width=req.body.dimension_width;
                rfqupdatedata.Dwunit=req.body.Dwunit;
                rfqupdatedata.weight_min=req.body.weight_min;
                rfqupdatedata.Wlunit=req.body.Wlunit;
                rfqupdatedata.weight_max=req.body.weight_max;
                rfqupdatedata.Wwunit=req.body.Wwunit;
                rfqupdatedata.buying_currency=req.body.buying_currency;
                rfqupdatedata.buyprice_min=req.body.buyprice_min;
                rfqupdatedata.buyprice_max=req.body.buyprice_max;
                rfqupdatedata.expected_delivery_date=req.body.expected_delivery_date;
                rfqupdatedata.by_date=req.body.by_date;
                rfqupdatedata.delivery_type=req.body.delivery_type;
                rfqupdatedata.update_flag=1,
                rfqupdatedata.location=req.body.Other_location,
                rfqupdatedata.updated_at=date;
                rfqupdatedata.save();
                rfqcustomer.findById(rfqdata[0].customer, 
                    function(err, rfqcustomerupdatedata){
                        rfqcustomerupdatedata.customer_name=req.body.customer_name;
                        rfqcustomerupdatedata.email=req.body.email;
                        rfqcustomerupdatedata.mobile_no=req.body.mobile_no;
                        rfqcustomerupdatedata.address=req.body.address;
                        rfqcustomerupdatedata.company_url=req.body.company_url;
                        rfqcustomerupdatedata.country=req.body.country;
                        rfqcustomerupdatedata.state=req.body.state;
                        rfqcustomerupdatedata.city=req.body.city;
                        rfqcustomerupdatedata.postal_code=req.body.postal_code;
                        rfqcustomerupdatedata.updated_at=date;
                        rfqcustomerupdatedata.save();
                        res.json({
                            success:true,
                            message:"success",
                        });
                    }
                );
            });
      
      
    });
     
});
router.post('/rfqgetdata', function(req, res, next) {
     
    rfqpost.findOne({reference_no: "BUYIN11497"}).populate('customer').exec(function (err, rfqdata) {
      
        res.json({
            success:true,
            message:rfqdata,
        });

    });
});
router.post('/freepostverification', function(req, res, next) {   
    res.send('respond with a resource');
});

module.exports = router;