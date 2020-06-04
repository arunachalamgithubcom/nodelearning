const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const  otpSchema=new Schema({
     otpcode:
     {
         type:Number,
     },
     email:
     {
         type:String,
     },
     expiry:
     {
         type:Date,

     },
     count:
     {
        type:String,
     },
     created_at:
    {
        type:String,
    },
    updated_at:
    {
        type:String,
    }
});
module.exports = mongoose.model('otp',otpSchema);