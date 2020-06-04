const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const referralSchema=new Schema({
      referrer_id:
      {
          type:String,
      },
      referal_code:
      {
         type:String,
      },
      referred_email:
      {
          type:String,
      },
      status:
      {
           type:String,
      },
      expires_at:
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

module.exports = mongoose.model('referral',referralSchema);