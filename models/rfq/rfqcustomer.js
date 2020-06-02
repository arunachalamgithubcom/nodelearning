const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const rfqcustomerSchema=new Schema({
   
      rfq:[
          {
              type:Schema.Types.ObjectId,
              ref:"requestforquote"
          }
      ],
     customer_name:
     {
         type:String,
     },
     email:
     {
         type:String,
     },
     mobile_no:
     {
         type:String,
     },
     address:
     {
         type:String,
     },
     company_url:
     {
         type:String
     },
     country:
     {
         type:String,
     },
     state:
     {
         type:String,
     },
     city:
     {
         type:String,
     },
     postal_code:
     {
         type:String,
     },
    created_at:{
        type:String,          
    },
    updated_at:{
        type:String,
    }

});
module.exports = mongoose.model('requestforquotecustomers',rfqcustomerSchema);