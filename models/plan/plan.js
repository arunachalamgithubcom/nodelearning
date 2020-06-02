const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const planSchema=new Schema({
    plan_id:
    {
        type:Number,
    },  
    plan_name:
    {
        type:String,
    },
    post_products_to_sale:
    {
        type:String,
    },
    post_group_buy_offers:
    {
        type:String,
    },
    company_verification_service:
    {
         type:String,
    }, 
    access_to_new_buying_leads:
    {
        type:String,
    },
    payment_protection:
    {
        type:String,
    },
    priority_search_listing:
    {
        type:String,
    },
    mutiple_currencies_transaction:
    {
        type:String,
    },
    verified_customer:
    {
        type:String,
    },
    free_advertising:
    {
        type:String,
    },
    digital_software_free_license:
    {
        type:String,
    },
    price:
    {
        type:String,
    },
     
});
module.exports = mongoose.model('plan',planSchema);