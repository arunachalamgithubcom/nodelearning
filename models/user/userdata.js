const mongoose=require("mongoose");
const Schema=mongoose.Schema;
var bcrypt = require('bcrypt');
const userSchema=new Schema({
    name:
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
    contact_person:
    {
        type:String,
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
    alternate_email:
    {
        type:String,
    },
    alternate_mobile:
    {
        type:String,
    },
    address1:
    {
        type:String,
    },
    address2:
    {
        type:String,
    },
    oauth_provider:
    {
        type:String,
    },
    oauth_id:
    {
        type:String,
    },
    password:
    {
        type:String,
    },
    company:[
        {
            type:Schema.Types.ObjectId,
            ref:"usercompany"
        }
    ],
    joinmode:
    {
        type:String,
    },
    referrenceno:
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
userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('user',userSchema);