const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const discountSchema=new Schema({
    couponid:
    {
        type: Schema.Types.ObjectId, ref: 'coupon'
    },
    userid:
    {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    start_date:
    {
        type:String,
    },
    end_date:
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
module.exports = mongoose.model('discount',discountSchema);