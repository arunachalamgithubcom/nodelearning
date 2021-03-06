const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const usercompanySchema=new Schema({
   company_name:
   {
       type:String,
   },
   company_reg_no:
   {
       type:String,
   },
   annual_revenue:
   {
       type:String,
   },
   inauguration_year:
   {
       type:String,
   },
   manpower:
   {
       type:String,
   },
   company_logo:
   {
       type:String,
   },
   business_type:
   {
       type:String,
   },
   industry_type:
   {
       type:String,
   },
   product_name:
   {
       type:String,
   },
   product_details:
   {
        type:String,
   },
   certificate:
   {
       type:String,
   },
   additional_fields:
   {
        type:String,
   },
   jtype:
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
module.exports = mongoose.model('usercompany',usercompanySchema);