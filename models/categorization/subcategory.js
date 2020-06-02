'use strict';
const mongoose=require('mongoose');
const SubcategorySchema=new mongoose.Schema({
    subcategory_id:{
      type:Number,
      required:true
    },
    subcategory:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('subcategory',SubcategorySchema,'subcategory');