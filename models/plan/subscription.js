const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const subscriptionSchema=new Schema({
    userid:
    {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    planid:
    {
        type: Number
    },
    discountid:
    {
        type: Schema.Types.ObjectId, ref: 'discount'
    },
    trial_start:
    {
        type:String,
    },
    trial_end:
    {
        type:String,
    },
    is_active:
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
module.exports = mongoose.model('subscription',subscriptionSchema);