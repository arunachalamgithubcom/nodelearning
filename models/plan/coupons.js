const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const couponSchema=new Schema({
    couponcode:
    {
        type:String,
    },
    name:
    {
        type:String,
    },
    percent_off:
    {
        type:String,
    },
    duration:
    {
        type:String,
    },
    max_redemptions:
    {
        type:String,
    },
    times_redeemed:
    {
        type:String,
    },
    valid:
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
module.exports = mongoose.model('coupon',couponSchema);